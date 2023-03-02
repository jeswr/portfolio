import { transform } from 'rdf-transform';
import { single } from 'asynciterator';

function toReadableStream(value: string) {
	return new ReadableStream({
		start(controller) {
			controller.enqueue(value);
			controller.close();
		},
	});
}

// new Promise(async (resolve, reject) => {
//   let str = '';
//   // @ts-ignore
//   transform(toReadableStream('<http://example.org/a> <http://example.org/b> <http://example.org/c> .'), {
//     from: { contentType: 'text/turtle' },
//     to: { contentType: 'application/ld+json' },
//     baseIRI: 'http://example.org/',
//   }).on('end', () => resolve(str))
//     .on('error', reject)
//     .on('data', (data: string) => { str += data })
// }).then(console.log)

transform(single('<a> <b> <c> .') as any, {
  from: { contentType: 'text/turtle' },
  to: { contentType: 'application/ld+json' },
  baseIRI: 'http://example.org/',
}).on('data', console.log)
