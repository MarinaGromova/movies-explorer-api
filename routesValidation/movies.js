const { celebrate, Joi } = require('celebrate');
const { regexUrl } = require('../utils/utils');

const createMoviesValidation = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    movieId: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().regex(regexUrl).required(),
    trailerLink: Joi.string().regex(regexUrl).required(),
    thumbnail: Joi.string().regex(regexUrl).required(),
    nameRU: Joi.string().required().min(2).max(30),
    nameEN: Joi.string().required().min(2).max(30),
  }),
});

const deleteMovieValidation = celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().hex().length(24),
  }),
});

module.exports = { createMoviesValidation, deleteMovieValidation };
