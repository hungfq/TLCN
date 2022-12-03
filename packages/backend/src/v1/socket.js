const { Server } = require('socket.io');
const { getRedis } = require('./redis');

let _io;

const createSocket = (server) => {
  _io = new Server(server);

  _io.on('connection', (socket) => {
    console.log(`socket id: ${socket.id}`);

    socket.emit('notify', 'init notification by server');

    socket.on('id', async (id) => {
      if (id !== null) {
        const redis = await getRedis();

        const temp = await redis.get(id.toString());
        if (!temp) {
          await redis.set(id.toString(), socket.id);
        }
      }
      console.log(`client id: ${id}`);
    });

    socket.on('notify', (msg) => {
      // TO DO: don't know what
      console.log(`notify: ${msg}`);
    });

    socket.on('disconnect', () => {
      // TO DO: remove socket_id of user
      console.log('user disconnected');
    });
  });

  return _io;
};

const getIo = () => _io;

module.exports = {
  createSocket,
  getIo,
};
