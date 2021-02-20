/* eslint-disable no-console */
/* eslint-disable no-param-reassign */

const crypto = require('crypto');

const request = require('supertest');
const moment = require('moment');
const { v4: uuidv4 } = require('uuid');
const db = require('../models');

const app = require('../app');

const {
  Consultant,
  RefreshToken,
  Token,
  User,
  FilterTag
} = db;

const commonPassword = 'p@ssw0rd';

/**
 * @param {number} len
 * @returns {string}
 */
const generateRandom = (len) => (crypto.randomBytes(len).toString('hex'));

/**
 * @returns {Promise<*>}
 */
const createEmailUser = async () => {
  const user = await User.create({
    email: `${generateRandom(4)}@email.com`,
    password: commonPassword,
    age: 20,
    nickname: `nick_${generateRandom(4)}`,
    birthDate: '1997-12-12',
    gender: User.GENDER.FEMALE,
  });
  return user;
};

/**
 * @param user {User}
 * @param region {string}
 * @returns {Promise<*>}
 */
const createConsultant = async (user, region) => {
  const consultant = await Consultant.create({
    id: user.id,
    region,
    introduce: 'aaaaaaaaaaaaa',
    title: 'bbbbbbbb',
    cafe: 'cafe',
    restaurant: 'restaurant',
    place: 'place',
    backgroundImage: uuidv4(),
  });

  user.isConsultant = true;
  user.consultantAt = moment();

  await user.save();

  return consultant;
};

/**
 * @param consultant {Consultant}
 * @param type {string}
 * @returns {Promise<*>}
 */
const createFilterTag = async (consultant, type) => {
  const filterTag = await FilterTag.create({
    consultantId: consultant.id,
    tag: type,
  });

  return filterTag;
};

/**
 * @param {User} user
 * @returns {Promise<{accessToken: string, refreshToken: string}>}
 */
const userLogin = async (user) => {
  const res = await request(app)
    .post('/auth/v0')
    .send({
      email: user.email,
      password: commonPassword,
    })
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .expect(201);

  return {
    accessToken: res.body.accessToken,
    refreshToken: res.body.refreshToken,
  };
};

const truncateTables = async () => {
  const transaction = await User.sequelize.transaction();

  try {
    await RefreshToken.truncate({
      cascade: true,
      restartIdentity: true,
      force: true,
      transaction,
    });

    await Consultant.truncate({
      cascade: true,
      restartIdentity: true,
      force: true,
      transaction,
    });

    await FilterTag.truncate({
      cascade: true,
      restartIdentity: true,
      force: true,
      transaction,
    });

    await User.truncate({
      cascade: true,
      restartIdentity: true,
      force: true,
      transaction,
    });

    await Token.truncate({
      cascade: true,
      restartIdentity: true,
      force: true,
      transaction,
    });
    await db.sequelize.query('DELETE FROM `sqlite_sequence`;', { transaction });

    await transaction.commit();
  } catch (e) {
    await transaction.rollback();
    console.error(e);
    throw e;
  }
};

module.exports = {
  createEmailUser,
  createConsultant,
  createFilterTag,
  truncateTables,
  userLogin,
};
