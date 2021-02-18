const crypto = require('crypto');

const request = require('supertest');
const db = require('../models');

const app = require('../app');

const {
  RefreshToken,
  Token,
  User,
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
    nickname: `nick_${generateRandom(4)}`,
    birthDate: '1997-12-12',
    gender: User.GENDER.FEMALE,
  });
  return user;
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
  truncateTables,
  userLogin,
};
