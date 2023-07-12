const CommentService = require('../services/comments.service');

class CommentsController {
    commentService = new CommentService();

    getComments = async (req, res) => {
        try {
            const { postId } = req.params;
            const { code, result } = await this.commentService.findAllComment({ postId });
            return res.status(code).json({ comments: result });
        } catch (err) {
            if (err.code) return res.status(err.code).json({ message: err.result });
            console.error(err);
            return res.status(500).json({ message: '오류가 발생하였습니다.' });
        }
    };

    createComment = async (req, res) => {
        try {
            const { postId } = req.params;
            const { content } = req.body;
            const { id } = res.locals.user;

            const { code, result, commentId } = await this.commentService.createComment({ postId, id, content });
            return res.status(code).json({ message: result, commentId });
        } catch (err) {
            if (err.code) return res.status(err.code).json({ message: err.result });
            console.error(err);
            return res.status(500).json({ message: '오류가 발생하였습니다.' });
        }
    };

    updateComment = async (req, res) => {
        try {
            const { postId, commentId } = req.params;
            const { content } = req.body;
            const { id } = res.locals.user;

            const { code, result } = await this.commentService.updateComment({ postId, commentId, id, content });
            return res.status(code).json({ message: result });
        } catch (err) {
            if (err.code) return res.status(err.code).json({ message: err.result });
            console.error(err);
            return res.status(500).json({ message: '오류가 발생하였습니다.' });
        }
    };

    deleteComment = async (req, res) => {
        try {
            const { postId, commentId } = req.params;
            const { id } = res.locals.user;

            const { code, result } = await this.commentService.deleteComment({ postId, commentId, id });
            return res.status(code).json({ message: result });
        } catch (err) {
            if (err.code) return res.status(err.code).json({ message: err.result });
            console.error(err);
            return res.status(500).json({ message: '오류가 발생하였습니다.' });
        }
    };
}

module.exports = CommentsController;
