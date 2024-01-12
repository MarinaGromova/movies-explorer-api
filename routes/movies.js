const router = require('express').Router();

const {
  getAllMovies,
  createMovies,
  deleteMovie,
} = require('../controllers/movies');

const { createMoviesValidation, deleteMovieValidation } = require('../routesValidation/movies');

router.get('/movies', getAllMovies);

router.post(
  '/movies',
  createMoviesValidation,
  createMovies,
);

router.delete(
  '/movies/:movieId',
  deleteMovieValidation,
  deleteMovie,
);

module.exports = router;
