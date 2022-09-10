const username = process.env.MONGO_USERNAME;
const password = process.env.MONGO_PASSWORD;
const host = process.env.MONGO_HOST;
const port = process.env.MONGO_PORT;
const dbName = process.env.MONGO_DBNAME;
const testDBName = process.env.MONGO_DBNAME_TEST;

const mongoUrl = process.env.NODE_ENV === 'test'
  ? `mongodb://${username}:${password}@${host}:${port}/${testDBName}`
  : `mongodb://${username}:${password}@${host}:${port}/${dbName}`;

exports.mongoUrl = mongoUrl;
