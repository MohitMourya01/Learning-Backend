const fs = require('fs')

setTimeout(() => console.log('Timer 1 finished.'),0)
setImmediate(() => console.log('Immediate 1 finished'))

fs.readFile('./test.txt', 'utf-8' , () => {
    console.log('File Read Succesfully!!');
    console.log('---------Eske neeche ke sab event loop me execute ho rhe hain!! ---')
    setTimeout(() => console.log('Timer 2 finished.'), 0)
    setTimeout(() => console.log('Timer 3 finished.'), 3000)
    setImmediate(() => console.log('Immediate 2 finished'))
    process.nextTick(() => console.log('process.nextTick Executed!!'))
})

console.log('Hello from the top level code!')