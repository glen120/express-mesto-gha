const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const router = require('./routes/index');
const errorHandler = require('./middlewares/errorHandler');

const app = express();

const { PORT = 3000 } = process.env;
const DB_URL = 'mongodb://127.0.0.1:27017/mestodb';

mongoose
  .connect(DB_URL)
  .then(() => {
    console.log(`Connect to database ${DB_URL}`);
  })
  .catch((err) => {
    console.log('Connection failed');
    console.log(err);
  });

app.use(express.json());

app.use(router);

app.use(errors());

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
