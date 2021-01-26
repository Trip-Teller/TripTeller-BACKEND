module.exports = {
  up: (queryInterface, Sequelize) => (queryInterface.addColumn('users', 'deletedAt', {
    allowNull: true,
    type: Sequelize.DATE,
  })),
  down: (queryInterface) => (queryInterface.removeColumn('users', 'deletedAt')),
};
