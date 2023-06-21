const cards = require('express').Router();
const {
  getCards, createCard, deleteCardById, putLike, deleteLike,
} = require('../controllers/cards');

cards.get('/cards', getCards);
cards.post('/cards', createCard);
cards.delete('/cards/:cardId', deleteCardById);
cards.put('/cards/:cardId/likes', putLike);
cards.delete('/cards/:cardId/likes', deleteLike);

module.exports = cards;
