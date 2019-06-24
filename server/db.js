const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

let connectedToLiveDb = false;
let testMongooseConnection;

// TODO: Make it impossible for tests to run when connected to a live DB
//       Example: if someone set NODE_ENV to something other than test

exports.connect = () => {
  if (process.env.NODE_ENV === 'test') {
    return connectTestDb();
  } else {
    return connectLiveDb();
  }
}

exports.clearTestDb = () => {
  if (connectedToLiveDb || !testMongooseConnection) {
    return console.log(`
      WARNING: Do not call clearTestDb() unless connected to test DB!
               To use the in-memory test DB, set process.env.NODE_ENV = 'test'
    `);
  }

  return testMongooseConnection.db.collections()
    .then(collections => {
      const promises = collections.map(async (col) => {
        return col.deleteMany();
      });

      return Promise.all(promises);
    })
    .catch(console.error);
}

function connectLiveDb() {
  return mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true})
    .then(() => {
      connectedToLiveDb = true;
      console.log(`Connected to ${process.env.NODE_ENV} MongoDB`);
    })
    .catch(console.error);
}

function connectTestDb() {
  const mongoServer = new MongoMemoryServer();

  return mongoServer.getConnectionString()
    .then((mongoUri) => {
      const mongooseOpts = {
        autoReconnect: true,
        reconnectTries: Number.MAX_VALUE,
        reconnectInterval: 1000,
        useNewUrlParser: true
      }
      
      return mongoose.connect(mongoUri, mongooseOpts)
        .then(() => {
          // console.log(`Test MongoDB successfully connected to ${mongoUri}`);
          testMongooseConnection = mongoose.connection;
          console.log(`Connected to test MongoDB: ${mongoUri}`);
        })
        .catch(console.error);
    })
    .catch(console.error);
};

