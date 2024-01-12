const mongoose = require('mongoose');
const validator = require('validator');

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      minLength: [2, 'Минимальная длина поля - 2 символа'],
      maxLength: [30, 'Максимальная длина поля - 30 символов'],
      required: [true, 'Поле "name" должно быть заполнено'],
    },
    email: {
      type: String,
      unique: true,
      required: [true, 'Поле "email" должно быть заполнено'],
      validate: {
        validator: (v) => validator.isEmail(v),
        message: 'Неправильный формат почты',
      },
    },
    password: {
      type: String,
      required: [true, 'Поле "password" должно быть заполнено'],
      select: false,
    },
  },
  { versionKey: false },
);

module.exports = mongoose.model('user', UserSchema);
