const { Post, Member } = require('../models');
const { Op, Sequelize } = require('sequelize');

class PostRepository {
    findAll = async () => {
        return await Post.findAll({
            include: [{ model: Member }],
            attributes: { include: [[Sequelize.literal(`(SELECT COUNT(*) FROM Likes WHERE post_id = Post.post_id)`), 'like']] },
            raw: true,
            nest: true,
        });
    };

    findOne = async (target) => {
        return await Post.findOne({ where: { [Op.and]: target }, include: [{ model: Member }], attributes: { include: [[Sequelize.literal(`(SELECT COUNT(*) FROM Likes WHERE post_id = Post.post_id)`), 'like']] }, raw: true, nest: true });
    };

    createOne = async (data) => {
        return await Post.create(data);
    };

    updateOne = async (data, target) => {
        return await Post.update(data, { where: { [Op.and]: target } });
    };

    deleteOne = async (target) => {
        return await Post.destroy({ where: { [Op.and]: target } });
    };
}

module.exports = PostRepository;
