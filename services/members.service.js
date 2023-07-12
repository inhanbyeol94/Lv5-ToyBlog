require('dotenv').config;
const { SECRET_KEY, SESSION_SECRET_KEY } = process.env;
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const MemberRepository = require('../repositories/members.repository');

class MemberService {
    memberRepository = new MemberRepository();

    createMember = async ({ id, nickname, password }) => {
        const overlapId = await this.memberRepository.findOne({ user_id: id });
        if (overlapId) throw { code: 405, result: '이미 사용중인 아이디입니다.' };

        const overlapNickname = await this.memberRepository.findOne({ nickname: nickname });
        if (overlapNickname) throw { code: 405, result: '이미 사용중인 닉네임입니다.' };

        const passwordToCrypto = crypto.pbkdf2Sync(password, SECRET_KEY.toString('hex'), 11524, 64, 'sha512').toString('hex');
        await this.memberRepository.createOne({ user_id: id, nickname, password: passwordToCrypto });

        return { code: 200, result: '회원가입이 완료되었습니다.' };
    };

    login = async ({ id, password }) => {
        const passwordToCrypto = crypto.pbkdf2Sync(password, SECRET_KEY.toString('hex'), 11524, 64, 'sha512').toString('hex');
        const findUser = await this.memberRepository.findOne({ user_id: id, password: passwordToCrypto });

        if (!findUser) throw { code: 401, result: '아이디와 패스워드가 일치하지 않습니다.' };
        const token = await jwt.sign({ id: findUser.id, user_id: findUser.user_id, nickname: findUser.nickname }, SESSION_SECRET_KEY);
        return { code: 200, result: '로그인 성공', token };
    };
}

module.exports = MemberService;
