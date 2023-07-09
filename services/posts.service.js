const PostRepository = require('../repositories/posts.repository');

class PostService {
  postRepository = new PostRepository();

  findAllPost = async () => {
    return await this.postRepository.findAllPost();
  };

  findOnePost = async (postId) => {
    return await this.postRepository.findOnePost(postId);
  };

  createPost = async (id, title, content) => {
    return await this.postRepository.createPost(id, title, content);
  };

  updatePost = async (postId, id, title, content) => {
    return await this.postRepository.updatePost(postId, id, title, content);
  };

  deletePost = async (postId, id) => {
    return await this.postRepository.deletePost(postId, id);
  };
}

module.exports = PostService;
