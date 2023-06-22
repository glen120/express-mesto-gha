const router = require('express').Router();
const usersRouter = require('./users');
const cardsRouter = require('./cards');
const code = require('../utils/codes');

router.use(usersRouter);
router.use(cardsRouter);

router.all('*', (req, res) => {
  res.status(code.not_found).send({ message: 'Ошибочный адрес запроса' });
});

module.exports = router;
