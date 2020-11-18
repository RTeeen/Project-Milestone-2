const http = require('http');
const fs = require('fs');
const fsP = require('fs').promises;
const path = require('path');
const formidable = require('formidable');
http.createServer((request, response)=> {
    console.log("request " + request.url);
    var filePath = request.url;
    if (filePath === '/favicon.ico') {
        response.writeHead(200, {'Content-Type': 'image/x-icon'} );
        response.end();
        return;
      }
   
    var extname = String(path.extname(filePath)).toLowerCase();
    var mimeTypes = {
        '.html': 'text/html',
        '.js': 'text/javascript',
        '.css': 'text/css',
        '.json': 'application/json',
        '.png': 'image/png',
        '.jpg': 'image/jpg',
        '.gif': 'image/gif',
        '.svg': 'image/svg+xml',
        '.wav': 'audio/wav',
        '.mp4': 'video/mp4',
        '.woff': 'application/font-woff',
        '.ttf': 'application/font-ttf',
        '.eot': 'application/vnd.ms-fontobject',
        '.otf': 'application/font-otf',
        '.wasm': 'application/wasm'
    };
    var contentType = mimeTypes[extname] || 'application/octet-stream';
    
    if (filePath === '/') {
        filePath = __dirname + '/index.html';
        console.log(filePath);
        fsP.readFile(filePath) 
        .then((content)=>{
            response.writeHead(200, { 'Content-Type': 'text/html' });
            response.end(content, 'utf-8');
        })
        .catch((err)=>{ console.log(err.code);
        });
    }else if(extname !== ""){
        filePath = __dirname + filePath;
        fsP.readFile(filePath) 
        .then((content)=>{
            response.writeHead(200, { 'Content-Type': 'text/html' });
            response.end(content, 'utf-8');
        })
        .catch((err)=>{ console.log(err.code);
        });
    }else{
        if(request.url === "/upload" && request.method.toLocaleLowerCase()==="post"){
            console.log(path.join(__dirname, "/uploads"));
            const form = formidable({ multiples: true, uploadDir: path.join(__dirname, "uploads"), keepExtensions: true});
            form.parse(request, (err,fields,files)=>{
                response.writeHead(200, {contentType:'text/html'});
                response.end("<h1> This is the result. It worked!</h1>");
            });
        }
    }

}).listen(8125);
console.log('Server running at http://127.0.0.1:8125/');