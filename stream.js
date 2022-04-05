const fs = require('fs');
const server = require('http').createServer();

server.on('request', (req, res) => {
    //solution 1
    fs.readFile('input.txt', (err, data) => {
        if(err) console.log(err);
        res.end(data)
    })

    //solution 2 with streams
    const readable = fs.createReadStream('input.txt');
    readable.on('data', chunk => {
        res.write(chunk)
    })

    readable.on('end', () => {
        res.end()
    })

    readable.on('error', (err) => {
        console.log(err)
        res.statusCode(500)
        res.end('file not found')
    })

    //solution 3 solving the back-pressure issue with streaming data with createReadStream and then writting chuncks to res.write
    const readable = fs.createReadStream('input.txt');
    readable.pipe(res) //readableSource.pipe(writeableDestination)
})

server.listen(8000, ()=>{
    console.log('server listening...')
})