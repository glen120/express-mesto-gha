const cards = require('express').Router();
const {
  getCards, createCard, deleteCardById, putLike, removeLike,
} = require('../controllers/cards');

cards.get('/cards', getCards);
cards.post('/cards', createCard);
cards.delete('/cards/:cardId', deleteCardById);
cards.put('/cards/:cardId/likes', putLike);
cards.delete('/cards/:cardId/likes', removeLike);

module.exports = cards;
