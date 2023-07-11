const PostRepository = require('../repositories/posts.repository');

class PostService {
  postRepository = new PostRepository();

  findAllPost = async () => {
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
  };

  findOnePost = async ({ postId }) => {
    const result = await this.postRepository.findOnePost({ post_id: postId });
    if (!result) throw { code: 404, result: '존재하지 않는 게시물입니다.' };
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
  };

  createPost = async ({ id, title, content }) => {
    const result = await this.postRepository.createPost({ user_id: id, title: title, content: content });
    return { code: 201, result: '정상 등록되었습니다.', resultPostId: result.post_id };
  };

  updatePost = async ({ postId, title, content, id }) => {
    const findPost = await this.postRepository.findOnePost({ post_id: postId });
    if (!findPost) throw { code: 404, result: '존재하지 않는 게시물입니다.' };

    const postAuthorValid = await this.postRepository.findOnePost({ post_id: postId, user_id: id });
    if (!postAuthorValid) throw { code: 401, result: '본인이 작성한 게시물만 수정이 가능합니다.' };

    await this.postRepository.updatePost({ title: title, content: content }, [{ post_id: postId }, { user_id: id }]);
    return { code: 200, result: '게시물이 정상 수정되었습니다.' };
  };

  deletePost = async ({ postId, id }) => {
    const findPost = await this.postRepository.findOnePost({ post_id: postId });
    if (!findPost) throw { code: 404, result: '존재하지 않는 게시물입니다.' };

    const postAuthorValid = await this.postRepository.findOnePost({ post_id: postId, user_id: id });
    if (!postAuthorValid) throw { code: 401, result: '본인이 작성한 게시물만 삭제가 가능합니다.' };

    await this.postRepository.deletePost([{ post_id: postId }, { user_id: id }]);

    return { code: 200, result: '게시물이 정상 삭제되었습니다.' };
  };
}

module.exports = PostService;
