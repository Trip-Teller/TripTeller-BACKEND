module.exports = {
  async up(queryInterface) {
    const transaction = await queryInterface.sequelize.transaction();

    try {
      await queryInterface.addConstraint('consultingData', ['sender'], {
        type: 'foreign key',
        name: 'consultingData_users_fk',
        references: {
          table: 'users',
          field: 'id',
        },
        onDelete: 'cascade',
        onUpdate: 'cascade',
        transaction,
      });

      await queryInterface.addConstraint('consultingData', ['receiver'], {
        type: 'foreign key',
        name: 'consultingData_consultants_fk',
        references: {
          table: 'consultants',
          field: 'id',
        },
        onDelete: 'cascade',
        onUpdate: 'cascade',
        transaction,
      });

      await transaction.commit();
    } catch (e) {
      await transaction.rollback();
      throw e;
    }
  },
  down() {},
};
