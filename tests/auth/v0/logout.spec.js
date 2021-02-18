/* eslint-disable func-names */
const env = process.env.NODE_ENV || 'local';

require('moment');
const httpMocks = require('node-mocks-http');
const should = require('should');
const jwt = require('jsonwebtoken');
const db = require('../../../models');

const {
  createEmailUser,
  truncateTables,
  userLogin,
} = require('../../common');
const AuthConfig = require('../../../config/auth')[env];
const authRouter = require('../../../routes/auth');

const { RefreshToken } = db;

const method = 'DELETE';
const url = '/auth/v0';

describe(`auth.v0.logout ${method} ${url}`, function () {
  let user;

  let accessToken;
  let refreshToken;
  before(async function () {
    await truncateTables();

    user = await createEmailUser();

    const login = await userLogin(user);
    accessToken = login.accessToken;
    refreshToken = login.refreshToken;
  });

  it('로그아웃하기 전에는 재발급 토큰이 데이터베이스에 있어야 함', async function () {
    const token = await RefreshToken.findAll({
      where: {
        refreshToken,
      },
    });

    token.should.be.Array();
    token.should.be.length(1);
  });

  it('올바른 로그아웃 요청 204', async function () {
    const tokenData = jwt.verify(accessToken, AuthConfig.accessTokenSecret);

    const request = httpMocks.createRequest({
      method,
      url,
    });

    const response = httpMocks.createResponse({
      locals: {
        auth: {
          tokenData,
          user,
        },
      },
    });

    let error;
    try {
      await authRouter.v0.logout(request, response);
    } catch (e) {
      error = e;
    }

    should.equal(error, undefined);
    response.statusCode.should.equal(204);
  });

  it('로그아웃한 경우 해당 재발급 토큰은 데이터베이스에 남아있지 않아야 함', async function () {
    const token = await RefreshToken.findAll({
      where: {
        refreshToken,
      },
    });

    token.should.be.Array();
    token.should.be.length(0);
  });
});
