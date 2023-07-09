const { Comment, Member, sequelize } = require('../models');

class CommentRepository {
  findAllComment = async (postId) => {
    return await Comment.findAll({ where: { post_id: postId }, attributes: ['comment_id', 'content', 'created_at', 'updated_at'], include: [{ model: Member, attributes: ['nickname'] }] });
  };
  createComment = async (postId, id, content) => {
    return await Comment.create({ post_id: postId, user_id: id, content });
  };
  updateComment = async (postId, commentId, id, content) => {
    return await Comment.update({ content, updated_at: new Date() }, { where: { post_id: postId, comment_id: commentId, user_id: id } });
  };
  deleteComment = async (postId, commentId, id) => {
    return await Comment.destroy({ where: { post_id: postId, comment_id: commentId, user_id: id } });
  };
}

module.exports = CommentRepository;
