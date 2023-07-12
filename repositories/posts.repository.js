const { Post, Member, Like } = require('../models');
const { Op, Sequelize } = require('sequelize');

class PostRepository {
  findAllPost = async () => {
    return await Post.findAll({
      include: [
        { model: Member, attributes: ['nickname'] },
        { model: Like, attributes: [[Sequelize.literal(`(SELECT COUNT(*) FROM Likes WHERE post_id = Post.post_id)`), 'like']] },
      ],
      raw: true,
      nest: true,
    });
  };

  findOnePost = async (target) => {
    return await Post.findOne({ where: target, include: [{ model: Member }], attributes: { include: [[Sequelize.literal(`(SELECT COUNT(*) FROM Likes WHERE post_id = Post.post_id)`), 'like']] }, raw: true, nest: true });
  };

  createPost = async (data) => {
    return await Post.create(data);
  };

  updatePost = async (data, target) => {
    return await Post.update(data, { where: { [Op.and]: target } });
  };

  deletePost = async (target) => {
    return await Post.destroy({ where: { [Op.and]: target } });
  };
}

module.exports = PostRepository;
