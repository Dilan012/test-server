const http = require('http');
const socketIo = require('socket.io');
const express = require("express")
const server = http.createServer();
const io = socketIo(server, {
    cors: {
      origin: '*',  // Allow all origins to access Socket.IO
      methods: ['GET', 'POST'],
      credentials: true,
    },
  });
const app = express()
var cors = require('cors')

// app.use(cors({
//     origin: ['https://test.ganket.work.gd', "http://127.0.0.1:5500"],
//     //credentials:true
// }));
app.use(cors({
    origin: '*',  // Allow all origins to access
    credentials: true,
  }));


// Game state
let gameState = {
  ball: { x: 100, y: 100, dx: 2, dy: 2 },
  paddle1: { y: 100 },
  paddle2: { y: 100 },
  score1: 0,
  score2: 0,
};

io.on('connection', (socket) => {
  console.log('A player connected');

  // Send initial game state
  socket.emit('gameState', gameState);

  // Listen for player paddle movement
  socket.on('movePaddle', (data) => {
    console.log(data)
    if (data.player === 1) {
      gameState.paddle1.y = data.y;
    } else if (data.player === 2) {
      gameState.paddle2.y = data.y;
    }

    // Broadcast the new game state to all players
    io.emit('gameState', gameState);
  });

  // Handle disconnect
  socket.on('disconnect', () => {
    console.log('A player disconnected');
  });
});

// Game loop to update the ball position
setInterval(() => {
  gameState.ball.x += gameState.ball.dx;
  gameState.ball.y += gameState.ball.dy;

  // Ball collision logic (basic)
  if (gameState.ball.y <= 0 || gameState.ball.y >= 200) {
    gameState.ball.dy *= -1; // Reverse direction
  }

  if (gameState.ball.x <= 0 || gameState.ball.x >= 400) {
    gameState.ball.dx *= -1; // Reverse direction
  }

  // Broadcast the updated game state
  io.emit('gameState', gameState);
}, 1000 / 60); // 60 FPS

server.listen(3000, () => {
  console.log('Server is running on port 3000');
});
