const redis = require('redis');

let _redis;

const createRedis = async () => {
  _redis = redis.createClient(
    {
      url: 'redis://localhost:6379',
    },
  );
  await _redis.connect();
};

const getRedis = async () => {
  if (_redis) return _redis;
  await createRedis();
  return _redis;
};

module.exports = {
  createRedis,
  getRedis,
};
