const { Member } = require('../models');

class MemberRepository {
  createMember = async ({ id, nickname, passwordToCrypto }) => {
    return await Member.create({ user_id: id, nickname, password: passwordToCrypto });
  };

  findUser = async (data) => {
    return await Member.findOne({ where: data });
  };
}

module.exports = MemberRepository;
