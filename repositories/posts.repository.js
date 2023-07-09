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

  findOnePost = async (postId) => {
    return await Post.findOne({ where: { post_id: postId }, include: [{ model: Member }], attributes: { include: [[Sequelize.literal(`(SELECT COUNT(*) FROM Likes WHERE post_id = Post.post_id)`), 'like']] }, raw: true, nest: true });
  };

  createPost = async (id, title, content) => {
    return await Post.create({ user_id: id, title, content });
  };

  updatePost = async (postId, id, title, content) => {
    const authority = await Post.findOne({ where: { post_id: postId, user_id: id } });
    if (!authority) return { message: '게시물이 존재하지 않거나, 게시글 수정은 본인이 작성한 게시글만 가능합니다.' };

    return await Post.update({ title, content }, { where: { [Op.and]: [{ post_id: postId }, { user_id: id }] } });
  };

  deletePost = async (postId, id) => {
    const authority = await Post.findOne({ where: { post_id: postId, user_id: id } });
    if (!authority) return { message: '게시물이 존재하지 않거나, 게시글 삭제는 본인이 작성한 게시글만 가능합니다.' };
    return await Post.destroy({ where: { [Op.and]: [{ post_id: postId }, { user_id: id }] } });
  };
}

module.exports = PostRepository;
