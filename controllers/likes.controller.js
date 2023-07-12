const LikeService = require('../services/likes.service');

class LikesController {
    likeService = new LikeService();

    switch = async (req, res) => {
        try {
            const { postId } = req.params;
            const { id } = res.locals.user;
            const { code, result } = await this.likeService.switch(postId, id);

            return res.status(code).json({ message: result });
        } catch (err) {
            if (err.code) return res.status(err.code).json({ message: err.result });
            console.error(err);
            return res.status(500).json({ message: '오류가 발생하였습니다.' });
        }
    };
    getLikes = async (req, res) => {
        try {
            const { id } = res.locals.user;
            const { code, result } = await this.likeService.findAllLikePosts(id);

            return res.status(code).json(result);
        } catch (err) {
            if (err.code) return res.status(err.code).json({ message: err.result });
            console.error(err);
            return res.status(500).json({ message: '오류가 발생하였습니다.' });
        }
    };
}

module.exports = LikesController;
