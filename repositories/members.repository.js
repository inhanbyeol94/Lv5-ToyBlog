const { Op } = require('sequelize');
const { Member } = require('../models');

class MemberRepository {
    createOne = async (data) => {
        return await Member.create(data);
    };

    findOne = async (target) => {
        return await Member.findOne({ where: { [Op.and]: target }, raw: true, nest: true });
    };
}

module.exports = MemberRepository;
