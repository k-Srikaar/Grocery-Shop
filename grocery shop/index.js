const fs = require('fs');
const http = require('http');
const url = require('url');
const replacetemplate = require('./starter/module/replacetemplate.js');


const tempcard = fs.readFileSync('./starter/templates/tempcards.html','utf-8');
const temp_overview = fs.readFileSync('./starter/templates/overview.html','utf-8');
const temp_product = fs.readFileSync('./starter/templates/product.html','utf-8');

const data = fs.readFileSync('./starter/dev-data/data.json','utf-8');
const dataObj = JSON.parse(data);

// Creating live server .

const server = http.createServer((req,res)=>{
    const {pathname,query} = url.parse(req.url,true);
    // const pathname_url = url.parse(req.url,true);
    // console.log();
    if(pathname === '/overview'){
        res.writeHead(200,{'content-type' : 'HTML'});
        const tempcards_details = dataObj.map(el => replacetemplate(tempcard,el)).join();
        const output = temp_overview.replace('{%PRODUCT_CARDS%}',tempcards_details);
        res.end(output);
        // res.end("This is OVerview");
    }
    else if(pathname === '/product'){
        res.writeHead(200,{'content-type' : 'HTML'});
        const product_ele = dataObj[query.id];
        const output = replacetemplate(temp_product,product_ele);
        res.end(output);
    }
    else{
        res.writeHead(400,{'page-type':'NONE'});
        res.end('<h1>Page not found !</h1>');
    }
})

server.listen(8000,'127.0.0.1',()=>{
    console.log("Listening requests to the port 8000 :");
})