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
    REFRESH_TOKEN_NOT_FOUND: {
      code: 25,
      message: '재발급 토큰을 찾을 수 없습니다.',
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
  CONSULTANT: {
    ALREADY_EXIST: {
      code: 22,
      message: '이미 등록된 컨설턴트 입니다.',
    },
    BACKGROUND_IMAGE_MISSING: {
      code: 26,
      message: '배경사진이 없습니다.',
    },
    REGION_MISSING: {
      code: 15,
      message: '지역이 없습니다.',
    },
    REGION_INCORRECT: {
      code: 23,
      message: '지역이 잘못되었습니다.',
    },
    INTRODUCE_MISSING: {
      code: 16,
      message: '소개가 없습니다.',
    },
    TITLE_MISSING: {
      code: 17,
      message: '제목이 없습니다.',
    },
    CAFE_MISSING: {
      code: 18,
      message: '카페 추천이 없습니다.',
    },
    RESTAURANT_MISSING: {
      code: 19,
      message: '맛집 추천이 없습니다.',
    },
    PLACE_MISSING: {
      code: 20,
      message: '명소 추천이 없습니다.',
    },
    FILTER_MISSING: {
      code: 21,
      message: '필터가 없습니다.',
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
  FILTER_TAG: {
    TYPE_INCORRECT: {
      code: 24,
      message: '필터가 옳지 않습니다.',
    },
  },
};

module.exports = errors;
