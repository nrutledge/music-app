require('dotenv').config();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const db = require('./db');

const authRoutes = require('./routes/auth');
const errorMiddleware = require('./middlewares/error');

app.use(bodyParser.json());

app.get('/', (req, res) => res.send('App is running successfully'));
app.use(authRoutes);

app.use(errorMiddleware);

port = process.env.PORT;


db.connect()
  .then(() => {
    app.listen(port, () => {
      console.log(
        `App listening on port ${port}.
        NODE_ENV is ${process.env.NODE_ENV}`
      );
      app.emit('appStarted');
    });
  })
  .catch(console.error);

// Export app for use in integration tests
module.exports = app;