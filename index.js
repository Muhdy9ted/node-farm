const fs = require('fs');
const http = require('http');
const url = require('url');

const slugify = require('slugify');

const replaceTemplate = require('./dev-data/modules/replaceTemplate');

// fs.readFile('./input.txt', 'utf-8', (err, data) => {
//     if(err) return console.log('error');
//     console.log(data)
//     fs.writeFile('./input.txt',`${data} \nhello bitchess`, 'utf-8', err => {
//         console.log('file written')
//     })
// });

//this will be executed once when this file is ran for the first time
const tempOverview = fs.readFileSync(`${__dirname}/templates/template-overview.html`, 'utf-8');
const tempCard = fs.readFileSync(`${__dirname}/templates/template-card.html`, 'utf-8');
const tempProduct = fs.readFileSync(`${__dirname}/templates/template-product.html`, 'utf-8');


const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8')
const dataObj = JSON.parse(data);

// const slugs = dataObj.map(el => slugify(el.productName, {lower: true}));

const server = http.createServer((req, res) =>{
    const {query, pathname} = url.parse(req.url, true)

    //overview page
    if(pathname === '/' || pathname === "/overview"){
        res.writeHead(200, {'Content-type': 'text/html'})

        const cardsHtml = dataObj.map(el => replaceTemplate(tempCard, el)).join('');
        const output = tempOverview.replace('{%PRODUCT_CARDS%}', cardsHtml);
        res.end(output);

    //product page
    }else if(pathname === '/product'){
        res.writeHead(200, {'Content-type': 'text/html'})
        const product = dataObj[query.id];
        const output = replaceTemplate(tempProduct, product)
        res.end(output);

    //api page
    }else if(pathname === '/api'){
        res.writeHead(200, {'Content-type': 'application/json'})
        res.end(data)

    //not-found page
    }else{
        res.writeHead(404, {
            'Content-type': 'text/html',
            'my-own-header': 'hello-world'
        })
        res.end('<h1>Page not found</h1>')
    }
})

server.listen(8081)