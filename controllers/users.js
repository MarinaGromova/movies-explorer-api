const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/user');

const { NODE_ENV, JWT_SECRET } = require('../config');

const {
  BadRequestError,
  NotFoundError,
  AuthorizationError,
  ConflictError,
} = require('../errors/errors');

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  User.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return next(new AuthorizationError('Такого пользователя не существует'));
      }
      return bcrypt.compare(String(password), user.password)
        .then((matched) => {
          if (!matched) {
            return next(new AuthorizationError('Неправильные почта или пароль'));
          }

          const token = jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : 'some-secret-key', { expiresIn: '7d' });
          return res.send({ token });
        })
        .then(() => res.send({ message: 'Успешный вход' }))
        .catch(next);
    })
    .catch(next);
};

module.exports.createUser = (req, res, next) => {
  const {
    name, email, password,
  } = req.body;
  bcrypt.hash(password, 10).then((hash) => {
    User.create({
      name,
      email,
      password: hash,
    })
      .then((user) => res.status(201).send({
        _id: user._id,
        name: user.name,
        email: user.email,
      }))
      .catch((err) => {
        if (err.name === 'ValidationError') {
          next(new BadRequestError('Переданы некорректные данные'));
        } else if (err.code === 11000) {
          next(new ConflictError('Пользователь с таким email уже зарегистрирован'));
        } else {
          next(err);
        }
      });
  })
    .catch(next);
};

module.exports.getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.send(users))
    .catch(next);
};

module.exports.getUserById = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Пользователь не найден');
      }
      res.status(200).send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Получение пользователя с некорректным id'));
      } else {
        next(err);
      }
    });
};

module.exports.updateUsersInfo = (req, res, next) => {
  const { name, email } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { name, email },
    { new: true, runValidators: true },
  )
    .then((user) => {
      if (!user) {
        next(new NotFoundError('Пользователь не найден'));
        return;
      }
      res.send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Получение пользователя с некорректным id'));
      } else {
        next(err);
      }
    });
};
