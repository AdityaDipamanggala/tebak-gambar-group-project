'use strict';
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const cors = require('cors');
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const db = require('./data.json');

app.use(cors());

const getRandom = () => {
    return db[Math.floor(Math.random() * db.length)];
};

let current = getRandom();
let connected = 0;

io.on('connection', (socket) => {
    connected++;
    console.log(`${connected} users connected`);
    io.emit('question', current.image);

    socket.on('answer', (data) => {
        data.answer = data.answer.toString();
        if (current.answer === data.answer.trim().toLowerCase()) {
            current = getRandom();
            io.emit('question', current.image);
            io.emit(data.id, true);
        } else {
            io.emit(data.id, false);
        }
    });
});

http.listen(port, () => {
    console.log('listening on *:3000');
});
