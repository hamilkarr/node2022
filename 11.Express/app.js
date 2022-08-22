import express from 'express';
import fs from 'fs';
import fsAsync from 'fs/promises';

const app = express();

app.use(express.json());

app.get('/file1', (req,res)=> {
    try {
        const data  = fs.readFileSync('./file.txt');
    } catch(error) {
        res.status(404).send("File not Found");
    }

    fs.readFile('/file1.txt',(err,data) => {
        if(err) {
            res.status(404).send("File not Found!");
        } // 비동기적 흐름에서는 에러가 외부로 던져지지 않는다. 
    });
});

app.get('/file2', (req,res,next)=> {
    fsAsync
        .readFile('file.txt')
        .then((data)=>{})
        .catch((error) => res.status(404).send("File not Found!"));
});

app.get('/file3', async (req,res) => {
    try {
        const data = await fsAsync.readFile('/file.txt');
    } catch(error) {
        res.status(404).send("File not Found!");
    }
})

app.use((error,req,res,next) => {
    console.error(error);
    res.status(500).json({message: "Something wrong"});
});

app.listen(8080);