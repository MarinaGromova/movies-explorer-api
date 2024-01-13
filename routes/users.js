const router = require('express').Router();
const { userInfoUpdateValidation } = require('../routesValidation/users');

const {
  getUsers,
  updateUsersInfo,
  getUserById,
} = require('../controllers/users');

router.get('/users', getUsers);

router.get('/users/me', getUserById);

router.patch(
  '/users/me',
  userInfoUpdateValidation,
  updateUsersInfo,
);

module.exports = router;
