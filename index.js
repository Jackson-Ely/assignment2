// Server URL: https://assignment2-zpof.onrender.com

const http = require('http');
const fs = require('fs');
const path = require('path');
const { MongoClient } = require('mongodb');

const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb+srv://jackson:3126Mongo@cluster0.bwuujoo.mongodb.net/?appName=Cluster0';

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

    // serve the website
    if (req.url === '/') {

        fs.readFile(path.join(__dirname, 'index.html'),
            (err, content) => {
                if (err) throw err;

                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.end(content);
            }
        );

    // pull the data from MongoDB
    } else if (req.url === '/api') {

        const client = new MongoClient(MONGO_URI);

        client.connect()
            .then(() => {
                return client.db('astronomyclub').collection('astro').find({}).toArray();
            })
            .then(data => {
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify(data));
                client.close();
            })
            .catch(err => {
                console.log(err);
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('500 - Database Error');
                client.close();
            });

    // Images
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

server.listen(PORT, () => console.log(`Server is running`));