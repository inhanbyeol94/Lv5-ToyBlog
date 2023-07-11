const MemberService = require('../services/members.service');

class MembersController {
  memberService = new MemberService();

  signUp = async (req, res, next) => {
    try {
      const { id, nickname, password } = req.body;
      const { code, result } = await this.memberService.createMember({ id, nickname, password });
      return res.status(code).json({ message: result });
    } catch (err) {
      if (err.code) return res.status(err.code).json({ message: err.result });
      console.error(err);
      return res.status(500).json({ message: '오류가 발생하였습니다.' });
    }
  };

  login = async (req, res, next) => {
    try {
      const { id, password } = req.body;
      const { code, result, token } = await this.memberService.login({ id, password });
      res.cookie('auth', `Bearer ${token}`);
      return res.status(code).json({ message: result });
    } catch (err) {
      if (err.code) return res.status(err.code).json({ message: err.result });
      console.error(err);
      return res.status(500).json({ message: '오류가 발생하였습니다.' });
    }
  };
}

module.exports = MembersController;
