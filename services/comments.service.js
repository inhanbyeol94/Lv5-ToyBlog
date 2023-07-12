const CommentRepository = require('../repositories/comments.repository');
const PostRepository = require('../repositories/posts.repository');

class CommentService {
    commentRepository = new CommentRepository();
    postRepository = new PostRepository();

    findAllComment = async ({ postId }) => {
        const findPost = await this.postRepository.findOne({ post_id: postId });
        if (!findPost) throw { code: 404, result: '존재하지 않는 게시물입니다.' };

        const result = await this.commentRepository.findAll({ post_id: postId });

        return {
            code: 200,
            result: result.map((x) => {
                return {
                    commentId: x.comment_id,
                    nickname: x.Member.nickname,
                    content: x.content,
                    createdAt: new Date(x.created_at).toLocaleString(),
                    updatedAt: new Date(x.updated_at).toLocaleString(),
                };
            }),
        };
    };

    createComment = async ({ postId, id, content }) => {
        const findPost = await this.postRepository.findOne({ post_id: postId });
        if (!findPost) throw { code: 404, result: '존재하지 않는 게시물입니다.' };

        const { comment_id } = await this.commentRepository.createOne({ post_id: postId, user_id: id, content: content });
        return { code: 201, result: '댓글이 정상적으로 생성되었습니다.', commentId: comment_id };
    };

    updateComment = async ({ postId, commentId, id, content }) => {
        const findPost = await this.postRepository.findOne({ post_id: postId });
        if (!findPost) throw { code: 404, result: '존재하지 않는 게시물입니다.' };

        const findComment = await this.commentRepository.findOne([{ post_id: postId }, { comment_id: commentId }]);
        if (!findComment) throw { code: 404, result: '존재하지 않는 댓글입니다.' };

        const commentAuthorValid = findComment.user_id;
        if (commentAuthorValid !== id) throw { code: 401, result: '본인이 작성한 댓글만 수정이 가능합니다.' };

        await this.commentRepository.updateOne({ content: content, updated_at: new Date() }, [{ post_id: postId }, { comment_id: commentId }, { user_id: id }]);

        return { code: 200, result: '댓글이 정상적으로 수정되었습니다.' };
    };

    deleteComment = async ({ postId, commentId, id }) => {
        const findPost = await this.postRepository.findOne({ post_id: postId });
        if (!findPost) throw { code: 404, result: '존재하지 않는 게시물입니다.' };

        const findComment = await this.commentRepository.findOne([{ post_id: postId }, { comment_id: commentId }]);
        if (!findComment) throw { code: 404, result: '존재하지 않는 댓글입니다.' };

        const commentAuthorValid = findComment.user_id;
        if (commentAuthorValid !== id) throw { code: 401, result: '본인이 작성한 댓글만 수정이 가능합니다.' };

        await this.commentRepository.deleteOne([{ post_id: postId }, { comment_id: commentId }, { user_id: id }]);

        return { code: 200, result: '댓글이 정상적으로 삭제되었습니다.' };
    };
}

module.exports = CommentService;
