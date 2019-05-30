const express = require('express');

const server = express();

const userRouter = require('./users/userRouter.js');
const postRouter = require('./posts/postRouter.js');

server.use(express.json());
server.use(logger);

server.use('/api/users', userRouter);
server.use('/api/posts', postRouter);

server.get('/', (req, res) => {
  res.status(200).json({
    messageOfTheDay: process.env.MOTD
  })
});

//custom middleware

function logger(req, res, next) {
  const time = new Date()
  console.log(` A ${req.method} to ${req.url} at ${time}`)
  next();
};


module.exports = server;
