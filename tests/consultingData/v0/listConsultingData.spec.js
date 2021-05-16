/* eslint-disable func-names */

require('moment');
const httpMocks = require('node-mocks-http');
const should = require('should');

const {
  truncateTables,
  createEmailUser,
  createConsultant,
  createConsultingData,
} = require('../../common');
const consultingDataRouter = require('../../../routes/consulting');

const method = 'GET';
const url = '/consultingData/v0';

describe(`consultingData.v0.listConsultingData ${method} ${url}`, function () {
  let users;

  before(async function () {
    await truncateTables();

    {
      const promises = [];
      for (let i = 0; i < 7; i += 1) {
        promises.push(createEmailUser());
      }
      users = await Promise.all(promises);
    }

    let consultants;
    {
      const promises = [];
      for (let i = 0; i < 6; i += 1) {
        promises.push(createConsultant(users[i], '서울'));
      }
      consultants = await Promise.all(promises);
    }

    {
      const promises = [];
      for (let i = 0; i < consultants.length; i += 1) {
        promises.push(createConsultingData(users[6], consultants[i]));
      }
      await Promise.all(promises);
    }

    await createConsultingData(users[0], consultants[1]);
  });

  it('[sender, receiver] 요청 및 요청받은 모든 컨설팅 데이터 목록을 요청한 경우 200', async function () {
    const request = httpMocks.createRequest({
      method,
      url,
    });
    const response = httpMocks.createResponse({
      locals: {
        auth: {
          user: users[0],
        },
      },
    });

    let error;
    try {
      await consultingDataRouter.v0.listConsultingData(request, response);
    } catch (err) {
      error = err;
    }

    should.equal(error, undefined);

    response.statusCode.should.equal(200);

    // eslint-disable-next-line no-underscore-dangle
    const consultingDataListResponse = response._getJSONData();

    consultingDataListResponse.should.be.an.Object();
    consultingDataListResponse.should.be.an.Array();
  });

  it('[receiver] 요청 및 요청받은 모든 컨설팅 데이터 목록을 요청한 경우 200', async function () {
    const request = httpMocks.createRequest({
      method,
      url,
      query: {
        receiver: 1,
      },
    });
    const response = httpMocks.createResponse({
      locals: {
        auth: {
          user: users[0],
        },
      },
    });

    let error;
    try {
      await consultingDataRouter.v0.listConsultingData(request, response);
    } catch (err) {
      error = err;
    }

    should.equal(error, undefined);

    response.statusCode.should.equal(200);

    // eslint-disable-next-line no-underscore-dangle
    const consultingDataListResponse = response._getJSONData();

    consultingDataListResponse.should.be.an.Object();
    consultingDataListResponse.should.be.an.Array();
  });
});
