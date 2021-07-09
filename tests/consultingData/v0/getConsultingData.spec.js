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
const url = '/consultingData/v0/:consultantDataId';

describe(`consultantingData.v0.getConsultingData ${method} ${url}`, function () {
  let consultant;
  let consultingData;
  let user;
  let user2;

  before(async function () {
    await truncateTables();

    user = await createEmailUser();
    user2 = await createEmailUser();

    consultant = await createConsultant(user, '서울');

    consultingData = await createConsultingData(user2, consultant);
  });

  it('[user] 요청한 컨설팅의 정보를 요청한 경우 200', async function () {
    const request = httpMocks.createRequest({
      method,
      url,
      params: {
        consultingDataId: consultingData.id,
      },
    });
    const response = httpMocks.createResponse({
      locals: {
        auth: {
          user: user2,
        },
      },
    });

    let error;
    try {
      await consultingDataRouter.v0.getConsultingData(request, response);
    } catch (err) {
      error = err;
    }

    should.equal(error, undefined);

    response.statusCode.should.equal(200);

    // eslint-disable-next-line no-underscore-dangle
    const consultingDataResponse = response._getJSONData();

    consultingDataResponse.should.be.an.Object();
    consultingDataResponse.id.should.be.a.Number();
    consultingDataResponse.preference.should.be.a.String();
    consultingDataResponse.startDate.should.be.a.String();
    consultingDataResponse.endDate.should.be.a.String();
    consultingDataResponse.price.should.be.a.Number();
    consultingDataResponse.purpose.should.be.a.String();
    consultingDataResponse.want.should.be.a.String();
    consultingDataResponse.createdAt.should.be.a.String();
    consultingDataResponse.updatedAt.should.be.a.String();
    consultingDataResponse.receiver.should.be.a.Number();
    consultingDataResponse.sender.should.be.a.Number();
  });

  it('[consultant] 요청받은 컨설팅의 정보를 요청한 경우 200', async function () {
    const request = httpMocks.createRequest({
      method,
      url,
      params: {
        consultingDataId: consultingData.id,
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
      await consultingDataRouter.v0.getConsultingData(request, response);
    } catch (err) {
      error = err;
    }

    should.equal(error, undefined);

    response.statusCode.should.equal(200);

    // eslint-disable-next-line no-underscore-dangle
    const consultingDataResponse = response._getJSONData();

    consultingDataResponse.should.be.an.Object();
    consultingDataResponse.id.should.be.a.Number();
    consultingDataResponse.preference.should.be.a.String();
    consultingDataResponse.startDate.should.be.a.String();
    consultingDataResponse.endDate.should.be.a.String();
    consultingDataResponse.price.should.be.a.Number();
    consultingDataResponse.purpose.should.be.a.String();
    consultingDataResponse.want.should.be.a.String();
    consultingDataResponse.createdAt.should.be.a.String();
    consultingDataResponse.updatedAt.should.be.a.String();
    consultingDataResponse.receiver.should.be.a.Number();
    consultingDataResponse.sender.should.be.a.Number();
  });
});
