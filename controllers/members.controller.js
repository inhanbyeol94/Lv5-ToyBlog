const MemberService = require('../services/members.service');

class MembersController {
  memberService = new MemberService();

  signUp = async (req, res, next) => {
    const { code, result } = await this.memberService.createMember(req);
    return res.status(code).json({ message: result });
  };

  login = async (req, res, next) => {
    const { code, result } = await this.memberService.login(req, res);
    return res.status(code).json({ message: result });
  };
}

module.exports = MembersController;
