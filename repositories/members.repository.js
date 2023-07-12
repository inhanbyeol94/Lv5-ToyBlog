const { Member } = require('../models');

class MemberRepository {
  createMember = async (data) => {
    return await Member.create(data);
  };

  findUser = async (data) => {
    return await Member.findOne({ where: data });
  };
}

module.exports = MemberRepository;
