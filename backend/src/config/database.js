const { Sequelize } = require('sequelize');
const config = require('./index');

// Database configuration based on environment
const dbConfig = {
  development: {
    dialect: 'sqlite',
    storage: './database/development.sqlite',
    logging: config.NODE_ENV === 'development' ? console.log : false,
    define: {
      timestamps: true,
      underscored: true,
      paranoid: true // Soft deletes
    }
  },
  test: {
    dialect: 'sqlite',
    storage: ':memory:', // In-memory database for testing
    logging: false,
    define: {
      timestamps: true,
      underscored: true,
      paranoid: true
    }
  },
  production: {
    dialect: 'postgres',
    host: config.DB_HOST,
    port: config.DB_PORT,
    username: config.DB_USERNAME,
    password: config.DB_PASSWORD,
    database: config.DB_NAME,
    logging: false,
    define: {
      timestamps: true,
      underscored: true,
      paranoid: true
    },
    pool: {
      max: 10,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  }
};

// Get current environment configuration
const environment = config.NODE_ENV || 'development';
const currentConfig = dbConfig[environment];

// Create Sequelize instance
const sequelize = new Sequelize(currentConfig);

// Test database connection
const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log(`✅ Database connection established successfully (${environment})`);
    return true;
  } catch (error) {
    console.error('❌ Unable to connect to the database:', error);
    throw error;
  }
};

// Initialize database
const initializeDatabase = async () => {
  try {
    await testConnection();
    
    // Sync all models (create tables)
    await sequelize.sync({ 
      force: config.NODE_ENV === 'test', // Drop and recreate tables in test mode
      alter: config.NODE_ENV === 'development' // Update tables in development
    });
    
    console.log('✅ Database synchronized successfully');
    return true;
  } catch (error) {
    console.error('❌ Database initialization failed:', error);
    throw error;
  }
};

// Close database connection
const closeConnection = async () => {
  try {
    await sequelize.close();
    console.log('✅ Database connection closed');
  } catch (error) {
    console.error('❌ Error closing database connection:', error);
    throw error;
  }
};

module.exports = {
  sequelize,
  testConnection,
  initializeDatabase,
  closeConnection,
  dbConfig
};