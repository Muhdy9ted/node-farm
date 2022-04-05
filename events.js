const EventEmitter = require('events');
const http = require('http');

class Sales extends EventEmitter{
    constructor(){
        super();
    }
}

const myEmitter = new Sales();

myEmitter.on('newSale', () => {
    console.log('there was a new sale')
})

myEmitter.on('newSale', () => {
    console.log('customer name: Muhammed')
})

myEmitter.on('newSale', (stock) => {
    console.log(`there are ${stock} items left in stock`)
})
myEmitter.emit('newSale', 9);

/////////////////////////////////////////////////////

const server = http.createServer();

server.on('request', (req, res) => {
    console.log('request received');
    res.end('request received')
})

server.on('close', () => {
    console.log('server closed')
})

server.listen(8080, () => {
    console.log('waiting for requests....')
})