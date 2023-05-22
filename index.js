const PORT = 3000;
const apiRouter = require('./api');
const morgan = require('morgan');
const express = require('express');
const server = express();

server.use(morgan('dev'))
server.use(express.json())
server.use('/api', apiRouter);

const { client } = require('./DB')
client.connect();

server.listen(PORT, () => {
    console.log('The server is up on port', PORT)
  });