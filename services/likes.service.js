const LikeRepository = require('../repositories/likes.repository');
const PostRepository = require('../repositories/posts.repository');

class LikeService {
    likeRepository = new LikeRepository();
    postRepository = new PostRepository();

    switch = async (postId, id) => {
        const findPost = await this.postRepository.findOne({ post_id: postId });
        if (!findPost) throw { code: 404, result: '존재하지 않는 게시물입니다.' };

        const postAuthorValid = findPost.user_id;
        if (postAuthorValid == id) throw { code: 401, result: '본인이 작성한 게시물에는 좋아요가 불가합니다.' };

        const findLike = await this.likeRepository.findOne([{ post_id: postId }, { user_id: id }]);

        if (!findLike) {
            await this.likeRepository.createOne({ post_id: postId, user_id: id });
            return { code: 201, result: '좋아요를 등록하였습니다.' };
        } else {
            await this.likeRepository.deleteOne({ post_id: postId, user_id: id });
            return { code: 201, result: '좋아요를 취소하였습니다.' };
        }
    };

    findAllLikePosts = async (id) => {
        const result = await this.likeRepository.findPostByLikes({ user_id: id });
        return {
            code: 200,
            result: result.map((x) => {
                return {
                    postId: x.post_id,
                    title: x.title,
                    content: x.content,
                    nickname: x.Member.nickname,
                    createdAt: new Date(x.created_at).toLocaleString(),
                    like: x.like,
                };
            }),
        };
    };
}

module.exports = LikeService;
