const User = require('../models/user');
const code = require('../utils/codes');

const getUsers = (req, res) => User.find({})
  .then((users) => res.status(code.ok).send(users))
  .catch(() => res.status(code.error).send({ message: 'Сервер не может обработать запрос' }));

const getUserById = (req, res) => User.findById(req.params.userId)
  .then((user) => {
    if (user) {
      res.status(code.ok).send(user);
    } else {
      res.status(code.not_found).send({ message: 'Запрашиваемый пользователь не найден' });
    }
  })
  .catch(() => res.status(code.error).send({ message: 'Сервер не может обработать запрос' }));

const createUser = (req, res) => {
  const newUserData = req.body;
  return User.create(newUserData)
    .then((newUser) => res.status(code.created).send(newUser))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(code.bad_request).send({ message: 'Произошла ошибка при создании пользователя' });
      } else {
        res.status(code.error).send({ message: 'Сервер не может обработать запрос' });
      }
    });
};

const updateUser = (req, res) => {
  const { name, about } = req.body;
  const userId = req.user._id;
  return User.findByIdAndUpdate(userId, { name, about }, { new: true })
    .then((user) => {
      if (user) {
        res.status(code.ok).send(user);
      } else {
        res.status(code.not_found).send({ message: 'Запрашиваемый пользователь не найден' });
      }
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(code.bad_request).send({ message: 'Произошла ошибка при обновлении профиля' });
      } else {
        res.status(code.error).send({ message: 'Сервер не может обработать запрос' });
      }
    });
};

const updateAvatar = (req, res) => {
  const { avatar } = req.body;
  const userId = req.user._id;
  return User.findByIdAndUpdate(userId, { avatar }, { new: true })
    .then((user) => {
      if (user) {
        res.status(code.ok).send(user);
      } else {
        res.status(code.not_found).send({ message: 'Запрашиваемый пользователь не найден' });
      }
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(code.bad_request).send({ message: 'Произошла ошибка при обновлении аватара' });
      } else {
        res.status(code.error).send({ message: 'Сервер не может обработать запрос' });
      }
    });
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  updateAvatar,
};
