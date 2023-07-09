const LikeRepository = require('../repositories/likes.repository');

class LikeService {
  likeRepository = new LikeRepository();

  swtich = async (postId, id) => {
    return await this.likeRepository.swtich(postId, id);
  };

  findAllLikePosts = async (id) => {
    return await this.likeRepository.findAllLikePosts(id);
  };
}

module.exports = LikeService;
