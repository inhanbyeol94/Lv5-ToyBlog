const LikeRepository = require('../repositories/likes.repository');

class LikeService {
  likeRepository = new LikeRepository();

  switch = async (postId, id) => {
    return await this.likeRepository.switch(postId, id);
  };

  findAllLikePosts = async (id) => {
    const result = await this.likeRepository.findAllLikePosts(id);
    return result.map((x) => {
      return {
        postId: x.post_id,
        title: x.title,
        content: x.content,
        nickname: x.Member.nickname,
        createdAt: new Date(x.created_at).toLocaleString(),
        like: x.like,
      };
    });
  };
}

module.exports = LikeService;
