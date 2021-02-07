module.exports = {
  up: async (queryInterface) => {
    await queryInterface.renameColumn('refreshTokens', 'lastIssueAt',
      'expiresAt');
  },
  down: async (queryInterface) => {
    await queryInterface.renameColumn('refreshTokens', 'expiresAt',
      'lastIssueAt');
  },
};
