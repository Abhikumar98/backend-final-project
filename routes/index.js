var express = require('express');
var router = express.Router();
var {
  validateRequest
} = require('./../utils/index');
var {
  register,
  login
} = require('./../validation_rules');

var {
  register: registerController,
  login: loginController
} = require('./../controllers/index')

// Register new User
router.post(
  '/register',
  validateRequest(register),
  registerController
);

router.post(
  '/login',
  validateRequest(login),
  loginController
);

module.exports = router;
