require('dotenv').config();

const Joi = require('joi');
const { user } = require('../../message.json');

const membersValidation = {
    signUpValidation: async (req, res, next) => {
        const body = req.body;
        const schema = Joi.object().keys({
            id: Joi.string()
                .min(6)
                .max(25)
                .empty()
                .regex(/^[A-Za-z0-9+]*$/)
                .required()
                .messages(user.id),
            nickname: Joi.string()
                .min(2)
                .max(15)
                .required()
                .empty()
                .regex(/^(?=.*[a-z0-9가-힣])[a-z0-9가-힣]{2,16}$/)
                .messages(user.nickname),
            password: Joi.string()
                .min(8)
                .max(20)
                .required()
                .empty()
                .regex(/^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+])/)
                .messages(user.password),
            confirmPassword: Joi.string().required().empty().valid(Joi.ref('password')).messages(user.confirmPassword),
        });
        try {
            await schema.validateAsync(body);
        } catch (err) {
            return res.status(412).json({ message: err.message });
        }

        next();
    },
    signInValidation: async (req, res, next) => {
        const body = req.body;
        const schema = Joi.object().keys({
            id: Joi.string()
                .min(6)
                .max(25)
                .empty()
                .regex(/^[A-Za-z0-9+]*$/)
                .required()
                .messages(user.id),
            password: Joi.string()
                .min(8)
                .max(20)
                .required()
                .empty()
                .regex(/^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+])/)
                .messages(user.password),
        });
        try {
            await schema.validateAsync(body);
        } catch (err) {
            return res.status(412).json({ message: err.message });
        }

        next();
    },
};

module.exports = membersValidation;
