const PostService = require('../services/posts.service');

class PostsController {
  postService = new PostService();

  getPosts = async (req, res, next) => {
    try {
      const { code, result } = await this.postService.findAllPost();
      return res.status(code).json({ posts: result });
    } catch (err) {
      if (err.code) return res.status(err.code).json({ message: err.result });
      console.error(err);
      return res.status(500).json({ message: '오류가 발생하였습니다.' });
    }
  };

  getPost = async (req, res, next) => {
    try {
      const { postId } = req.params;
      const { code, result } = await this.postService.findOnePost({ postId });
      return res.status(code).json({ post: result });
    } catch (err) {
      if (err.code) return res.status(err.code).json({ message: err.result });
      console.error(err);
      return res.status(500).json({ message: '오류가 발생하였습니다.' });
    }
  };

  createPost = async (req, res, next) => {
    try {
      const { title, content } = req.body;
      const { id } = res.locals.user;
      const { code, result, resultPostId } = await this.postService.createPost({ id, title, content });
      return res.status(code).json({ message: result, postId: resultPostId });
    } catch (err) {
      if (err.code) return res.status(err.code).json({ message: err.result });
      console.error(err);
      return res.status(500).json({ message: '오류가 발생하였습니다.' });
    }
  };

  updatePost = async (req, res, next) => {
    try {
      const { postId } = req.params;
      const { title, content } = req.body;
      const { id } = res.locals.user;
      const { code, result } = await this.postService.updatePost({ postId, title, content, id });
      return res.status(code).json({ message: result });
    } catch (err) {
      if (err.code) return res.status(err.code).json({ message: err.result });
      console.error(err);
      return res.status(500).json({ message: '오류가 발생하였습니다.' });
    }
  };

  deletePost = async (req, res, next) => {
    try {
      const { postId } = req.params;
      const { id } = res.locals.user;
      const { code, result } = await this.postService.deletePost({ postId, id });
      return res.status(code).json({ message: result });
    } catch (err) {
      if (err.code) return res.status(err.code).json({ message: err.result });
      console.error(err);
      return res.status(500).json({ message: '오류가 발생하였습니다.' });
    }
  };
}

module.exports = PostsController;
