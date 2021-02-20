const env = process.env.NODE_ENV;

const express = require('express');
const bytes = require('bytes');
const { v4: uuidv4 } = require('uuid');
const moment = require('moment');

const auth = require('../../middlewares/auth');
const {
  Errors,
  HttpBadRequest,
  HttpInternalServerError,
} = require('../../middlewares/error');
const db = require('../../models');

const asyncRoute = require('../../utils/asyncRoute');
const { storageUploadBackgroundImage } = require('../../utils/storageUpload');
const { clearFiles, uploadBackgroundImage } = require('../../utils/upload');

const { User, Consultant, FilterTag } = db;

/**
 * @param {Request} req
 * @param {Response} res
 * @returns {Promise<*>}
 */
const createConsultant = async (req, res) => {
  const { user } = res.locals.auth;

  const {
    region,
    filter,
    introduce,
    title,
    cafe,
    restaurant,
    place,
  } = req.body;

  if (!region) throw new HttpBadRequest(Errors.CONSULTANT.REGION_MISSING);
  if (!introduce) throw new HttpBadRequest(Errors.CONSULTANT.INTRODUCE_MISSING);
  if (!title) throw new HttpBadRequest(Errors.CONSULTANT.TITLE_MISSING);
  if (!cafe) throw new HttpBadRequest(Errors.CONSULTANT.CAFE_MISSING);
  if (!restaurant) throw new HttpBadRequest(Errors.CONSULTANT.RESTAURANT_MISSING);
  if (!place) throw new HttpBadRequest(Errors.CONSULTANT.PLACE_MISSING);

  if (!Object.values(Consultant.REGION).includes(region)) {
    throw new HttpBadRequest(Errors.CONSULTANT.REGION_INCORRECT);
  }

  for (let i = 0; i < filter.length; i += 1) {
    if (!Object.values(FilterTag.TYPE).includes(filter[i])) {
      throw new HttpBadRequest(Errors.FILTER_TAG.TYPE_INCORRECT);
    }
  }

  if (!req.file) throw new HttpBadRequest(Errors.CONSULTANT.BACKGROUND_IMAGE_MISSING);
  const backgroundImage = req.file;

  if (backgroundImage.size > bytes('5mb')) {
    throw new HttpBadRequest(Errors.COMMON.FILE_TOO_LARGE);
  }

  let existingConsultant;
  try {
    existingConsultant = await Consultant.findByPk(user.id);
  } catch (e) {
    throw new HttpInternalServerError(Errors.SERVER.UNEXPECTED_ERROR, e);
  }
  if (existingConsultant) throw new HttpBadRequest(Errors.CONSULTANT.ALREADY_EXIST);

  try {
    if (backgroundImage) {
      if (env !== 'ci') await storageUploadBackgroundImage(backgroundImage);
    }
  } catch (e) {
    throw new HttpInternalServerError(Errors.SERVER.UNEXPECTED_ERROR, e);
  }

  const consultantData = {
    id: user.id,
    region,
    backgroundImage: uuidv4(),
    title,
    introduce,
    cafe,
    restaurant,
    place,
  };

  user.isConsultant = true;
  user.consultantAt = moment();

  let consultant;
  const filterList = [];
  let transaction;
  try {
    transaction = await User.sequelize.transaction();

    consultant = await Consultant.create(consultantData, { transaction });

    let tagData;
    for (let i = 0; i < filter.length; i += 1) {
      tagData = {
        consultantId: user.id,
        tag: filter[i],
      };
      filterList.push(tagData);
      // eslint-disable-next-line no-await-in-loop
      await FilterTag.create(tagData, { transaction });
    }
    await user.save({ transaction });

    await transaction.commit();
  } catch (e) {
    if (transaction) await transaction.rollback();
    throw new HttpInternalServerError(Errors.SERVER.UNEXPECTED_ERROR, e);
  }

  if (req.file) clearFiles(req.file);

  const resBody = {
    consultant,
    filterList,
    filterLength: filter.length,
  };

  return res
    .status(201)
    .json(resBody);
};

/**
 * @param req {Request}
 * @param res {Response}
 * @returns {Promise<*>}
 */
const listConsultants = async (req, res) => {
  const { region } = req.query;

  const where = {};
  if (region) {
    where.region = region;
  }

  let consultants;
  try {
    consultants = await Consultant.findAll({
      where,
      include: [{
        model: FilterTag,
      }],
    });
  } catch (e) {
    throw new HttpInternalServerError(Errors.SERVER.UNEXPECTED_ERROR, e);
  }

  for (let i = 0; i < consultants.length; i += 1) {
    consultants[i].dataValues.filterCount = consultants[i].filterTags.length;
  }

  return res
    .status(200)
    .json(consultants);
};

const router = express.Router();

router.post('/', auth.authenticate({}), uploadBackgroundImage, asyncRoute(createConsultant));

router.get('/', asyncRoute(listConsultants));

module.exports = {
  router,
  createConsultant,
  listConsultants,
};
