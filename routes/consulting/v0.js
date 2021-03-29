const express = require('express');

const auth = require('../../middlewares/auth');
const {
  Errors,
  HttpBadRequest,
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

const router = express.Router();

router.post('/', auth.authenticate({}), asyncRoute(createConsultingData));

module.exports = {
  router,
  createConsultingData,
};
