# TODO List API Backend

Backend API para la aplicación TODO List MVP.

## 🚀 Quick Start

### Prerequisites
- Node.js (v18 o superior)
- npm

### Installation

1. Install dependencies:
```bash
npm install
```

2. Configure environment variables:
```bash
cp .env.example .env
# Edit .env with your configuration
```

3. Start development server:
```bash
npm run dev
```

4. Start production server:
```bash
npm start
```

## 📡 API Endpoints

- **GET /health** - Health check endpoint
- **GET /api** - API information and available endpoints

## 🛠️ Tech Stack

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **CORS** - Cross-origin resource sharing
- **Helmet** - Security headers
- **dotenv** - Environment variable management

## 🔧 Environment Variables

See `.env.example` for required environment variables.

## 📁 Project Structure

```
backend/
├── src/
│   ├── app.js          # Main application file
│   ├── routes/         # Route definitions
│   ├── models/         # Data models
│   └── middleware/     # Custom middleware
├── .env.example        # Environment variables template
└── package.json        # Project configuration
```