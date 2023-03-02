import { NextRequest, NextResponse } from 'next/server';
import { transform } from 'rdf-transform';
import { single } from 'asynciterator';

export async function middleware (request: NextRequest): Promise<NextResponse> {

// transform((await fetch(request)).body, {
//   from: { contentType: 'text/html' },
//   to: { contentType: 'text/turtle' },
//   baseIRI: NextResponse.next().url,
// });
// (await fetch(request)).body

let str = '';

await new Promise(async (resolve, reject) => {
  transform(single('<a> <b> <c> .') as any, {
    from: { contentType: 'text/turtle' },
    to: { contentType: 'application/ld+json' },
    baseIRI: NextResponse.next().url,
  }).on('end', resolve)
    .on('error', reject)
    .on('data', data => { str += data })
});

// @ts-ignore
return new NextResponse(str, {
  headers: new Headers({ 'Content-Type': 'application/ld+json' }),
});

// This works
// return new NextResponse(await (await fetch(request)).text(), {
//   headers: new Headers({ 'Content-Type': 'text/turtle' }),
// });
  }
  
  
  
//   // if (!request.headers.has('Accept') || request.headers.get('Accept') === 'text/html' || request.headers.get('Accept') === '*/*') {
//     return NextResponse.next();
//   // }

//   // @ts-ignore
//   const string = await streamToString(transform(NextResponse.next().body!, {
//     from: { contentType: 'text/html' },
//     to: { contentType: 'text/turtle' },
//     baseIRI: NextResponse.next().url,
//   }));

//   return new NextResponse(string, {
//     headers: new Headers({ 'Content-Type': 'text/turtle' }),
//   });
  
//   // request.nextUrl
  
//   // NextRequest(request);
  
  
  
//   // return fetch(request);
//   // @ts-ignore
//   return new Response(transform(request.body, {
//     from: { contentType: 'text/html' },
//     to: { contentType: 'text/turtle' },
//     baseIRI: request.url,
//   }), {
//     headers: new Headers({ 'Content-Type': 'text/turtle' }),
//   });

//   // return fetch(request);

//   // if (!request.headers.has("Accept") || request.method !== "GET") {
//   //   // treat as html, pass back to netlify to serve your HTML
//   //   try {
//   //     return fetch(request);
//   //   } catch (e) {
//   //     throw new Error(`ERROR: ${e}\n\nContext is ${JSON.stringify(context, null, 2)}`)
//   //   }
//   // }

//   // throw new Error(`Unexpected route`)

//   // Parse the Accept header, providing */* to catch everything that's not
//   // serializable as an RDF format:
//   // const accept = Accepts(request);
//   // const acceptedTypes = accept.types([...serializableTypes, "*/*"]);

//   // if (
//   //   // If we don't have an accepted type,
//   //   !acceptedTypes ||
//   //   // Or the catch-all matched (e.g., images or CSS),
//   //   acceptedTypes === "*/*"
//   // ) {
//   //   // then step aside and let the upstream handle it.
//   //   return context.next();
//   // }

//   // Select the first accepted type, as it should be something supported by rdfSerializer
//   // const responseFormat = request.headers.get("Accept")!;

//   // // Fetch the response from the upstream:
//   // const originalResponse = await context.next();

//   // // Tracking how long the transform takes, it can't take more than 50ms:
//   // const startTime = Date.now();

//   // // If upstream response wasn't ok, we can't transform it:
//   // if (!originalResponse.ok) {
//   //   return originalResponse;
//   // }

//   // // Don't try handling responses that aren't HTML, as these won't parse as RDFa:
//   // // `netlify dev` gives `text/html`, real netlify gives `text/html; charset=UTF-8`
//   // const contentType = originalResponse.headers.get("Content-Type");
//   // if (!contentType || !contentType?.startsWith("text/html")) {
//   //   return originalResponse;
//   // }

//   // // Transform the response to the desired format
//   // const responseText = await originalResponse.text();
//   // const result = await convert(responseText, {
//   //   // In theory, we should be able to use context.site.url, which should be the site's URL,
//   //   // in reality, this is undefined in development, instead of, y'know the development servers'
//   //   // URL. So instead we just use the root of the request URL, hacky, I know.
//   //   //
//   //   // https://docs.netlify.com/configure-builds/environment-variables/#deploy-urls-and-metadata
//   //   // baseIRI: context.site.url,
//   //   baseIRI: new URL("/", request.url).toString(),
//   //   format: responseFormat,
//   // });

//   // // Remove the content-length header, as we've changed the content's length by transforming it:
//   // originalResponse.headers.delete("content-length");

//   // // Append a server-timing to indicate how long the transform took, it can't
//   // // take more than 50ms (per https://docs.netlify.com/edge-functions/limits/):
//   // originalResponse.headers.append(
//   //   "Server-Timing",
//   //   `rdfa-transform;dur=${Date.now() - startTime}`
//   // );

//   // // For some reason we couldn't extract any RDFa, so just return the original response:
//   // if (result.length === 0) {
//   //   context.log(`Warning: unable to transform ${request.url}`);
//   //   return new Response(responseText, originalResponse);
//   // }

//   // // Override the content-type to text/turtle
//   // originalResponse.headers.set("Content-Type", responseFormat);
//   // originalResponse.headers.append("Vary", "Accept");

//   // // Return the new response:
//   // return new Response(result, originalResponse);
// };
