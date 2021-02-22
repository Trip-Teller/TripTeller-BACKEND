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

describe(`consultant.v0.getConsultant ${method} ${url}`, function () {
  let user;
  let consultant1;

  before(async function () {
    await truncateTables();

    user = await createEmailUser();
    const user2 = await createEmailUser();

    consultant1 = await createConsultant(user, '부산');
    await createFilterTag(consultant1, '액티비티');
    await createFilterTag(consultant1, '유흥');
    await createFilterTag(consultant1, '커플여행');

    const consultant2 = await createConsultant(user2, '서울');
    await createFilterTag(consultant2, '액티비티');
    await createFilterTag(consultant2, '유흥');
    await createFilterTag(consultant2, '커플여행');
  });

  it('[guest] 지역별 필터링을 한 경우 200', async function () {
    const request = httpMocks.createRequest({
      method,
      url,
      params: {
        consultantId: consultant1.id,
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
      await consultantRouter.v0.getConsultant(request, response);
    } catch (e) {
      error = e;
    }

    should.equal(error, undefined);

    response.statusCode.should.equal(200);

    // eslint-disable-next-line no-underscore-dangle
    const consultantData = response._getJSONData();

    consultantData.should.be.Object();
    consultantData.should.have.properties('id', 'backgroundImage', 'title', 'region', 'introduce',
      'cafe', 'restaurant', 'place', 'createdAt', 'updatedAt', 'filterTags', 'filterCount');
  });
});
