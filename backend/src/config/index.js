/**
 * Application configuration
 * Centralizes all environment variables and app settings
 */

require('dotenv').config();

const config = {
  // Server configuration
  PORT: process.env.PORT || 3000,
  NODE_ENV: process.env.NODE_ENV || 'development',
  
  // API configuration
  API_BASE_PATH: process.env.API_BASE_PATH || '/api',
  
  // CORS configuration
  CORS_ORIGIN: process.env.CORS_ORIGIN || 'http://localhost:8080',
  
  // Application info
  APP_NAME: process.env.APP_NAME || 'TODO List API',
  APP_VERSION: process.env.APP_VERSION || '1.0.0',
  
  // Database configuration
  DB_HOST: process.env.DB_HOST || 'localhost',
  DB_PORT: process.env.DB_PORT || 5432,
  DB_NAME: process.env.DB_NAME || 'todolist',
  DB_USERNAME: process.env.DB_USERNAME || 'postgres',
  DB_PASSWORD: process.env.DB_PASSWORD || '',
  DB_PATH: process.env.DB_PATH || './database/development.sqlite',
  
  // Development helpers
  isDevelopment: process.env.NODE_ENV === 'development',
  isProduction: process.env.NODE_ENV === 'production',
  isTest: process.env.NODE_ENV === 'test',
  
  // Request limits
  jsonLimit: '10mb',
  urlEncodedLimit: '10mb'
};

module.exports = config;