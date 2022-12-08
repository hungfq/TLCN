const { Server } = require('socket.io');
const { getRedis } = require('./redis');

let _io;

const createSocket = (server) => {
  _io = new Server(server, {
    cors: {
      origin: 'http://localhost:8080',
      methods: ['GET', 'POST', 'OPTIONS'],
    },
  });

  _io.on('connection', (socket) => {
    console.log(`socket: ${socket.id} [CONNECTING.....]`);

    socket.emit('notify', 'init notification by server');

    socket.on('login', async (id) => {
      if (id !== null) {
        const redis = await getRedis();

        await redis.set(id.toString(), socket.id);
      }
      console.log(`socket: ${socket.id} ; client: ${id}`);
    });

    socket.on('logout', async (id) => {
      if (id !== null) {
        const redis = await getRedis();

        await redis.del(id.toString());
      }
      console.log(`socket: ${socket.id} ; logout: ${id}`);
    });

    socket.on('notify', (msg) => {
      // TO DO: don't know what
      console.log(`notify: ${msg}`);
    });

    socket.on('disconnect', () => {
      // TO DO: remove socket_id of user
      console.log(`socket: ${socket.id} [DISCONNECTED]`);
    });
  });

  return _io;
};

const getIo = () => _io;

module.exports = {
  createSocket,
  getIo,
};
