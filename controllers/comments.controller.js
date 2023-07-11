const CommentService = require('../services/comments.service');

class CommentsController {
  commentService = new CommentService();

  getComments = async (req, res, next) => {
    const { code, result } = await this.commentService.findAllComment(req);
    return res.status(code).json({ comments: result });
  };

  createComment = async (req, res, next) => {
    const { postId } = req.params;
    const { content } = req.body;
    const { id } = res.locals.user;

    await this.commentService.createComment(postId, id, content);
    return res.status(200).json({ message: '댓글이 정상 등록되었습니다.' });
  };

  updateComment = async (req, res, next) => {
    const { postId, commentId } = req.params;
    const { content } = req.body;
    const { id } = res.locals.user;

    await this.commentService.updateComment(postId, commentId, id, content);
    return res.status(200).json({ message: '댓글이 정상 수정되었습니다.' });
  };

  deleteComment = async (req, res, next) => {
    const { postId, commentId } = req.params;
    const { id } = res.locals.user;

    await this.commentService.deleteComment(postId, commentId, id);
    return res.status(200).json({ message: '댓글이 정상 삭제되었습니다.' });
  };
}

module.exports = CommentsController;
