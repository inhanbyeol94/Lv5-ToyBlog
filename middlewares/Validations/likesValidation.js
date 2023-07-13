require('dotenv').config();

const Joi = require('joi');
const { like } = require('../../message.json');

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

        next();
    },
};

module.exports = likesValidation;
