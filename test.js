
const fs = require('fs');
let src = new Uint8Array(fs.readFileSync('./project_qt.wasm'));
const env = {
	memoryBase: 0,
	tableBase: 0,
	memory: new WebAssembly.Memory({
		initial: 256
	}),
	table: new WebAssembly.Table({
		initial: 2,
		element: 'anyfunc'
	}),
	abort: () => {throw 'abort';}
}
WebAssembly.instantiate(src, {env: env})
.then(result => {
	console.log(result.instance.exports._add(20, 89));
})
.catch(e => console.log(e));


// function handlePrintString(ptr: number, len: number) {
//   const view = new Uint8Array(memory.buffer, ptr, len);
//   let string = '';
//   for (let i = 0; i < len; i++) {
//     string += String.fromCharCode(view[i]);
//   }
//   console.log(string);
// }

// const env = {
//   ...
//   _jsPrintString: handlePrintString,
//   ...
// };
// WebAssembly.instantiate(bytes, { env }).then((result) => {
//   result.instance.exports._print();
// });