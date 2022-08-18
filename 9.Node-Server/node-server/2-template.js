const http = require('http');
const fs = require('fs');
const ejs = require('ejs');
// console.log(http.STATUS_CODES);
// console.log(http.METHODS);

const name = 'Ellie';
const courses = [
    {name: "HTML"},
    {name: "CSS"},
    {name: "JS"},
    {name: "Node"},
    {name: "FrontEnd"},
];
const server = http.createServer((req, res) => {
    console.log("incoming...");
    // console.log(req.headers);;
    // console.log(req.httpVersion);
    // console.log(req.method);
    // console.log(req.url);
    const url = req.url;
    
    res.setHeader('Content-Type', 'text/html');
    if(url === '/'){
        ejs
            .renderFile('./template/index.ejs',{name})
            .then(data => res.end(data));
    } else if(url === '/course'){        
        ejs
            .renderFile('./template/courses.ejs',{courses})
            .then(data => res.end(data));
    } else {
        const read = fs.createReadStream('./html/index.html');
        read.pipe(res);
    }

    // res.end();
});

server.listen(8080);