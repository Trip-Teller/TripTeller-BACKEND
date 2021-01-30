const env = process.env.NODE_ENV;

const express = require('express');
const { v4: uuidv4 } = require('uuid');

const {
  Errors,
  HttpBadRequest,
  HttpInternalServerError,
} = require('../../middlewares/error');
const db = require('../../models');
const {
  createToken,
} = require('../../utils/token');

const asyncRoute = require('../../utils/asyncRoute');
const { storageUploadUserProfileImage } = require('../../utils/storageUpload');
const { clearFiles, uploadUserProfileImage } = require('../../utils/upload');

const { Token, User } = db;

/**
 * @param {Request} req
 * @param {Response} res
 * @returns {Promise<*>}
 */
const createUser = async (req, res) => {
  const {
    age,
    birthDate,
    email,
    password,
    nickname,
    gender,
  } = req.body;

  if (!age) throw new HttpBadRequest(Errors.USER.AGE_MISSING);
  if (!birthDate) throw new HttpBadRequest(Errors.USER.BIRTH_DATE_MISSING);
  if (!email) throw new HttpBadRequest(Errors.USER.EMAIL_MISSING);
  if (!password) throw new HttpBadRequest(Errors.USER.PASSWORD_MISSING);
  if (!nickname) throw new HttpBadRequest(Errors.USER.NICKNAME_MISSING);
  if (!gender) throw new HttpBadRequest(Errors.USER.GENDER_MISSING);

  if ((User.GENDER.MAN !== gender) && (User.GENDER.FEMALE !== gender)) {
    throw new HttpBadRequest(Errors.USER.GENDER_INCORRECT);
  }

  let profileImage;
  if (req.file) {
    profileImage = req.file;
  }

  let existingUser;
  try {
    existingUser = await User.findOne({
      attributes: ['id'],
      where: {
        email,
      },
    });
  } catch (e) {
    throw new HttpInternalServerError(Errors.SERVER.UNEXPECTED_ERROR, e);
  }

  if (existingUser) throw new HttpBadRequest(Errors.USER.EMAIL_ALREADY_EXIST);

  const userData = {
    age,
    nickname,
    birthDate,
    email,
    password,
    gender,
    profileImage: profileImage ? uuidv4() : null,
  };

  let user;
  try {
    user = await User.create(userData);
  } catch (e) {
    throw new HttpInternalServerError(Errors.SERVER.UNEXPECTED_ERROR, e);
  }

  try {
    if (profileImage) {
      if (env !== 'ci') await storageUploadUserProfileImage(profileImage);
    }
  } catch (e) {
    throw new HttpInternalServerError(Errors.SERVER.UNEXPECTED_ERROR, e);
  }

  if (req.file) clearFiles(req.file);

  try {
    await createToken(user, {
      action: Token.ACTION.VALIDATE_LOGIN_EMAIL,
    });
  } catch (e) {
    throw new HttpInternalServerError(Errors.SERVER.UNEXPECTED_ERROR, e);
  }

  delete user.dataValues.password;

  return res
    .status(201)
    .json(user);
};

const router = express.Router();

router.post('/', uploadUserProfileImage, asyncRoute(createUser));

module.exports = {
  router,
  createUser,
};
