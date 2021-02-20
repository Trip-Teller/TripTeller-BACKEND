module.exports = {
  up: async (queryInterface, Sequelize) => {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.changeColumn('consultants', 'cafe', {
        type: Sequelize.TEXT,
      }, { transaction });

      await queryInterface.changeColumn('consultants', 'restaurant', {
        type: Sequelize.TEXT,
      }, { transaction });

      await queryInterface.changeColumn('consultants', 'place', {
        type: Sequelize.TEXT,
      }, { transaction });
      await transaction.commit();
    } catch (e) {
      if (transaction) await transaction.rollback();
      throw e;
    }
  },
  down: async (queryInterface, Sequelize) => {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.changeColumn('consultants', 'cafe', {
        type: Sequelize.STRING,
      }, { transaction });

      await queryInterface.changeColumn('consultants', 'restaurant', {
        type: Sequelize.STRING,
      }, { transaction });

      await queryInterface.changeColumn('consultants', 'place', {
        type: Sequelize.STRING,
      }, { transaction });
      await transaction.commit();
    } catch (e) {
      if (transaction) await transaction.rollback();
      throw e;
    }
  },
};
