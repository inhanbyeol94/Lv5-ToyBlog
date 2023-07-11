const { Member } = require('../models');

class MemberRepository {
  createMember = async (id, password, nickname) => {
    return await Member.create({ user_id: id, nickname, password: password });
  };

  findUser = async (id, password) => {
    return await Member.findOne({ where: { user_id: id, password: password } });
  };
}

module.exports = MemberRepository;
