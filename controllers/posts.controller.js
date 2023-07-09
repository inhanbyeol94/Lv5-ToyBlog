const PostService = require('../services/posts.service');

class PostsController {
  postService = new PostService();

  getPosts = async (req, res, next) => {
    const findAllPost = await this.postService.findAllPost();
    return res.status(200).json({ posts: findAllPost });
  };

  getPost = async (req, res, next) => {
    const { postId } = req.params;
    const findOnePost = await this.postService.findOnePost(postId);
    return res.status(200).json({ post: findOnePost });
  };

  createPost = async (req, res, next) => {
    const { title, content } = req.body;
    const { id } = res.locals.user;

    await this.postService.createPost(id, title, content);
    return res.status(200).json({ message: '게시물이 정상적으로 생성되었습니다.' });
  };

  updatePost = async (req, res, next) => {
    const { postId } = req.params;
    const { title, content } = req.body;
    const { id } = res.locals.user;

    await this.postService.updatePost(postId, id, title, content);
    return res.status(200).json({ message: '게시물이 정상적으로 수정되었습니다.' });
  };

  deletePost = async (req, res, next) => {
    const { postId } = req.params;
    const { id } = res.locals.user;

    await this.postService.deletePost(postId, id);
    return res.status(200).json({ message: '게시물이 정상적으로 삭제되었습니다.' });
  };
}

module.exports = PostsController;
