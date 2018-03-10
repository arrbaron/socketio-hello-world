const socket = io();

const message = document.getElementById('message');
const handle = document.getElementById('handle');
const button = document.getElementById('send');
const output = document.getElementById('output');
const feedback = document.getElementById('feedback');

button.addEventListener('click', () => {
  socket.emit('chat message', {
    message: message.value,
    handle: handle.value
  });
  output.innerHTML += `<p><strong>${handle.value}: </strong>${message.value}</p>`;
  message.value = '';
});

message.addEventListener('keypress', () => {
  socket.emit('typing', handle.value);
});

message.addEventListener('keyup', () => {
  if (message.value === '') {
    socket.emit('typing finish');
  }
});

socket.on('chat message', data => {
  feedback.innerHTML = '';
  output.innerHTML += `<p><strong>${data.handle}: </strong>${data.message}</p>`;
});

socket.on('typing', data => {
  feedback.innerHTML = `<p><em>${data} is typing a message...</em></p>`;
});

socket.on('typing finish', () => {
  feedback.innerHTML = '';
});

socket.on('connected', data => {
  output.innerHTML += `<strong>User ${data} connected.</strong></p>`;
});