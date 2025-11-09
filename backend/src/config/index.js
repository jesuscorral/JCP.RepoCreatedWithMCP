/**
 * Application configuration
 * Centralizes all environment variables and app settings
 */

require('dotenv').config();

const config = {
  // Server configuration
  port: process.env.PORT || 3000,
  nodeEnv: process.env.NODE_ENV || 'development',
  
  // API configuration
  apiBasePath: process.env.API_BASE_PATH || '/api',
  
  // CORS configuration
  corsOrigin: process.env.CORS_ORIGIN || 'http://localhost:8080',
  
  // Application info
  appName: process.env.APP_NAME || 'TODO List API',
  appVersion: process.env.APP_VERSION || '1.0.0',
  
  // Database configuration (for future use)
  dbPath: process.env.DB_PATH || './data/todos.db',
  
  // Development helpers
  isDevelopment: process.env.NODE_ENV === 'development',
  isProduction: process.env.NODE_ENV === 'production',
  
  // Request limits
  jsonLimit: '10mb',
  urlEncodedLimit: '10mb'
};

module.exports = config;