/* eslint-disable func-names */

require('moment');
const httpMocks = require('node-mocks-http');
const should = require('should');

const {
  Errors,
  HttpBadRequest,
} = require('../../../middlewares/error');
const {
  createEmailUser,
  truncateTables,
} = require('../../common');
const authRouter = require('../../../routes/auth');

const method = 'POST';
const url = '/auth/v0';

describe(`auth.v0.emailLogin ${method} ${url}`, function () {
  let user;

  before(async function () {
    // Truncate tables.
    await truncateTables();

    // Seed initial data.
    user = await createEmailUser();
  });

  it('[guest] email이 없는 경우 400', async function () {
    const request = httpMocks.createRequest({
      method,
      url,
      body: {
        password: 'p@ssw0rd',
      },
    });

    const response = httpMocks.createResponse({});

    let error;
    try {
      await authRouter.v0.emailLogin(request, response);
    } catch (e) {
      error = e;
    }

    error.should.be.instanceOf(HttpBadRequest);
    error.data.should.deepEqual(Errors.COMMON.EMAIL_MISSING);
  });

  it('[guest] password가 없는 경우 400', async function () {
    const request = httpMocks.createRequest({
      method,
      url,
      body: {
        email: user.email,
      },
    });

    const response = httpMocks.createResponse({});

    let error;
    try {
      await authRouter.v0.emailLogin(request, response);
    } catch (e) {
      error = e;
    }

    error.should.be.instanceOf(HttpBadRequest);
    error.data.should.deepEqual(Errors.COMMON.PASSWORD_MISSING);
  });

  it('[guest] 정상적인 요청이 아닌 경우 400', async function () {
    const request = httpMocks.createRequest({
      method,
      url,
      body: {
        email: user.email,
        password: '1234',
      },
    });

    const response = httpMocks.createResponse({});

    let error;
    try {
      await authRouter.v0.emailLogin(request, response);
    } catch (e) {
      error = e;
    }

    error.should.be.instanceOf(HttpBadRequest);
    error.data.should.deepEqual(Errors.AUTH.LOGIN_INFO_INCORRECT);
  });

  it('[guest] 정상적인 로그인 요청인 경우 201', async function () {
    const request = httpMocks.createRequest({
      method,
      url,
      body: {
        email: user.email,
        password: 'p@ssw0rd',
      },
    });

    const response = httpMocks.createResponse({});

    let error;
    try {
      await authRouter.v0.emailLogin(request, response);
    } catch (e) {
      error = e;
    }

    should.equal(error, undefined);

    response.statusCode.should.equal(201);

    // eslint-disable-next-line no-underscore-dangle
    const loginData = response._getJSONData();

    loginData.accessToken.should.be.a.String();

    loginData.refreshToken.should.be.a.String();
  });
});
