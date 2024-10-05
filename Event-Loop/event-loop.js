const fs = require('fs')
const crypto = require('crypto')

process.env.UV_THREADPOOL_SIZE = 4;
const start = Date.now();
setTimeout(() => console.log('Timer 1 finished.'),0)
setImmediate(() => console.log('Immediate 1 finished'))

fs.readFile('./test.txt', 'utf-8' , () => {
    console.log('File Read Succesfully!!');
    console.log('---------Eske neeche ke sab event loop me execute ho rhe hain!! ---')
    setTimeout(() => console.log('Timer 2 finished.'), 0)
    setTimeout(() => console.log('Timer 3 finished.'), 3000)
    setImmediate(() => console.log('Immediate 2 finished'))
    process.nextTick(() => console.log('process.nextTick Executed!!'))
    // crypto.pbkdf2('Password', 'salt', 100000, 1024, 'sha512', () => {
    //     console.log(Date.now() - start,"ms. Password encrypted")
    // })
    crypto.pbkdf2Sync('Password', 'salt', 100000, 1024, 'sha512');
    
     console.log(Date.now() - start,"ms. Password encrypted")

    crypto.pbkdf2('Password', 'salt', 100000, 1024, 'sha512', () => {
        console.log(Date.now() - start,"ms. Password encrypted")
    })
    crypto.pbkdf2('Password', 'salt', 100000, 1024, 'sha512', () => {
        console.log(Date.now() - start,"ms. Password encrypted")
    })
    crypto.pbkdf2('Password', 'salt', 100000, 1024, 'sha512', () => {
        console.log(Date.now() - start,"ms. Password encrypted")
    })
    
})

console.log('Hello from the top level code!')