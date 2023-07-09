const LikeService = require('../services/likes.service');

class LikesController {
  likeService = new LikeService();

  switch = async (req, res, next) => {
    const { postId } = req.params;
    const { id } = res.locals.user;
    const resultMessage = await this.likeService.switch(postId, id);

    return res.status(200).json({ message: resultMessage });
  };
  getLikes = async (req, res, next) => {
    const { id } = res.locals.user;
    const findAllLikePosts = await this.likeService.findAllLikePosts(id);

    return res.status(200).json(findAllLikePosts);
  };
}

module.exports = LikesController;
