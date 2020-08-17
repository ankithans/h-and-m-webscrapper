const mongodb = require('mongodb').MongoClient;
const config = require('config');
const db = config.get('mongoURI');

async function connect() {
  try {
    const client = await mongodb.connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('connected to mongodb');
    return client;
  } catch (err) {
    console.error(err);
  }
}

module.exports = connect;
