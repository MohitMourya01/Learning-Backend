const EventEmitter = require("events")
const http = require('http')

const myEmitter = new EventEmitter();

myEmitter.on("newSale", () => {
    console.log("There was a new Sale!");
})
myEmitter.on("newSale", () => {
    console.log("Customer name: Mohit");
})
myEmitter.on("newSale", stock => {
    console.log(`There are now ${stock} items left in stock.`);
})

myEmitter.emit("newSale", 9);


//////////

const server = http.createServer();

server.on("request", (req, res) => {
    console.log("Request received!")
    res.end("Request received")
})
server.on("request", (req, res) => {
    console.log(" Another Request received!")
    //res.end("Another Request received")
})

server.on("close", () => {
    console.log("Server closed")
    
})

server.listen(8000, '127.0.0.1', () => {
    console.log("waitng for requests...")
})