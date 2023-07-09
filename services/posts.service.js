const PostRepository = require('../repositories/posts.repository');

class PostService {
  postRepository = new PostRepository();

  findAllPost = async () => {
    const result = await this.postRepository.findAllPost();
    return result.map((x) => {
      return {
        postId: x.post_id,
        title: x.title,
        nickname: x.Member.nickname,
        content: x.content,
        createdAt: new Date(x.created_at).toLocaleString(),
        like: x.Likes.like,
      };
    });
  };

  findOnePost = async (postId) => {
    const result = await this.postRepository.findOnePost(postId);
    return {
      postId: result.post_id,
      title: result.title,
      content: result.content,
      nickname: result.Member.nickname,
      like: result.like,
      createdAt: new Date(result.created_at).toLocaleString(),
    };
  };

  createPost = async (id, title, content) => {
    const result = await this.postRepository.createPost(id, title, content);
    return result.post_id;
  };

  updatePost = async (postId, id, title, content) => {
    return await this.postRepository.updatePost(postId, id, title, content);
  };

  deletePost = async (postId, id) => {
    return await this.postRepository.deletePost(postId, id);
  };
}

module.exports = PostService;
