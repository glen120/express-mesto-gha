const Card = require('../models/card');
const code = require('../utils/codes');

const getCards = (req, res) => Card.find({})
  .then((cards) => res.status(code.ok).send(cards))
  .catch(() => res.status(code.error).send({ message: 'Сервер не может обработать запрос' }));

const createCard = (req, res) => {
  const userId = req.user._id;
  const { name, link } = req.body;
  return Card.create({ name, link, owner: userId })
    .then((newCard) => res.status(code.created).send(newCard))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(code.bad_request).send({ message: 'Произошла ошибка при создании карточки' });
      } else {
        res.status(code.error).send({ message: 'Сервер не может обработать запрос' });
      }
    });
};

const deleteCardById = (req, res) => Card.findByIdAndRemove(req.params.cardId)
  .then((card) => {
    if (card) {
      res.status(code.ok).send(card);
    } else {
      res.status(code.not_found).send({ message: 'Запрашиваемая карточка не найдена' });
    }
  })
  .catch(() => res.status(code.error).send({ message: 'Сервер не может обработать запрос' }));

const putLike = (req, res) => {
  const userId = req.user._id;
  return Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: userId } },
    { new: true },
  )
    .then((card) => {
      if (card) {
        res.status(code.ok).send(card);
      } else {
        res.status(code.not_found).send({ message: 'Запрашиваемая карточка не найдена' });
      }
    })
    .catch(() => res.status(code.error).send({ message: 'Сервер не может обработать запрос' }));
};

const deleteLike = (req, res) => {
  const userId = req.user._id;
  return Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: userId } },
    { new: true },
  )
    .then((card) => {
      if (card) {
        res.status(code.ok).send(card);
      } else {
        res.status(code.not_found).send({ message: 'Запрашиваемая карточка не найдена' });
      }
    })
    .catch(() => res.status(code.error).send({ message: 'Сервер не может обработать запрос' }));
};

module.exports = {
  getCards,
  createCard,
  deleteCardById,
  putLike,
  deleteLike,
};
