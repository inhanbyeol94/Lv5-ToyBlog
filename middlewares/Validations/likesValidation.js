require('dotenv').config();

const Joi = require('joi');
const { like, database, error } = require('../../message.json');
const { Post } = require('../../models');

const likesValidation = {
  likeValidation: async (req, res, next) => {
    const { postId } = req.params;

    const schema = Joi.object().keys({
      postId: Joi.number().empty().required().messages(like.postId),
    });
    try {
      await schema.validateAsync({ postId });
    } catch (err) {
      return res.status(412).json({ message: err.message });
    }

    try {
      const findPost = await Post.findOne({ where: { post_id: postId } });
      const likeAuthorValid = await Post.findOne({ where: { post_id: postId, user_id: id } });

      if (!findPost) return res.status(412).json({ message: database.postNotfound });
      if (likeAuthorValid) return res.status(412).json({ message: database.likesAuthorNotFound });
    } catch (err) {
      console.error(err);
      return res.status(400).json({ message: error });
    }

    next();
  },
};

module.exports = likesValidation;
