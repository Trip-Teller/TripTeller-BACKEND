const crypto = require('crypto');

const db = require('../models');

const {
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
    role: 'email',
    email: `${generateRandom(4)}@email.com`,
    password: commonPassword,
  });
  return user;
};

const truncateTables = async () => {
  const transaction = await User.sequelize.transaction();

  try {
    await User.truncate({
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
};
