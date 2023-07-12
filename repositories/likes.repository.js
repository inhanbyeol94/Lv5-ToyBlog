const { Op } = require('sequelize');
const { Like, Post, Member, Sequelize } = require('../models');

class LikeRepository {
    findOne = async (target) => {
        return await Like.findOne({ where: { [Op.and]: target } });
    };

    createOne = async (data) => {
        return await Like.create(data);
    };

    deleteOne = async (target) => {
        return await Like.destroy({ where: { [Op.and]: target } });
    };

    /** Special */
    findPostByLikes = async (target) => {
        return await Post.findAll({
            attributes: ['post_id', 'title', 'content', 'created_at', [Sequelize.literal(`(SELECT COUNT(*) FROM Likes WHERE Likes.post_id = Post.post_id)`), 'like']],
            include: [
                { model: Like, where: target, attributes: [] },
                { model: Member, attributes: ['nickname'] },
            ],
            order: [['like', 'DESC']],
            raw: true,
            nest: true,
        });
    };
}

module.exports = LikeRepository;
