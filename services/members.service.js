require('dotenv').config;
const { SECRET_KEY, SESSION_SECRET_KEY } = process.env;
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const MemberRepository = require('../repositories/members.repository');

class MemberService {
  memberRepository = new MemberRepository();

  createMember = async (req) => {
    try {
      const { id, password, nickname } = req.body;
      const passwordToCrypto = crypto.pbkdf2Sync(password, SECRET_KEY.toString('hex'), 11524, 64, 'sha512').toString('hex');

      const overlapId = await this.memberRepository.findUser({ user_id: id });
      if (overlapId) return { code: 405, result: '이미 사용중인 아이디입니다.' };

      const overlapNickname = await this.memberRepository.findUser({ nickname: nickname });
      if (overlapNickname) return { code: 405, result: '이미 사용중인 닉네임입니다.' };

      await this.memberRepository.createMember(id, passwordToCrypto, nickname);

      return { code: 200, result: '회원가입이 완료되었습니다.' };
    } catch (err) {
      console.error(err);
      return { code: 500, result: '오류가 발생하였습니다.' };
    }
  };

  login = async (req, res) => {
    try {
      const { id, password } = req.body;
      const passwordToCrypto = crypto.pbkdf2Sync(password, SECRET_KEY.toString('hex'), 11524, 64, 'sha512').toString('hex');
      const findUser = await this.memberRepository.findUser({ user_id: id, password: passwordToCrypto });

      if (!findUser) return { code: 401, result: '아이디와 패스워드가 일치하지 않습니다.' };
      const token = await jwt.sign({ id: findUser.id, user_id: findUser.user_id, nickname: findUser.nickname }, SESSION_SECRET_KEY);
      res.cookie('auth', `Bearer ${token}`);
      return { code: 200, result: '로그인 성공' };
    } catch (err) {
      console.error(err);
      return { code: 500, result: '오류가 발생하였습니다.' };
    }
  };
}

module.exports = MemberService;
