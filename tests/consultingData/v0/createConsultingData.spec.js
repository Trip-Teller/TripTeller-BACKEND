/* eslint-disable func-names */

require('moment');
const httpMocks = require('node-mocks-http');
const should = require('should');

const { truncateTables, createEmailUser, createConsultant } = require('../../common');
const consultingDataRouter = require('../../../routes/consulting');

const method = 'POST';
const url = '/consultingData/v0';

describe(`consultingData.v0.createConsultingData ${method} ${url}`, function () {
  let consultant;
  let user;

  before(async function () {
    await truncateTables();

    user = await createEmailUser();

    consultant = await createConsultant(user, '서울');
  });

  it('[user] 컨설팅을 요청한 경우 403', async function () {
    const request = httpMocks.createRequest({
      method,
      url,
      body: {
        consultantId: consultant.id,
        preference: '놀기',
        startDate: '2020-12-31',
        endDate: '2021-01-02',
        price: '200만원',
        purpose: '놀러갑니다.',
        want: '자유여행',
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
      await consultingDataRouter.v0.createConsultingData(request, response);
    } catch (e) {
      error = e;
    }

    should.equal(error, undefined);

    response.statusCode.should.equal(201);

    // eslint-disable-next-line no-underscore-dangle
    const consultingData = response._getJSONData();
    consultingData.should.be.an.Object();
    consultingData.should.have.properties('id', 'receiver', 'preference', 'startDate', 'endDate',
      'price', 'purpose', 'want', 'sender', 'updatedAt', 'createdAt');

    consultingData.id.should.be.a.Number();

    consultingData.receiver.should.be.a.Number();
    consultingData.receiver.should.equal(consultant.id);

    consultingData.preference.should.be.a.String();
    consultingData.preference.should.equal('놀기');

    consultingData.createdAt.should.be.a.String();

    consultingData.updatedAt.should.be.a.String();
  });
});
