import contentType from 'content-type';
import Negotiator from 'negotiator';
import { NextRequest, NextResponse } from 'next/server';
import { allowedDestinations, transform, } from 'rdf-transform';
import { Readable } from 'readable-stream';
import { write } from "@jeswr/pretty-turtle";
import { readableFromWeb } from 'readable-from-web';
import { arrayifyStream } from 'arrayify-stream';
import { rdfParser } from 'rdf-parse';
import { siteConfig } from '@/config/site';

export async function middleware(request: NextRequest): Promise<NextResponse> {
  // If the request does not specify an Accept header, or will accept anything
  // then don't do any content negotiation
  if (!request.headers.has('Accept') || request.headers.get('Accept') === '*/*') {
    return NextResponse.next();
  }

  const originalResponse = await fetch(request);
  const sourceContentType = originalResponse.headers.get('content-type');

  // If the upstream response doesn't have a content type then
  // we cannot do any content negotiation
  if (!sourceContentType) {
    return NextResponse.next();
  }

  const content = contentType.parse(sourceContentType).type;
  const negotiator = new Negotiator({ headers: { accept: request.headers.get('Accept') || undefined } });
  const mediaTypes = negotiator.mediaTypes(await allowedDestinations(content));

  // Don't transform if we cannot find any suitable destination media types
  // or if we already have a suitable destination media type
  if (mediaTypes.length === 0 || mediaTypes[0] === content) {
    return NextResponse.next();
  }

  let resContentType = mediaTypes[0];
  let stream;
  try {
    const webReadable: any = readableFromWeb(originalResponse.body!);

    if (mediaTypes[0] === 'text/turtle') {
      stream = await write(
        await arrayifyStream(rdfParser.parse(webReadable, { contentType: content, baseIRI: originalResponse.url })),
        {
          format: 'text/turtle',
          prefixes: siteConfig.prefixes,
        }
      );
    } else {
      stream = transform(webReadable, {
        from: { contentType: content },
        to: { contentType: mediaTypes[0] },
        baseIRI: originalResponse.url,
      });
    }

  } catch (e) {
    return new NextResponse(`${e}`, { status: 500 });
  }

  const headers = new Headers({
    'content-type': resContentType,
  });

  for (const [key, value] of originalResponse.headers.entries()) {
    if (key !== 'content-type')
      headers.append(key, value);
  }

  return new NextResponse(stream as any, {
    ...originalResponse,
    headers,
  });
}
