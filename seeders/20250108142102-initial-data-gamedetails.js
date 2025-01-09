'use strict';
const fs = require('fs');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
      const data = JSON.parse(fs.readFileSync('./json/gamedetail.json', 'utf8'));
    data.forEach(el => {
    el.createdAt = new Date();
    el.updatedAt = new Date();
    el.imageList = el.imageList.join(','); // Convert array to JSON string
    });
    await queryInterface.bulkInsert('GameDetails', data, {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('GameDetails', null, {});
  }
};
