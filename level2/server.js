
const http = require('http')
const url = require('url')
const fs = require('fs')


const replaceTemplate = (temp, product) => {
    // regular expression /{%x%}/g
    let output = temp.replace(/{%PRODUCTNAME%}/g,product.productName)
    output = output.replace(/{%IMAGE%}/g,product.image)
    output = output.replace(/{%PRICE%}/g,product.price)
    output = output.replace(/{%FROM%}/g,product.from)
    output = output.replace(/{%NUTRIENTS%}/g,product.nutrients)
    output = output.replace(/{%QUANTITY%}/g,product.quantity)
    output = output.replace(/{%DESCRIPTION%}/g,product.description)
    output = output.replace(/{%ID%}/g,product.id)

    if(!product.organic) output = output.replace(/{%NOT_ORGANIC%}/g,'not-organic')
    return output;

}

// block only at start after it work fine
 const tempOverview = fs.readFileSync(`${__dirname}/overview.html`,'utf-8');
 const tempCard = fs.readFileSync(`${__dirname}/template-card.html`,'utf-8');
 const tempProduct = fs.readFileSync(`${__dirname}/product.html`,'utf-8');
 const data = fs.readFileSync(`${__dirname}/data.json`,'utf-8');
    const dataObj = JSON.parse(data)


const server = http.createServer((req,res) => {
    //const pathName = req.url;
    // console.log(req.url);
    console.log(url.parse(req.url,true))
    const {query, pathname} =  url.parse(req.url, true);

    // Overview Page
    if(pathname === '/' || pathname === '/overview'){
        res.writeHead(200, {
            'Content-type':'text/html'
                 })
        const cardHtml = dataObj.map(el => replaceTemplate(tempCard, el)).join('')
        const output = tempOverview.replace('{%PRODUCT_CARDS%}', cardHtml)
        res.end(output)
    }

    // Product Page
    else if(pathname === '/product'){
        console.log(query)
        res.writeHead(200,{
            'Content-type':'text/html'
        })
        const product = dataObj[query.id];
        const output = replaceTemplate(tempProduct, product)
        
        res.end(output)

        // API
    }else if(pathname === '/api'){
        res.writeHead(200, {
           'Content-type':'application/json'
                })
        res.end(data)
        
    }
    // NOT Found
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