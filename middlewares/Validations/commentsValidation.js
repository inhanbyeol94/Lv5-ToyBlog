require('dotenv').config();

const Joi = require('joi');
const { comment, database, error } = require('../../message.json');
const { Post, Comment } = require('../../models');

const commentsValidation = {
  createValidation: async (req, res, next) => {
    const { postId } = req.params;
    const { content } = req.body;
    const schema = Joi.object().keys({
      postId: Joi.number().empty().required().messages(comment.postId),
      content: Joi.string().max(3000).required().empty().messages(comment.content),
    });
    try {
      await schema.validateAsync({ postId, content });
    } catch (err) {
      return res.status(412).json({ message: err.message });
    }

    try {
      const findPost = await Post.findOne({ where: { post_id: postId } });
      if (!findPost) return res.status(412).json({ message: database.postNotfound });
    } catch (err) {
      console.error(err);
      return res.status(412).json({ message: error });
    }

    next();
  },

  updateValidation: async (req, res, next) => {
    const { postId, commentId } = req.params;
    const { content } = req.body;

    const schema = Joi.object().keys({
      postId: Joi.number().empty().required().messages(comment.postId),
      commentId: Joi.number().empty().required().messages(comment.commentsId),
      content: Joi.string().max(3000).required().empty().messages(comment.content),
    });
    try {
      await schema.validateAsync({ content, postId, commentId });
    } catch (err) {
      return res.status(412).json({ message: err.message });
    }

    try {
      const findPost = await Post.findOne({ where: { post_id: postId } });
      const findComment = await Comment.findOne({ where: { comment_id: commentId } });
      const commentAuthorValid = await Comment.findOne({ where: { comment_id: commentId, user_id: id } });

      if (!findPost) return res.status(412).json({ message: database.postNotfound });
      if (!findComment) return res.status(412).json({ message: database.commentNotfound });
      if (!commentAuthorValid) return res.status(412).json({ message: database.commentsAuthorNotFound });
    } catch (err) {
      console.error(err);
      return res.status(412).json({ message: error });
    }

    next();
  },

  deleteValidation: async (req, res, next) => {
    const { postId, commentId } = req.params;
    const { content } = req.body;

    const schema = Joi.object().keys({
      postId: Joi.number().empty().required().messages(comment.postId),
      commentId: Joi.number().empty().required().messages(comment.commentsId),
    });
    try {
      await schema.validateAsync({ postId, commentId });
    } catch (err) {
      return res.status(412).json({ message: err.message });
    }

    try {
      const findPost = await Post.findOne({ where: { post_id: postId } });
      const findComment = await Comment.findOne({ where: { comment_id: commentId } });
      const commentAuthorValid = await Comment.findOne({ where: { comment_id: commentId, user_id: id } });

      if (!findPost) return res.status(412).json({ message: database.postNotfound });
      if (!findComment) return res.status(412).json({ message: database.commentNotfound });
      if (!commentAuthorValid) return res.status(412).json({ message: database.commentsAuthorNotFound });
    } catch (err) {
      console.error(err);
      return res.status(412).json({ message: error });
    }

    next();
  },

  readValidation: async (req, res, next) => {
    const { postId } = req.params;
    const schema = Joi.object().keys({
      postId: Joi.number().empty().required().messages(comment.postId),
    });
    try {
      await schema.validateAsync({ postId });
    } catch (err) {
      return res.status(412).json({ message: err.message });
    }

    try {
      const findPost = await Post.findOne({ where: { post_id: postId } });
      if (!findPost) return res.status(412).json({ message: database.postNotfound });
    } catch (err) {
      console.error(err);
      return res.status(412).json({ message: error });
    }

    next();
  },
};

module.exports = commentsValidation;
