const PostRepository = require('../repositories/posts.repository');

class PostService {
  postRepository = new PostRepository();

  findAllPost = async () => {
    try {
      const result = await this.postRepository.findAllPost();
      return {
        code: 201,
        result: result.map((x) => {
          return {
            postId: x.post_id,
            title: x.title,
            nickname: x.Member.nickname,
            content: x.content,
            createdAt: new Date(x.created_at).toLocaleString(),
            like: x.Likes.like,
          };
        }),
      };
    } catch (err) {
      console.error(err);
      return { code: 500, result: '오류가 발생하였습니다.' };
    }
  };

  findOnePost = async (req) => {
    try {
      const { postId } = req.params;
      const result = await this.postRepository.findOnePost({ post_id: postId });
      if (!result) return { code: 404, result: '존재하지 않는 게시물입니다.' };
      return {
        code: 200,
        result: {
          postId: result.post_id,
          title: result.title,
          content: result.content,
          nickname: result.Member.nickname,
          like: result.like,
          createdAt: new Date(result.created_at).toLocaleString(),
        },
      };
    } catch (err) {
      console.error(err);
      return { code: 500, result: '오류가 발생하였습니다.' };
    }
  };

  createPost = async (req, res) => {
    try {
      const { title, content } = req.body;
      const { id } = res.locals.user;
      const result = await this.postRepository.createPost({ user_id: id, title: title, content: content });
      return { code: 201, result: '정상 등록되었습니다.', resultPostId: result.post_id };
    } catch (err) {
      console.error(err);
      return { code: 500, result: '오류가 발생하였습니다.', resultPostId: null };
    }
  };

  updatePost = async (req, res) => {
    try {
      const { postId } = req.params;
      const { title, content } = req.body;
      const { id } = res.locals.user;

      const findPost = await this.postRepository.findOnePost({ post_id: postId });
      if (!findPost) return { code: 404, result: '존재하지 않는 게시물입니다.' };

      const postAuthorValid = await this.postRepository.findOnePost({ post_id: postId, user_id: id });
      if (!postAuthorValid) return { code: 401, result: '본인이 작성한 게시물만 수정이 가능합니다.' };

      await this.postRepository.updatePost({ title: title, content: content }, [{ post_id: postId }, { user_id: id }]);

      return { code: 200, result: '게시물이 정상 수정되었습니다.' };
    } catch (err) {
      console.error(err);
      return { code: 500, result: '오류가 발생하였습니다.' };
    }
  };

  deletePost = async (req, res) => {
    try {
      const { postId } = req.params;
      const { id } = res.locals.user;

      const findPost = await this.postRepository.findOnePost({ post_id: postId });
      if (!findPost) return { code: 404, result: '존재하지 않는 게시물입니다.' };

      const postAuthorValid = await this.postRepository.findOnePost({ post_id: postId, user_id: id });
      if (!postAuthorValid) return { code: 401, result: '본인이 작성한 게시물만 삭제가 가능합니다.' };

      await this.postRepository.deletePost([{ post_id: postId }, { user_id: id }]);

      return { code: 200, result: '게시물이 정상 삭제되었습니다.' };
    } catch (err) {
      console.error(err);
      return { code: 500, result: '오류가 발생하였습니다.' };
    }
  };
}

module.exports = PostService;
