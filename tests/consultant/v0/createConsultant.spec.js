/* eslint-disable func-names */

require('moment');
const httpMocks = require('node-mocks-http');
const should = require('should');

const {
  createEmailUser,
  userLogin,
  truncateTables,
} = require('../../common');
const consultantRouter = require('../../../routes/consultatnt');

const method = 'POST';
const url = '/consultant/v0';

describe(`consultant.v0.createConsultant ${method} ${url}`, function () {
  let user;

  before(async function () {
    await truncateTables();

    user = await createEmailUser();

    await userLogin(user);
  });

  it('[guest] 정상적인 컨설턴트 등록을 요청한 경우 201', async function () {
    const request = httpMocks.createRequest({
      method,
      url,
      body: {
        region: '강원도',
        filter: ['힐링', '유흥', '예술'],
        introduce: '안녕하세요,저는 트텔이 입니다.',
        title: '찡찡멘',
        cafe: '추천 카페 카페',
        restaurant: '추천 레스토랑 추천 맛집.',
        place: '추천 명소 추천 명소',
      },
      file: {
        backgroundImage: 'tests/resources/image/1.jpg',
      },
    });
    const response = httpMocks.createResponse({
      locals: {
        auth: {
          user,
        },
      },
    });

    let error;
    try {
      await consultantRouter.v0.createConsultant(request, response);
    } catch (e) {
      error = e;
    }

    should.equal(error, undefined);

    response.statusCode.should.equal(201);

    // eslint-disable-next-line no-underscore-dangle
    const consultantData = response._getJSONData();

    consultantData.should.have.properties('consultant', 'filterList', 'filterLength');
  });
});
