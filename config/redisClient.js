const redis = require('redis');

const redisClient = redis.createClient({
  password: process.env.REDIS_PASSWORD,
  socket: {
      host: process.env.REDIS_HOST,
      port: process.env.REDIS_PORT
  }
});

redisClient.on('error', (err) => console.error('Redis Client Error', err));
redisClient.on('ready', () => console.log('Successfully connected to Redis Cloud!'));

redisClient.connect();

module.exports = redisClient;