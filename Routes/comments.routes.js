const express = require('express');
const router = express.Router();

const authMiddleware = require('../middlewares/Validations/authValidation');
const { createValidation, updateValidation, deleteValidation, readValidation } = require('../middlewares/Validations/commentsValidation');

const CommentsController = require('../controllers/comments.controller');
const commentsController = new CommentsController();

router.get('/posts/:postId/comments', readValidation, commentsController.getComments);
router.post('/posts/:postId/comments/', authMiddleware, createValidation, commentsController.createComment);
router.put('/posts/:postId/comments/:commentId', authMiddleware, updateValidation, commentsController.updateComment);
router.delete('/posts/:postId/comments/:commentId', authMiddleware, deleteValidation, commentsController.deleteComment);

module.exports = router;
