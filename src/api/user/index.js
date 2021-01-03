const { Router } = require('express');
const {
  register,
  login,
  logout,
  remove,
  update,
  getSelf,
  getAll
} = require('./user.controller');
const authMW = require('../../middlewares/auth');
const joiMW = require('../../middlewares/joi');
const permission = require('../../middlewares/permission');
const {createJoi, updateJoi} = require('./user.joi');

const router = new Router();

router
  .route('/')
  .post(joiMW(createJoi), register)
  .delete(authMW, remove)
  .patch(authMW, joiMW(updateJoi), update)
  .get(authMW, getSelf);
router.route('/login').post(login);
router.route('/logout').get(authMW, logout);
router.route('/get-all').get(authMW, permission, getAll);

module.exports = router;
