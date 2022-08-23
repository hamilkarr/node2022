import express from 'express';
import fs from 'fs';
import fsAsync from 'fs/promises';
import postRouter from './router/post.js';
import userRouter from './router/user.js';
import cors from 'cors';

const app = express();

app.use(cors({
    origin: ['http://'],
    optionsSuccessStatus: 200,
    credentials: true, //Access-Control-Allow-Credentials 
}));

app.use(express.json()); // REST API, Body parsing;
app.use(express.urlencoded({ extended : false})); //HTML Form
const option = {
    dotfiles : 'ignore',
    etag: false,
    index: false,
    maxAge: '1d',
    redirect: false,
    setHeaders: function (res, path, stat) {
        res.set('x-timestamp', Date.now());
    }
}
app.use(express.static('public', option));

app.use('/posts', postRouter);
app.use('/users', userRouter);

app.listen(8080);