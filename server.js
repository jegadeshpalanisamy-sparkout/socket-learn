const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http, {
  cors: {
    origin: "*",
  }
});

io.on('connection', (socket) => {
    console.log('A user connected');
  
    // Listen for messages from the client
    socket.on('sendMessage', (message) => {
      console.log('Message received: ', message);
  
      // Broadcast the message to all clients except the sender
      socket.broadcast.emit('receiveMessage', message);
    });

    socket.on('disconnect', () => {
      console.log('A user disconnected');
    });
  });
  
http.listen(3000, () => {
    console.log('Server is running on port 3000');
});