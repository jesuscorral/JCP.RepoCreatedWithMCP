const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

/**
 * Todo Model
 * Represents a single todo item with title, description, completion status, and priority
 */
const Todo = sequelize.define('Todo', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: 'Title cannot be empty'
      },
      len: {
        args: [1, 255],
        msg: 'Title must be between 1 and 255 characters'
      }
    }
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
    validate: {
      len: {
        args: [0, 1000],
        msg: 'Description cannot exceed 1000 characters'
      }
    }
  },
  completed: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false
  },
  priority: {
    type: DataTypes.ENUM('low', 'medium', 'high'),
    allowNull: false,
    defaultValue: 'medium',
    validate: {
      isIn: {
        args: [['low', 'medium', 'high']],
        msg: 'Priority must be low, medium, or high'
      }
    }
  },
  dueDate: {
    type: DataTypes.DATE,
    allowNull: true,
    validate: {
      isDate: {
        msg: 'Due date must be a valid date'
      },
      isAfterToday(value) {
        if (value && new Date(value) < new Date()) {
          throw new Error('Due date cannot be in the past');
        }
      }
    }
  },
  tags: {
    type: DataTypes.JSON,
    allowNull: true,
    defaultValue: [],
    validate: {
      isValidTags(value) {
        if (value && !Array.isArray(value)) {
          throw new Error('Tags must be an array');
        }
        if (value && value.length > 10) {
          throw new Error('Cannot have more than 10 tags');
        }
      }
    }
  }
}, {
  // Model options
  timestamps: true, // Adds createdAt and updatedAt
  paranoid: true,   // Soft deletes (adds deletedAt)
  underscored: true, // Use snake_case for column names
  tableName: 'todos',
  
  // Indexes for performance
  indexes: [
    {
      fields: ['completed']
    },
    {
      fields: ['priority']
    },
    {
      fields: ['due_date']
    },
    {
      fields: ['created_at']
    }
  ],
  
  // Model validation
  validate: {
    titleAndDescriptionNotBothEmpty() {
      if (!this.title && !this.description) {
        throw new Error('Either title or description must be provided');
      }
    }
  }
});

/**
 * Instance methods
 */
Todo.prototype.markComplete = function() {
  this.completed = true;
  return this.save();
};

Todo.prototype.markIncomplete = function() {
  this.completed = false;
  return this.save();
};

Todo.prototype.toggleComplete = function() {
  this.completed = !this.completed;
  return this.save();
};

Todo.prototype.addTag = function(tag) {
  if (!this.tags) this.tags = [];
  if (!this.tags.includes(tag)) {
    this.tags.push(tag);
    return this.save();
  }
  return this;
};

Todo.prototype.removeTag = function(tag) {
  if (!this.tags) return this;
  this.tags = this.tags.filter(t => t !== tag);
  return this.save();
};

/**
 * Class methods (static methods)
 */
Todo.findByPriority = function(priority) {
  return this.findAll({
    where: { priority },
    order: [['created_at', 'DESC']]
  });
};

Todo.findCompleted = function(completed = true) {
  return this.findAll({
    where: { completed },
    order: [['updated_at', 'DESC']]
  });
};

Todo.findByTag = function(tag) {
  return this.findAll({
    where: sequelize.where(
      sequelize.fn('JSON_CONTAINS', sequelize.col('tags'), JSON.stringify(tag)),
      true
    ),
    order: [['created_at', 'DESC']]
  });
};

Todo.findOverdue = function() {
  return this.findAll({
    where: {
      due_date: {
        [sequelize.Op.lt]: new Date()
      },
      completed: false
    },
    order: [['due_date', 'ASC']]
  });
};

/**
 * Hooks
 */
Todo.beforeCreate((todo, options) => {
  // Trim whitespace from title and description
  if (todo.title) {
    todo.title = todo.title.trim();
  }
  if (todo.description) {
    todo.description = todo.description.trim();
  }
});

Todo.beforeUpdate((todo, options) => {
  // Trim whitespace from title and description
  if (todo.title) {
    todo.title = todo.title.trim();
  }
  if (todo.description) {
    todo.description = todo.description.trim();
  }
});

module.exports = Todo;