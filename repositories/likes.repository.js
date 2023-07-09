const { Like, Post, Member, Sequelize } = require('../models');

class LikeRepository {
  switch = async (postId, id) => {
    const switchLike = await Like.findOne({ where: { post_id: postId, user_id: id } });

    if (!switchLike) {
      await Like.create({ post_id: postId, user_id: id });
      return '좋아요가 등록되었습니다.';
    } else {
      await Like.destroy({ where: { post_id: postId, user_id: id } });
      return '좋아요가 취소되었습니다.';
    }
  };
  findAllLikePosts = async (id) => {
    return await Post.findAll({
      attributes: ['post_id', 'title', 'content', 'created_at', [Sequelize.literal(`(SELECT COUNT(*) FROM Likes WHERE Likes.post_id = Post.post_id)`), 'like']],
      include: [
        { model: Like, where: { user_id: id }, attributes: [] },
        { model: Member, attributes: ['nickname'] },
      ],
      order: [['like', 'DESC']],
      raw: true,
      nest: true,
    });
  };
}

module.exports = LikeRepository;
