const { Member } = require('../models');

class MemberRepository {
  createMember = async (id, password, nickname) => {
    return await Member.create({ user_id: id, nickname, password: password });
  };

  findUser = async (data) => {
    return await Member.findOne({ where: data });
  };
}

module.exports = MemberRepository;
