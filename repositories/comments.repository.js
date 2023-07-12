const { Op } = require('sequelize');
const { Comment, Member } = require('../models');

class CommentRepository {
    findAllComment = async (target) => {
        return await Comment.findAll({ where: { [Op.and]: target }, attributes: ['comment_id', 'content', 'created_at', 'updated_at'], include: [{ model: Member, attributes: ['nickname'] }], order: [['created_at', 'DESC']] });
    };
    findOneComment = async (target) => {
        return await Comment.findOne({ where: { [Op.and]: target } });
    };
    createComment = async (data) => {
        return await Comment.create(data);
    };
    updateComment = async (data, target) => {
        return await Comment.update(data, { where: { [Op.and]: target } });
    };
    deleteComment = async (target) => {
        return await Comment.destroy({ where: { [Op.and]: target } });
    };
}

module.exports = CommentRepository;
