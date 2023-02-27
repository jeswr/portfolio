import { transform } from "rdf-transform";
import streamToString from "stream-to-string";

async function main() {
  const str = await streamToString(transform((await fetch('https://www.jeswr.org/')).body?.getReader()! as any, {
    from: { contentType: 'text/html' },
    to: { contentType: 'text/turtle' },
    baseIRI: 'https://www.jeswr.org/',
  }));  

  console.log(str)
}

main()












