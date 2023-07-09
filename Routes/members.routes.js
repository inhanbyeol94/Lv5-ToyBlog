const express = require('express');
const router = express.Router();

const { signUpValidation, signInValidation } = require('../middlewares/Validations/membersValidation');

const MembersController = require('../controllers/members.controller');
const membersController = new MembersController();

router.post('/signup', signUpValidation, membersController.signUp);
router.post('/login', signInValidation, membersController.login);

module.exports = router;
