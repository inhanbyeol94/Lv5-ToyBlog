const PostService = require('../services/posts.service');

class PostsController {
  postService = new PostService();

  getPosts = async (req, res, next) => {
    const { code, result } = await this.postService.findAllPost();
    return res.status(code).json({ posts: result });
  };

  getPost = async (req, res, next) => {
    const { code, result } = await this.postService.findOnePost(req);
    return res.status(code).json({ post: result });
  };

  createPost = async (req, res, next) => {
    const { code, result, resultPostId } = await this.postService.createPost(req, res);
    return res.status(code).json({ message: result, postId: resultPostId });
  };

  updatePost = async (req, res, next) => {
    const { code, result } = await this.postService.updatePost(req, res);
    return res.status(code).json({ message: result });
  };

  deletePost = async (req, res, next) => {
    const { code, result } = await this.postService.deletePost(req, res);
    return res.status(code).json({ message: result });
  };
}

module.exports = PostsController;
