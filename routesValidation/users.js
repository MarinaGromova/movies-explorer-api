const { celebrate, Joi } = require('celebrate');

const userInfoUpdateValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    email: Joi.string().min(2).max(30).required(),
  }),
});

module.exports = { userInfoUpdateValidation };
