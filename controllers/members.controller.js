const MemberService = require('../services/members.service');

class MembersController {
  memberService = new MemberService();

  signUp = async (req, res, next) => {
    const { id, password, nickname } = req.body;
    await this.memberService.createMember(id, password, nickname);

    return res.status(200).json({ message: '회원가입이 완료되었습니다.' });
  };

  login = async (req, res, next) => {
    const { id, password } = req.body;
    const token = await this.memberService.loginMember(id, password);

    res.cookie('auth', `Bearer ${token}`);
    return res.status(200).json({ message: '로그인 성공' });
  };
}

module.exports = MembersController;
