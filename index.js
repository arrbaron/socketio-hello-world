const express = require('express');
const socket = require('socket.io');

const app = express();

const server = app.listen(3000, () => {
  console.log('listening on port 3000');
});

app.use(express.static('public'));

const io = socket(server);

io.on('connection', socket => {
  socket.broadcast.emit('connected', socket.id);

  socket.on('chat message', data => {
    socket.broadcast.emit('chat message', data);
  });

  socket.on('typing', data => {
    socket.broadcast.emit('typing', data);
  });

  socket.on('typing finish', () => {
    socket.broadcast.emit('typing finish');
  });
});