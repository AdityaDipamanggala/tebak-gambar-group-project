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
let leaderboard = [
    { nick: 'Mimin 1', point: 0 },
    { nick: 'Mimin 2', point: 0 },
    { nick: 'Mimin 3', point: 0 },
];

io.on('connection', (socket) => {
    connected++;
    console.log(`${connected} users connected`);

    io.emit('question', current.image);
    socket.emit('getLeaderboard', leaderboard);

    socket.on('getQuestion', (tunnel) => {
        io.emit(tunnel, current.image);
    });

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

    socket.on('ngebroadcast', (message) => {
        socket.broadcast.emit('broadcast', message);
    });

    socket.on('uploadPoint', (data) => {
        data.point = parseInt(data.point);
        const i = leaderboard.findIndex((el) => el.nick === data.nick);
        if (i >= 0) {
            leaderboard[i].point = data.point;
        } else if (parseInt(data.point) > 0) {
            leaderboard.push(data);
        }
        leaderboard = leaderboard.sort((a, b) => b.point - a.point).slice(0, 5);
    });

    setInterval(() => {
        socket.emit('getLeaderboard', leaderboard);
    }, 10000);

    socket.on('disconnect', () => {
        connected--;
        console.log(`A user disconnect (connected: ${connected})`);
    });
});

http.listen(port, () => {
    console.log('listening on *:3000');
});
