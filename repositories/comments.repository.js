const { Op } = require('sequelize');
const { Comment, Member } = require('../models');

class CommentRepository {
    findAll = async (target) => {
        return await Comment.findAll({ where: { [Op.and]: target }, include: [{ model: Member }], order: [['created_at', 'DESC']], raw: true, nest: true });
    };
    findOne = async (target) => {
        return await Comment.findOne({ where: { [Op.and]: target }, raw: true, nest: true });
    };
    createOne = async (data) => {
        return await Comment.create(data);
    };
    updateOne = async (data, target) => {
        return await Comment.update(data, { where: { [Op.and]: target } });
    };
    deleteOne = async (target) => {
        return await Comment.destroy({ where: { [Op.and]: target } });
    };
}

module.exports = CommentRepository;
