"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('users', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      userName: { type: Sequelize.STRING, allowNull: false, unique: true },
      mail: { type: Sequelize.STRING, allowNull: false, unique: true },
      pass: { type: Sequelize.STRING, allowNull: false },
      role: {
        type: Sequelize.ENUM('user', 'uploader', 'admin'),
        allowNull: false,
        defaultValue: 'user'
      },
      createdAt: { type: Sequelize.DATE, allowNull: false },
      updatedAt: { type: Sequelize.DATE, allowNull: false }
    });
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable('users');
  }
};
