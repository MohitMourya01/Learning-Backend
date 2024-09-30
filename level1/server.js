
const http = require('http')
const url = require('url')
const fs = require('fs')


// block only at start after it work fine
 const data = fs.readFileSync(`${__dirname}/data.json`,'utf-8');
    const dataObj = JSON.parse(data)


const server = http.createServer((req,res) => {
    const pathName = req.url;
    if(pathName === '/' || pathName === '/overview'){
        res.end('<h1> This is the OVERVIEW</h1>')
    }
    else if(pathName === '/product'){
        res.end('<h1> This is the PRODUCT</h1>')
    }else if(pathName === '/api'){
        // fs.readFile(`${__dirname}/data.json`,'utf-8', (err,data) => {
        //     res.writeHead(200, {
        //         'Content-type':'application/json'
        //     })
        //    const productItems = JSON.parse(data)
        // //    console.log(productItems)
        //    res.end(data)
        // })
        res.writeHead(200, {
           'Content-type':'application/json'
                })
        res.end(data)
        
    }
    else{
        res.writeHead(404, {
            'Content-type' : 'text/html',
             'my-own-header': 'hello-world'
        });
        res.end('<h1> Page not found !!</h1>')
    }
    
})

server.listen(8000, '127.0.0.1', () => {
    console.log("server started!!")
})