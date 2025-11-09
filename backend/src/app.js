const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const config = require('./config');
const errorHandler = require('./middleware/errorHandler');

const app = express();

// Security middleware
app.use(helmet());

// CORS configuration
const corsOptions = {
  origin: config.corsOrigin,
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
    environment: config.nodeEnv,
    version: config.appVersion
  });
});

// API base route
app.get(config.apiBasePath, (req, res) => {
  res.status(200).json({
    message: `Welcome to ${config.appName}`,
    version: config.appVersion,
    endpoints: {
      health: '/health',
      todos: `${config.apiBasePath}/todos`
    }
  });
});

// 404 handler for undefined routes
app.use('*', (req, res) => {
  res.status(404).json({
    error: 'Route not found',
    message: `The requested route ${req.originalUrl} does not exist`,
    availableRoutes: ['/health', config.apiBasePath]
  });
});

// Global error handler
app.use(errorHandler);

// Start server
app.listen(config.port, () => {
  console.log(`
🚀 TODO API Server is running!
📍 Environment: ${config.nodeEnv}
🌐 URL: http://localhost:${config.port}
💚 Health Check: http://localhost:${config.port}/health
🔌 API Base: http://localhost:${config.port}${config.apiBasePath}
⏰ Started at: ${new Date().toISOString()}
  `);
});

module.exports = app;