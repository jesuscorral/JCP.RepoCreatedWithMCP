/**
 * Models index file
 * Exports all models and handles model relationships
 */

const { sequelize } = require('../config/database');
const Todo = require('./Todo');

// Define model relationships here when we have more models
// For example:
// User.hasMany(Todo);
// Todo.belongsTo(User);

// Export models and sequelize instance
module.exports = {
  sequelize,
  Todo
};