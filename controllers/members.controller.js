const MemberService = require('../services/members.service');

class MembersController {
  memberService = new MemberService();

  signUp = async (req, res, next) => {
    const { code, message } = await this.memberService.createMember(req);
    return res.status(code).json(message);
  };

  login = async (req, res, next) => {
    const { code, message } = await this.memberService.login(req, res);
    return res.status(code).json(message);
  };
}

module.exports = MembersController;
