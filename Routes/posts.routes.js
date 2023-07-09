const express = require('express');
const router = express.Router();

const authValidation = require('../middlewares/Validations/authValidation');
const { createValidation, updateValidation, deleteValidation, readValidation } = require('../middlewares/Validations/postsValidation');

const PostsController = require('../controllers/posts.controller');
const postsController = new PostsController();

router.get('/posts', postsController.getPosts);
router.get('/posts/:postId', readValidation, postsController.getPost);
router.post('/posts', authValidation, createValidation, postsController.createPost);
router.put('/posts/:postId', authValidation, updateValidation, postsController.updatePost);
router.delete('/posts/:postId', authValidation, deleteValidation, postsController.deletePost);

module.exports = router;
