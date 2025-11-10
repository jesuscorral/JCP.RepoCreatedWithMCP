'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('todos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      completed: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      priority: {
        type: Sequelize.ENUM('low', 'medium', 'high'),
        allowNull: false,
        defaultValue: 'medium'
      },
      due_date: {
        type: Sequelize.DATE,
        allowNull: true
      },
      tags: {
        type: Sequelize.JSON,
        allowNull: true,
        defaultValue: []
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      deleted_at: {
        allowNull: true,
        type: Sequelize.DATE
      }
    });

    // Add indexes for performance
    await queryInterface.addIndex('todos', ['completed']);
    await queryInterface.addIndex('todos', ['priority']);
    await queryInterface.addIndex('todos', ['due_date']);
    await queryInterface.addIndex('todos', ['created_at']);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('todos');
  }
};