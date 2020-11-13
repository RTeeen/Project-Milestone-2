const http = require('http');
const fs = require('fs');
const path = require('path');
const formidable = require('formidable');

http.createServer((request, response)=> {
    console.log('request ', request.url);
    var filePath = '.' + request.url;
    if (filePath == './') {
        filePath = './index.html';
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
    fs.readFile(filePath, function (error, content) {
        if (error) {
            if (error.code == 'ENOENT') {
                fs.readFile('./404.html', function (error, content) {
                    response.writeHead(404, { 'Content-Type': 'text/html' });
                    response.end(content, 'utf-8');
                });
            }
            else {
                response.writeHead(500);
                response.end('Sorry, check with the site admin for error: ' + error.code + ' ..\n');
            }
        }
        else {
            response.writeHead(200, { 'Content-Type': contentType });
            response.end(content, 'utf-8');
        }
    });
    if (req.url === "./upload.html" && req.method.toLowerCase() === 'post') {
        // parse a file upload
        const form = formidable({ multiples: true });
     
        form.parse(req, (err, fields, files) => {
          res.writeHead(200, { 'content-type': 'application/json' });
          res.end(JSON.stringify({ fields, files }, null, 2));
        });
     
        return;
      }
      res.writeHead(200, { 'content-type': 'text/html' });
      res.end(`
        <h2>With Node.js <code>"http"</code> module</h2>
        <form action="/api/upload" enctype="multipart/form-data" method="post">
          <div>Text field title: <input type="text" name="title" /></div>
          <div>File: <input type="file" name="multipleFiles" multiple="multiple" /></div>
          <input type="submit" value="Upload" />
        </form>
      `);
}).listen(8125);
console.log('Server running at http://127.0.0.1:8125/');