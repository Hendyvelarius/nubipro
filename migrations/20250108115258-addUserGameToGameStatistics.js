'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('GameStatistics', 'UserGameId', {
      type: Sequelize.INTEGER,
      references: {
        model: 'UserGames',
        key: 'id'
      }
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('GameStatistics', 'UserGameId');
  }
};
