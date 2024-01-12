const router = require('express').Router();
const auth = require('../middlewares/auth');
const NotFoundError = require('../errors/NotFoundError');
const { login, createUser } = require('../controllers/users');
const userRouter = require('./users');
const moviesRouter = require('./movies');
const { signinValidation, signupValidation } = require('../routesValidation/auth');

router.post(
  '/signin',
  signinValidation,
  login,
);
router.post(
  '/signup',
  signupValidation,
  createUser,
);

router.use('/', auth, userRouter);
router.use('/', auth, moviesRouter);

router.use('*', auth, (req, res, next) => next(new NotFoundError('Маршрут не найден')));

module.exports = router;
