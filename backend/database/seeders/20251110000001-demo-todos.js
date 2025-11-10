'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const sampleTodos = [
      {
        title: 'Complete project setup',
        description: 'Set up the basic project structure and dependencies for the TODO List MVP',
        completed: true,
        priority: 'high',
        due_date: new Date('2025-11-08'),
        tags: JSON.stringify(['setup', 'backend', 'mvp']),
        created_at: new Date('2025-11-05'),
        updated_at: new Date('2025-11-08')
      },
      {
        title: 'Implement database models',
        description: 'Create Sequelize models for Todo items with proper validation and relationships',
        completed: true,
        priority: 'high',
        due_date: new Date('2025-11-10'),
        tags: JSON.stringify(['database', 'backend', 'models']),
        created_at: new Date('2025-11-08'),
        updated_at: new Date('2025-11-10')
      },
      {
        title: 'Create REST API endpoints',
        description: 'Develop CRUD operations for managing todo items through RESTful API',
        completed: false,
        priority: 'high',
        due_date: new Date('2025-11-12'),
        tags: JSON.stringify(['api', 'backend', 'crud']),
        created_at: new Date('2025-11-10'),
        updated_at: new Date('2025-11-10')
      },
      {
        title: 'Build frontend components',
        description: 'Create React components for displaying and managing todo items',
        completed: false,
        priority: 'medium',
        due_date: new Date('2025-11-15'),
        tags: JSON.stringify(['frontend', 'react', 'ui']),
        created_at: new Date('2025-11-10'),
        updated_at: new Date('2025-11-10')
      },
      {
        title: 'Implement user authentication',
        description: 'Add user login and registration functionality with JWT tokens',
        completed: false,
        priority: 'medium',
        due_date: new Date('2025-11-18'),
        tags: JSON.stringify(['auth', 'security', 'jwt']),
        created_at: new Date('2025-11-10'),
        updated_at: new Date('2025-11-10')
      },
      {
        title: 'Add data validation',
        description: 'Implement comprehensive input validation for all API endpoints',
        completed: false,
        priority: 'medium',
        due_date: new Date('2025-11-14'),
        tags: JSON.stringify(['validation', 'security', 'backend']),
        created_at: new Date('2025-11-10'),
        updated_at: new Date('2025-11-10')
      },
      {
        title: 'Write unit tests',
        description: 'Create comprehensive test suite for all major functionalities',
        completed: false,
        priority: 'low',
        due_date: new Date('2025-11-20'),
        tags: JSON.stringify(['testing', 'quality', 'automation']),
        created_at: new Date('2025-11-10'),
        updated_at: new Date('2025-11-10')
      },
      {
        title: 'Deploy to production',
        description: 'Set up production deployment pipeline with CI/CD automation',
        completed: false,
        priority: 'low',
        due_date: new Date('2025-11-25'),
        tags: JSON.stringify(['deployment', 'devops', 'production']),
        created_at: new Date('2025-11-10'),
        updated_at: new Date('2025-11-10')
      },
      {
        title: 'Learn Sequelize advanced features',
        description: 'Study advanced Sequelize concepts like associations, transactions, and hooks',
        completed: false,
        priority: 'low',
        due_date: null,
        tags: JSON.stringify(['learning', 'sequelize', 'database']),
        created_at: new Date('2025-11-10'),
        updated_at: new Date('2025-11-10')
      },
      {
        title: 'Update project documentation',
        description: 'Create comprehensive README and API documentation for the project',
        completed: false,
        priority: 'medium',
        due_date: new Date('2025-11-22'),
        tags: JSON.stringify(['documentation', 'readme', 'api']),
        created_at: new Date('2025-11-10'),
        updated_at: new Date('2025-11-10')
      }
    ];

    await queryInterface.bulkInsert('todos', sampleTodos, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('todos', null, {});
  }
};