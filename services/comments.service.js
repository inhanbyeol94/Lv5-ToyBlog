const CommentRepository = require('../repositories/comments.repository');

class CommentService {
  commentRepository = new CommentRepository();

  findAllComment = async (postId) => {
    const result = await this.commentRepository.findAllComment(postId);
    return result.map((x) => {
      return {
        commentId: x.comment_id,
        nickname: x.Member.nickname,
        content: x.content,
        createdAt: new Date(x.created_at).toLocaleString(),
        updatedAt: new Date(x.updated_at).toLocaleString(),
      };
    });
  };
  createComment = async (postId, id, content) => {
    return await this.commentRepository.createComment(postId, id, content);
  };
  updateComment = async (postId, commentId, id, content) => {
    return await this.commentRepository.updateComment(postId, commentId, id, content);
  };
  deleteComment = async (postId, commentId, id) => {
    return await this.commentRepository.deleteComment(postId, commentId, id);
  };
}

module.exports = CommentService;
