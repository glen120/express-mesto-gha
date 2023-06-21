const express = require('express');
const mongoose = require('mongoose');
const router = require('./routes/index');

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

// Временное решение авторизации
app.use((req, res, next) => {
  req.user = {
    _id: '64921ec0ca65267ff56d06c7',
  };
  next();
});

app.use(router);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
