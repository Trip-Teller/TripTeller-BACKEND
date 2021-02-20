/* eslint-disable func-names */

require('moment');
const httpMocks = require('node-mocks-http');
const should = require('should');

const {
  createEmailUser,
  createConsultant,
  createFilterTag,
  truncateTables,
} = require('../../common');
const consultantRouter = require('../../../routes/consultatnt');

const method = 'GET';
const url = '/consultant/v0';

describe(`consultant.v0.listConsultants ${method} ${url}`, function () {
  let user;

  before(async function () {
    await truncateTables();

    user = await createEmailUser();
    const user2 = await createEmailUser();

    const consultant1 = await createConsultant(user, '부산');
    await createFilterTag(consultant1, '액티비티');
    await createFilterTag(consultant1, '유흥');
    await createFilterTag(consultant1, '커플여행');

    const consultant2 = await createConsultant(user2, '서울');
    await createFilterTag(consultant2, '액티비티');
    await createFilterTag(consultant2, '유흥');
    await createFilterTag(consultant2, '커플여행');
  });

  it('[guest] 컨설턴트 목록을 요청한 경우 200', async function () {
    const request = httpMocks.createRequest({
      method,
      url,
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
      await consultantRouter.v0.listConsultants(request, response);
    } catch (e) {
      error = e;
    }

    should.equal(error, undefined);

    response.statusCode.should.equal(200);

    // eslint-disable-next-line no-underscore-dangle
    const consultantData = response._getJSONData();

    consultantData.should.be.Array();
    consultantData.should.be.length(2);
  });

  it('[guest] 지역별 필터링을 한 경우 200', async function () {
    const request = httpMocks.createRequest({
      method,
      url,
      query: {
        region: '서울',
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
      await consultantRouter.v0.listConsultants(request, response);
    } catch (e) {
      error = e;
    }

    should.equal(error, undefined);

    response.statusCode.should.equal(200);

    // eslint-disable-next-line no-underscore-dangle
    const consultantData = response._getJSONData();

    consultantData.should.be.Array();
    consultantData.should.be.length(1);
  });
});
