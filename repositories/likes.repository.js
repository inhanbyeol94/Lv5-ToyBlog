const { Like, Post, Member, sequelize } = require('../models');

class LikeRepository {
  switch = async (postId, id) => {
    const switchLike = await Like.findOne({ where: { post_id: postId, user_id: id } });

    if (!switchLike) {
      await Like.create({ post_id: postId, user_id: id });
      await Post.update({ like: (await Post.findOne({ where: { post_id: postId }, attributes: ['like'] })).like + 1 }, { where: { post_id: postId } });
    } else {
      await Like.destroy({ where: { post_id: postId, user_id: id } });
      await Post.update({ like: (await Post.findOne({ where: { post_id: postId }, attributes: ['like'] })).like - 1 }, { where: { post_id: postId } });
    }
  };
  findAllLikePosts = async (id) => {
    return await Like.findAll({
      attributes: [],
      where: { user_id: id },
      include: [{ model: Post, attributes: { exclude: ['user_id'] }, include: [{ model: Member, attributes: { exclude: ['password', 'created_at', 'updated_at', 'user_id'] } }] }],
      raw: true,
    });
  };
}

module.exports = LikeRepository;
