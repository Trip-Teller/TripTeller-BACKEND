module.exports = {
  up: (queryInterface) => (queryInterface.renameTable('consultingDatas', 'consultingData')),
  down: (queryInterface) => (queryInterface.renameTable('consultingData', 'consultingDatas')),
};
