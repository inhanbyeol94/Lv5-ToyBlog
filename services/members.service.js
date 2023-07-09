const MemberRepository = require('../repositories/members.repository');

class MemberService {
  memberRepository = new MemberRepository();

  createMember = async (id, password, nickname) => {
    return await this.memberRepository.createMember(id, password, nickname);
  };

  loginMember = async (id, password) => {
    return await this.memberRepository.loginMember(id, password);
  };
}

module.exports = MemberService;
