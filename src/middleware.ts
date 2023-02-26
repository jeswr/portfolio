import type { Context } from "@netlify/edge-functions";
import { RdfaParser } from "rdfa-streaming-parser";
import rdfSerializer from "rdf-serialize";

function convert(
  responseText: string,
  options: {
    baseIRI: string;
    format: string;
  }
): Promise<string> {
  return new Promise((resolve, reject) => {
    const parser = new RdfaParser({
      baseIRI: options.baseIRI,
      contentType: "text/html",
    }).on("error", (err: unknown) => reject(err));

    const textStream = rdfSerializer.serialize(parser, {
      contentType: options.format,
    });

    // Collect the stream down to a string, technically this means we might have
    // a hard limit on dataset size to 500mb or so, but I doubt we're likely to
    // hit into that: 512mb is a LOT of text
    let result = "";
    textStream
      .on("error", (err: unknown) => reject(err))
      .on("data", (text: string) => (result += text))
      .on("end", () => resolve(result));

    parser.write(responseText);
    parser.end();
  });
}

// Get list of supported content-types from rdfSerializer, these are used when
// parsing the Accepts header
// const serializableTypes = await rdfSerializer.getContentTypes();

export async function middleware (
  request: Request,
  context: Context
): Promise<Response> {
  return fetch(request);

  // if (!request.headers.has("Accept") || request.method !== "GET") {
  //   // treat as html, pass back to netlify to serve your HTML
  //   try {
  //     return fetch(request);
  //   } catch (e) {
  //     throw new Error(`ERROR: ${e}\n\nContext is ${JSON.stringify(context, null, 2)}`)
  //   }
  // }

  // throw new Error(`Unexpected route`)

  // Parse the Accept header, providing */* to catch everything that's not
  // serializable as an RDF format:
  // const accept = Accepts(request);
  // const acceptedTypes = accept.types([...serializableTypes, "*/*"]);

  // if (
  //   // If we don't have an accepted type,
  //   !acceptedTypes ||
  //   // Or the catch-all matched (e.g., images or CSS),
  //   acceptedTypes === "*/*"
  // ) {
  //   // then step aside and let the upstream handle it.
  //   return context.next();
  // }

  // Select the first accepted type, as it should be something supported by rdfSerializer
  // const responseFormat = request.headers.get("Accept")!;

  // // Fetch the response from the upstream:
  // const originalResponse = await context.next();

  // // Tracking how long the transform takes, it can't take more than 50ms:
  // const startTime = Date.now();

  // // If upstream response wasn't ok, we can't transform it:
  // if (!originalResponse.ok) {
  //   return originalResponse;
  // }

  // // Don't try handling responses that aren't HTML, as these won't parse as RDFa:
  // // `netlify dev` gives `text/html`, real netlify gives `text/html; charset=UTF-8`
  // const contentType = originalResponse.headers.get("Content-Type");
  // if (!contentType || !contentType?.startsWith("text/html")) {
  //   return originalResponse;
  // }

  // // Transform the response to the desired format
  // const responseText = await originalResponse.text();
  // const result = await convert(responseText, {
  //   // In theory, we should be able to use context.site.url, which should be the site's URL,
  //   // in reality, this is undefined in development, instead of, y'know the development servers'
  //   // URL. So instead we just use the root of the request URL, hacky, I know.
  //   //
  //   // https://docs.netlify.com/configure-builds/environment-variables/#deploy-urls-and-metadata
  //   // baseIRI: context.site.url,
  //   baseIRI: new URL("/", request.url).toString(),
  //   format: responseFormat,
  // });

  // // Remove the content-length header, as we've changed the content's length by transforming it:
  // originalResponse.headers.delete("content-length");

  // // Append a server-timing to indicate how long the transform took, it can't
  // // take more than 50ms (per https://docs.netlify.com/edge-functions/limits/):
  // originalResponse.headers.append(
  //   "Server-Timing",
  //   `rdfa-transform;dur=${Date.now() - startTime}`
  // );

  // // For some reason we couldn't extract any RDFa, so just return the original response:
  // if (result.length === 0) {
  //   context.log(`Warning: unable to transform ${request.url}`);
  //   return new Response(responseText, originalResponse);
  // }

  // // Override the content-type to text/turtle
  // originalResponse.headers.set("Content-Type", responseFormat);
  // originalResponse.headers.append("Vary", "Accept");

  // // Return the new response:
  // return new Response(result, originalResponse);
};
