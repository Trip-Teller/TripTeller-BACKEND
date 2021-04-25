const express = require('express');

const auth = require('../../middlewares/auth');
const {
  Errors,
  HttpBadRequest,
  HttpNotFound,
  HttpForbidden,
  HttpInternalServerError,
} = require('../../middlewares/error');
const db = require('../../models');

const asyncRoute = require('../../utils/asyncRoute');

const { ConsultingData } = db;

/**
 * @param {Request} req
 * @param {Response} res
 * @returns {Promise<*>}
 */
const createConsultingData = async (req, res) => {
  const { user: currentUser } = res.locals.auth;

  const {
    preference,
    startDate,
    endDate,
    price,
    purpose,
    want,
  } = req.body;

  const receiver = req.body.consultantId;

  if (!preference) throw new HttpBadRequest(Errors.CONSULTING_DATA.PREFERENCE_MISSING);
  if (!startDate) throw new HttpBadRequest(Errors.CONSULTING_DATA.START_DATE_MISSING);
  if (!endDate) throw new HttpBadRequest(Errors.CONSULTING_DATA.END_DATE_MISSING);
  if (!price) throw new HttpBadRequest(Errors.CONSULTING_DATA.PRICE_MISSING);
  if (!purpose) throw new HttpBadRequest(Errors.CONSULTING_DATA.PURPOSE_MISSING);
  if (!want) throw new HttpBadRequest(Errors.CONSULTING_DATA.WANT_MISSING);

  const consultingData = {
    receiver,
    preference,
    startDate,
    endDate,
    price,
    purpose,
    want,
    sender: currentUser.id,
  };
  // TODO: After submit consultingData create chatting Room.
  let consulting;
  try {
    consulting = await ConsultingData.create(consultingData);
  } catch (e) {
    throw new HttpInternalServerError(Errors.SERVER.UNEXPECTED_ERROR, e);
  }

  return res
    .status(201)
    .json(consulting);
};

/**
 * @param {Request} req
 * @param {Response} res
 * @returns {Promise<*>}
 */
const getConsultingData = async (req, res) => {
  const { user: currentUser } = res.locals.auth;

  const { consultingDataId } = req.params;

  let consultingData;
  try {
    consultingData = await ConsultingData.findByPk(consultingDataId);
  } catch (e) {
    throw new HttpInternalServerError(Errors.SERVER.UNEXPECTED_ERROR, e);
  }

  if (!consultingData) throw new HttpNotFound(Errors.CONSULTING_DATA.NOT_FOUND);

  if (currentUser.isConsultant) {
    if ((consultingData.receiver !== currentUser.id)
      && (consultingData.sender !== currentUser.id)) {
      throw new HttpForbidden(Errors.COMMON.NO_PERMISSION);
    }
  } else if ((consultingData.sender !== currentUser.id)) {
    throw new HttpForbidden(Errors.COMMON.NO_PERMISSION);
  }

  return res
    .status(200)
    .json(consultingData);
};

const router = express.Router();

router.post('/',
  auth.authenticate({}),
  asyncRoute(createConsultingData));

router.get('/:consultingDataId',
  auth.authenticate({}),
  asyncRoute(getConsultingData));

module.exports = {
  router,
  createConsultingData,
  getConsultingData,
};
