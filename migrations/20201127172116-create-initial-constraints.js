module.exports = {
  async up(queryInterface) {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.addConstraint('refreshTokens', ['userId'], {
        type: 'foreign key',
        name: 'refreshTokens_users_fk',
        references: {
          table: 'users',
          field: 'id',
        },
        onDelete: 'cascade',
        onUpdate: 'cascade',
        transaction,
      });

      await queryInterface.addConstraint('tokens', ['userId'], {
        type: 'foreign key',
        name: 'tokens_users_fk',
        references: {
          table: 'users',
          field: 'id',
        },
        onDelete: 'cascade',
        onUpdate: 'cascade',
        transaction,
      });

      await queryInterface.addConstraint('filterTags', ['consultantId'], {
        type: 'foreign key',
        name: 'filterTags_consultants_fk',
        references: {
          table: 'consultants',
          field: 'id',
        },
        onDelete: 'cascade',
        onUpdate: 'cascade',
        transaction,
      });

      await queryInterface.addConstraint('consultingDatas', ['sender'], {
        type: 'foreign key',
        name: 'consultingDatas_users_fk',
        references: {
          table: 'users',
          field: 'id',
        },
        onDelete: 'cascade',
        onUpdate: 'cascade',
        transaction,
      });

      await queryInterface.addConstraint('consultingDatas', ['receiver'], {
        type: 'foreign key',
        name: 'consultingDatas_consultants_fk',
        references: {
          table: 'consultants',
          field: 'id',
        },
        onDelete: 'cascade',
        onUpdate: 'cascade',
        transaction,
      });

      await queryInterface.addConstraint('consultants', ['id'], {
        type: 'foreign key',
        name: 'consultants_users_fk',
        references: {
          table: 'users',
          field: 'id',
        },
        onDelete: 'cascade',
        onUpdate: 'cascade',
        transaction,
      });

      await queryInterface.addConstraint('chattings', ['sender'], {
        type: 'foreign key',
        name: 'chattings_users_sender_fk',
        references: {
          table: 'users',
          field: 'id',
        },
        onDelete: 'cascade',
        onUpdate: 'cascade',
        transaction,
      });

      await queryInterface.addConstraint('chattings', ['receiver'], {
        type: 'foreign key',
        name: 'chattings_users_receiver_fk',
        references: {
          table: 'users',
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
  async down(queryInterface) {
    await queryInterface.removeConstraint(
      'refreshTokens',
      'refreshTokens_users_fk',
    );

    await queryInterface.removeConstraint(
      'tokens',
      'tokens_users_fk',
    );

    await queryInterface.removeConstraint(
      'filterTags',
      'filterTags_consultants_fk',
    );

    await queryInterface.removeConstraint(
      'consultingDatas',
      'consultingDatas_users_fk',
    );

    await queryInterface.removeConstraint(
      'consultingDatas',
      'consultingDatas_consultants_fk',
    );

    await queryInterface.removeConstraint(
      'consultants',
      'consultants_users_fk',
    );

    await queryInterface.removeConstraint(
      'chattings',
      'chattings_users_sender_fk',
    );

    await queryInterface.removeConstraint(
      'chattings',
      'chattings_users_receiver_fk',
    );
  },
};
