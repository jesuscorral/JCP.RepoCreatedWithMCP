const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const config = require('./config');
const errorHandler = require('./middleware/errorHandler');
const { initializeDatabase, closeConnection } = require('./config/database');

const app = express();

// Initialize database before setting up routes
async function startServer() {
  try {
    // Initialize database connection and sync models
    await initializeDatabase();
    
    // Security middleware
    app.use(helmet());

    // CORS configuration
    const corsOptions = {
      origin: config.CORS_ORIGIN,
      methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
      allowedHeaders: ['Content-Type', 'Authorization'],
      credentials: true
    };
    app.use(cors(corsOptions));

    // Body parsing middleware
    app.use(express.json({ limit: config.jsonLimit }));
    app.use(express.urlencoded({ extended: true, limit: config.urlEncodedLimit }));

    // Request logging middleware (development only)
    if (config.isDevelopment) {
      app.use((req, res, next) => {
        console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
        next();
      });
    }

    // Health check endpoint
    app.get('/health', (req, res) => {
      res.status(200).json({
        status: 'OK',
        message: 'TODO API is running',
        timestamp: new Date().toISOString(),
        environment: config.NODE_ENV,
        version: config.APP_VERSION,
        database: 'Connected'
      });
    });

    // API base route
    app.get(config.API_BASE_PATH, (req, res) => {
      res.status(200).json({
        message: `Welcome to ${config.APP_NAME}`,
        version: config.APP_VERSION,
        endpoints: {
          health: '/health',
          todos: `${config.API_BASE_PATH}/todos`
        }
      });
    });

    // TODO: Add todo routes here
    // app.use(`${config.API_BASE_PATH}/todos`, todoRoutes);

    // 404 handler for undefined routes
    app.use('*', (req, res) => {
      res.status(404).json({
        error: 'Route not found',
        message: `The requested route ${req.originalUrl} does not exist`,
        availableRoutes: ['/health', config.API_BASE_PATH]
      });
    });

    // Global error handler
    app.use(errorHandler);

    // Start server
    const server = app.listen(config.PORT, () => {
      console.log(`
🚀 TODO API Server is running!
📍 Environment: ${config.NODE_ENV}
🌐 URL: http://localhost:${config.PORT}
💚 Health Check: http://localhost:${config.PORT}/health
🔌 API Base: http://localhost:${config.PORT}${config.API_BASE_PATH}
💾 Database: SQLite (${config.NODE_ENV})
⏰ Started at: ${new Date().toISOString()}
      `);
    });

    // Graceful shutdown
    process.on('SIGTERM', async () => {
      console.log('💤 SIGTERM received, shutting down gracefully...');
      server.close(async () => {
        await closeConnection();
        process.exit(0);
      });
    });

    process.on('SIGINT', async () => {
      console.log('💤 SIGINT received, shutting down gracefully...');
      server.close(async () => {
        await closeConnection();
        process.exit(0);
      });
    });

  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
}

// Start the server
if (require.main === module) {
  startServer();
}

module.exports = app;