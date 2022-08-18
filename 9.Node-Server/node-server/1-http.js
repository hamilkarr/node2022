const http = require('http');
const fs = require('fs');

console.log(http.STATUS_CODES);
console.log(http.METHODS);

const server = http.createServer((req, res) => {
    console.log("incoming...");
    console.log(req.headers);;
    console.log(req.httpVersion);
    console.log(req.method);
    console.log(req.url);

    const url = req.url;

    if(url === '/'){
        res.setHeader('Content-Type', 'text/html');
        fs.createReadStream('./html/index.html').pipe(res);
    } else if(url === '/course'){
        res.setHeader('Content-Type', 'text/html');
        res.write('<html>')
        res.write('<head><title>Hello</title></head>');
        res.write('<body><h1>Courses</h1></body>');
        res.write('</html>');
    } else {
        res.write('Not Found');
    }

    res.end();
});

server.listen(8080);