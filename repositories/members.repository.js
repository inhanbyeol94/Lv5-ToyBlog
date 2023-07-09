require('dotenv').config;
const { SECRET_KEY, SESSION_SECRET_KEY } = process.env;
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const { Member } = require('../models');

class MemberRepository {
  createMember = async (id, password, nickname) => {
    const passwordToCrypto = crypto.pbkdf2Sync(password, SECRET_KEY.toString('hex'), 11524, 64, 'sha512').toString('hex');
    return await Member.create({ user_id: id, nickname, password: passwordToCrypto });
  };

  loginMember = async (id, password) => {
    const passwordToCrypto = crypto.pbkdf2Sync(password, SECRET_KEY.toString('hex'), 11524, 64, 'sha512').toString('hex');
    const payloadData = await Member.findOne({ where: { user_id: id, password: passwordToCrypto } });

    const token = await jwt.sign({ id: payloadData.id, user_id: payloadData.user_id, nickname: payloadData.nickname }, SESSION_SECRET_KEY);

    return token;
  };
}

module.exports = MemberRepository;
