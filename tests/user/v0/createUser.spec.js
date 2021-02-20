/* eslint-disable mocha/no-hooks-for-single-case */
/* eslint-disable func-names */

require('moment');
const httpMocks = require('node-mocks-http');
const should = require('should');

const { truncateTables } = require('../../common');
const userRouter = require('../../../routes/user');

const method = 'POST';
const url = '/user/v0';

describe(`user.v0.createUser ${method} ${url}`, function () {
  beforeEach(async function () {
    await truncateTables();
  });

  it('[guest] 정상적인 회원가입을 요청한 경우 201', async function () {
    const request = httpMocks.createRequest({
      method,
      url,
      body: {
        age: 20,
        birthDate: '1997-12-31',
        email: 'adaf@email.com',
        password: 'p@ssw@ord',
        nickname: 'adaf',
        gender: 'm',
      },
    });
    const response = httpMocks.createResponse({});

    let error;
    try {
      await userRouter.v0.createUser(request, response);
    } catch (e) {
      error = e;
    }

    should.equal(error, undefined);

    response.statusCode.should.equal(201);

    // eslint-disable-next-line no-underscore-dangle
    const userData = response._getJSONData();

    userData.should.have.properties(
      'id',
      'nickname',
      'birthDate',
      'email',
      'gender',
      'profileImage',
      'createdAt',
      'updatedAt',
      'isConsultant',
      'consultantAt',
    );

    userData.id.should.be.a.Number();
    userData.nickname.should.be.a.String();
    userData.birthDate.should.be.a.String();
    userData.email.should.be.a.String();
    userData.gender.should.be.a.String();
    should.equal(userData.profileImage, null);
  });
});
