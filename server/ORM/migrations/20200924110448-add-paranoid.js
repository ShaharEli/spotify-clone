'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn(
      "songs",
      'deletedAt',
      {
          type: Sequelize.DATE,
          allowNull: true,
          validate: {
          }
      }
  );
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await  queryInterface.removeColumn('songs', 'deletedAt');

  }
};
