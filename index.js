// Server URL: https://assignment2-zpof.onrender.com

const http = require('http');
const fs = require('fs');
const path = require('path');
const PORT = 3000;

// Fix for images not loading
// Found online, unsure how it works exactly but it does work
const mimeTypes = {
    '.html': 'text/html',
    '.css':  'text/css',
    '.js':   'text/javascript',
    '.json': 'application/json',
    '.png':  'image/png',
    '.jpg':  'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.gif':  'image/gif',
    '.svg':  'image/svg+xml',
    '.ico':  'image/x-icon'
};

const server = http.createServer((req, res) => {

    // ── Route: / — serve the organization website ──
    if (req.url === '/') {

        fs.readFile(path.join(__dirname, 'index.html'),
            (err, content) => {
                if (err) throw err;

                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.end(content);
            }
        );

    // ── Route: /api — serve db.json as JSON ──
    } else if (req.url === '/api') {

        fs.readFile(path.join(__dirname, 'db.json'),
            (err, content) => {
                if (err) throw err;

                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(content);
            }
        );

    // Fix for images not loading
    // Found online, unsure how it works exactly but it does work
    } else {

        const filePath = path.join(__dirname, req.url);
        const ext = path.extname(filePath);
        const contentType = mimeTypes[ext] || 'application/octet-stream';

        fs.readFile(filePath,
            (err, content) => {
                if (err) {
                    res.writeHead(404, { 'Content-Type': 'text/plain' });
                    res.end('404 - File Not Found');
                } else {
                    res.writeHead(200, { 'Content-Type': contentType });
                    res.end(content);
                }
            }
        );
    }

    console.log(req.url);
});

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
