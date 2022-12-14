const http = require('http');
const fs = require('fs');

// console.log(http.STATUS_CODES);
// console.log(http.METHODS);

const server = http.createServer((req, res) => {
    console.log("incoming...");
    // console.log(req.headers);;
    // console.log(req.httpVersion);
    // console.log(req.method);
    // console.log(req.url);
    const url = req.url;
    
    res.setHeader('Content-Type', 'text/html');
    if(url === '/'){
        if(fs.existsSync('./html/index.html')) {
            console.log("True");
        }
        const read = fs.createReadStream('./html/index.html');
        read.pipe(res);
    } else if(url === '/course'){        
        fs.createReadStream('./html/courses.html').pipe(res);
        // res.setHeader('Content-Type', 'text/html');
        // res.write('<html>')
        // res.write('<head><title>Hello</title></head>');
        // res.write('<body><h1>Courses</h1></body>');
        // res.write('</html>');
    } else {
        const read = fs.createReadStream('./html/index.html');
        read.pipe(res);
    }

    // res.end();
});

server.listen(8080);