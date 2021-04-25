module.exports = {
  async up(queryInterface) {
    const transaction = await queryInterface.sequelize.transaction();

    try {
      await queryInterface.removeConstraint(
        'consultingData',
        'consultingDatas_users_fk',
        { transaction },
      );

      await queryInterface.removeConstraint(
        'consultingData',
        'consultingDatas_consultants_fk',
        { transaction },
      );

      await transaction.commit();
    } catch (e) {
      await transaction.rollback();
      throw e;
    }
  },
  down() {},
};
