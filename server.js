const http = require('http');
const fs = require('fs');
const fsP = require('fs').promises;
const path = require('path');
const formidable = require('formidable');
const {onlineGrayscale} = require("./grayscale/main.js");


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
        //console.log(filePath);
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
        .catch((err)=>{ 
            if (err.code == 'ENOENT') {
                fs.readFile('./404.html', function (error, content) {
                    response.writeHead(404, { 'Content-Type': 'text/html' });
                    response.end(content, 'utf-8');
                });
            }
            else {
                response.writeHead(500);
                response.end('Sorry, check with the site admin for error: ' + err.code + ' ..\n');
            }
        });
    }else{
        if(request.url === "/upload" && request.method.toLocaleLowerCase()==="post"){
            const form = formidable({ multiples: true, uploadDir: path.join(__dirname, "grayscale" ,"uploads"), keepExtensions: true});
            form.parse(request, (err,fields,files)=>{
                fs.readFile('./upload.html', function (error, content) {
                    response.writeHead(404, { 'Content-Type': 'text/html' });
                    fsP.readdir(path.join(__dirname,"grayscale", "uploads"))
                        .then((data)=>{
                                 data.forEach(elementz => {
                                 let i=1;
                                 elementz =path.join(__dirname,"grayscale", "uploads", elementz);
                                 let finalName = path.join(__dirname,"grayscale", "uploads", `${i}.png`);
                                 console.log(elementz);
                                 console.log("doing it!");
                                 fs.rename(elementz, finalName ,(err)=>{
                                    console.error(err);
                                 })
                                 i++;

                                    
                             });
                        })
                        .then(()=>onlineGrayscale())
                        .catch((err)=>reject(err))


                    response.end(content, 'utf-8');
                });
            });
        }
        
    }

}).listen(8125);
console.log('Server running at http://127.0.0.1:8125/');