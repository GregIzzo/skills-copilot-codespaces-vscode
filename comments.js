// create web server
// 1. create a web server object
// 2. add an event handler to the server object
// 3. start the server listening on a port

// 1. create a web server object
const http = require('http');
const url = require('url');
const fs = require('fs');
const path = require('path');
const qs = require('querystring');
const port = 3000;
const commentsFile = path.join(__dirname, 'comments.json');
const comments = require(commentsFile);

// 2. add an event handler to the server object
const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const parsedQuery = parsedUrl.query;
    const parsedPath = parsedUrl.pathname;
    const method = req.method;

    if (parsedPath === '/') {
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write('<h1>Comments</h1>');
        res.write('<ul>');
        comments.forEach(comment => {
            res.write(`<li>${comment}</li>`);
        });
        res.write('</ul>');
        res.write('<form method="POST" action="/create">');
        res.write('<input type="text" name="comment">');
        res.write('<input type="submit">');
        res.write('</form>');
        res.end();
    } else if (parsedPath === '/create' && method === 'POST') {
        let body = '';
        req.on('data', chunk => {
            body += chunk;
        });
        req.on('end', () => {
            const comment = qs.parse(body).comment;
            comments.push(comment);
            fs.writeFile(commentsFile, JSON.stringify(comments), (err) => {
                if (err) {
                    console.log(err);
                } else {
                    res.writeHead(302, {'Location': '/'});
                    res.end();
                }
            });
        });
    } else {
        res.writeHead(404, {'Content-Type': 'text/html'});
        res.write('<h1>Not Found</h1>');
        res.end();
    }
});

// 3. start the server listening on a port
server.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});

