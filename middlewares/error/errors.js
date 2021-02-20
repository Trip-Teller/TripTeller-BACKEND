const errors = {
  AUTH: {
    NOT_LOGGED_IN: {
      code: 1,
      message: '로그인하지 않았습니다.',
    },
    LOGIN_INFO_INCORRECT: {
      code: 11,
      message: '로그인 정보가 올바르지 않습니다.',
    },
  },
  COMMON: {
    EMAIL_MISSING: {
      code: 12,
      message: '이메일이 없습니다.',
    },
    PASSWORD_MISSING: {
      code: 13,
      message: '비밀번호가 없습니다.',
    },
    FILE_TOO_LARGE: {
      code: 14,
      message: '파일 크기가 너무 큽니다.',
    },
  },
  USER: {
    AGE_MISSING: {
      code: 2,
      message: '나이가 없습니다.',
    },
    BIRTH_DATE_MISSING: {
      code: 3,
      message: '생년월일이 없습니다.',
    },
    EMAIL_MISSING: {
      code: 4,
      message: '이메일이 없습니다.',
    },
    NICKNAME_MISSING: {
      code: 5,
      message: '닉네임이 없습니다.',
    },
    PASSWORD_MISSING: {
      code: 6,
      message: '패스워드가 없습니다.',
    },
    GENDER_MISSING: {
      code: 7,
      message: '성별이 없습니다.',
    },
    EMAIL_ALREADY_EXIST: {
      code: 9,
      message: '이메일이 이미 존재합니다.',
    },
    GENDER_INCORRECT: {
      code: 10,
      message: '성별이 옳지 않습니다.',
    },
  },
  SERVER: {
    UNEXPECTED_ERROR: {
      code: 8,
      message: '예기치 못한 서버 오류가 발생했습니다.',
    },
  },
};

module.exports = errors;
