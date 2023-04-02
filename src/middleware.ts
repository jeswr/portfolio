import contentType from 'content-type';
import Negotiator from 'negotiator';
import { NextRequest, NextResponse } from 'next/server';
import { allowedDestinations, transform, } from 'rdf-transform';
import { Readable } from 'readable-stream';

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
  if (mediaTypes.length === 0 || mediaTypes.includes(sourceContentType)) {
    return NextResponse.next();
  }

  let str = '';
  try {
    const text = await originalResponse.text();
    await new Promise(async (resolve, reject) => {
      const readable = new Readable();
      transform(readable, {
        from: { contentType: content },
        to: { contentType: mediaTypes[0] },
        baseIRI: originalResponse.url,
      }).on('end', resolve)
        .on('error', reject)
        .on('data', data => { str += data });

      readable.push(text);
      readable.push(null);
    });
  } catch {
    // If any errors occur during transformation then return the original response
    return NextResponse.next();
  }

  const headers = new Headers({
    'content-type': mediaTypes[0]
  });

  for (const [key, value] of originalResponse.headers.entries()) {
    if (key !== 'content-type')
      headers.append(key, value);
  }

  return new NextResponse(str, {
    ...originalResponse,
    headers,
  });
}
