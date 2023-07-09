const express = require('express');
const router = express.Router();

const authValidation = require('../middlewares/Validations/authValidation');
const { likeValidation } = require('../middlewares/Validations/likesValidation');

const LikesController = require('../controllers/likes.controller');
const likesController = new LikesController();

router.put('/posts/:postId/like', authValidation, likeValidation, likesController.switch);
router.get('/like/posts', authValidation, likesController.getLikes);

module.exports = router;
