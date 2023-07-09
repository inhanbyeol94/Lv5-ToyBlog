require('dotenv').config();

const Joi = require('joi');
const { post, database, error } = require('../../message.json');
const { Post } = require('../../models');

const postsValidation = {
  createValidation: async (req, res, next) => {
    const { title, content } = req.body;
    const schema = Joi.object().keys({
      title: Joi.string().max(50).empty().required().messages(post.title),
      content: Joi.string().max(5000).required().empty().messages(post.content),
    });
    try {
      await schema.validateAsync({ title, content });
    } catch (err) {
      return res.status(412).json({ message: err.message });
    }

    next();
  },

  updateValidation: async (req, res, next) => {
    const { postId } = req.params;
    const { title, content } = req.body;

    const schema = Joi.object().keys({
      postId: Joi.number().empty().required().messages(post.postId),
      title: Joi.string().max(50).empty().required().messages(post.title),
      content: Joi.string().max(5000).required().empty().messages(post.content),
    });
    try {
      await schema.validateAsync({ title, content, postId });
    } catch (err) {
      return res.status(412).json({ message: err.message });
    }

    try {
      const findPost = await Post.findOne({ where: { post_id: postId } });
      const postAuthorValid = await Post.findOne({ where: { post_id: postId, user_id: id } });

      if (!findPost) return res.status(412).json({ message: database.postNotfound });
      if (!postAuthorValid) return res.status(412).json({ message: database.postsAuthorNotFound });
    } catch (err) {
      console.error(err);
      return res.status(400).json({ message: error });
    }

    next();
  },

  deleteValidation: async (req, res, next) => {
    const { postId } = req.params;

    const schema = Joi.object().keys({
      postId: Joi.number().empty().required().messages(post.postId),
    });
    try {
      await schema.validateAsync({ postId });
    } catch (err) {
      return res.status(412).json({ message: err.message });
    }

    try {
      const findPost = await Post.findOne({ where: { post_id: postId } });
      const postAuthorValid = await Post.findOne({ where: { post_id: postId, user_id: id } });

      if (!findPost) return res.status(412).json({ message: database.postNotfound });
      if (!postAuthorValid) return res.status(412).json({ message: database.postsAuthorNotFound });
    } catch (err) {
      console.error(err);
      return res.status(400).json({ message: error });
    }

    next();
  },

  readValidation: async (req, res, next) => {
    const { postId } = req.params;

    const schema = Joi.object().keys({
      postId: Joi.number().empty().required().messages(post.postId),
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
      return res.status(400).json({ message: error });
    }

    next();
  },
};

module.exports = postsValidation;
