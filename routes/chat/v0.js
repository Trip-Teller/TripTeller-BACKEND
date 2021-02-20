//  const env = process.env.NODE_ENV;
const express = require('express');
//  const { v4: uuidv4 } = require('uuid');
const server = require('http');
const io = require('socket.io')(server);

// const {
//     Errors,
//     HttpBadRequest,
//     HttpInternalServerError
// } = require('../../middlewares/error');

// const db = require('../../models');
// const {
//   createToken
// } = require('../../utils/token');

const asyncRoute = require('../../utils/asyncRoute');

// const { Chatting } = db;

const rooms = {};

// app.get('/', (req, res) => {
//     res.render('index',{rooms:rooms})
// })

const getChatting = async (req, res) => {
  // res.json('good')
  res.render('index', { rooms });
};

// app.post('/room', (req, res) => {
//     if (rooms[req.body.room] != null) {
//         return res.redirect('/')
//     }
//     rooms[req.body.room] = { users: {} }
//     res.redirect(req.body.room)
//     //send message that new room was created
//     io.emit('room-created', req.body.room)
// })

// eslint-disable-next-line consistent-return
const createChatting = async (req, res) => {
  if (rooms[req.body.room] != null) {
    return res.redirect('/');
  }
  rooms[req.body.room] = { users: {} };
  res.redirect(req.body.room);

  io.emit('chatting room created', req.body.room);
};

// app.get('/:room', (req, res) => {
//     if (rooms[req.params.room] == null) {
//         return res.redirect('/')
//     }
//     res.render('room', { roomName: req.params.room })
// })

// eslint-disable-next-line consistent-return
const getReceiverChatting = async (req, res) => {
  if (rooms[req.params.room] == null) {
    return res.redirect('/');
  }
  res.render('room', { roomName: req.params.room });
};

io.on('connection', (socket) => {
  socket.on('new-user', (room, name) => {
    socket.join(room);
    rooms[room].users[socket.id] = name;
    socket.to(room).broadcast.emit('user-connected', name);
  });

  socket.on('send-chat-mmessage', (room, message) => {
    socket.to(room).broadcast.emit('chat-message', {
      message,
      name: rooms[room].users[socket.id],
    });
  });

  socket.on('disconnect', () => {
    // eslint-disable-next-line no-use-before-define
    getUserRooms(socket).forEach((room) => {
      socket
        .to(room)
        .broadcast.emit('user-disconnected', rooms[room].users[socket.id]);
      delete rooms[room].users[socket.id];
    });
  });
});

function getUserRooms(socket) {
  return Object.entries(rooms).reduce((names, [name, room]) => {
    if (room.users[socket.id] != null) names.push(name);
    return names;
  }, []);
}

const router = express.Router();

router.get('/', asyncRoute(getChatting));

router.post('/room', asyncRoute(createChatting));

router.get('/:room', asyncRoute(getReceiverChatting));

module.exports = {
  router,
  getChatting,
  createChatting,
  getReceiverChatting,
};
