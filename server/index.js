import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.js';
import productsRoutes from './routes/products.js';
import ordersRoutes from './routes/orders.js';
import reviewsRoutes from './routes/reviews.js';
import usersRoutes from './routes/users.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files
app.use(express.static(path.join(__dirname, '../')));
app.use('/backend', express.static(path.join(__dirname, '../backend')));
app.use('/plain-html-version', express.static(path.join(__dirname, '../plain-html-version')));

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productsRoutes);
app.use('/api/orders', ordersRoutes);
app.use('/api/reviews', reviewsRoutes);
app.use('/api/users', usersRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: 'Server is running',
    timestamp: new Date().toISOString()
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).json({
    success: false,
    message: 'Internal server error',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`
╔═══════════════════════════════════════════════════════╗
║                                                       ║
║   🚀 Fabrice E-Commerce Server                       ║
║                                                       ║
║   Server running on: http://localhost:${PORT}        ║
║   Environment: ${process.env.NODE_ENV || 'development'}                          ║
║                                                       ║
║   API Endpoints:                                      ║
║   • POST   /api/auth/login                           ║
║   • POST   /api/auth/register                        ║
║   • GET    /api/products                             ║
║   • GET    /api/orders?user_id=X                     ║
║   • POST   /api/orders                               ║
║   • GET    /api/reviews?user_id=X                    ║
║   • GET    /api/users/:id                            ║
║                                                       ║
║   Frontend:                                           ║
║   • Backend: http://localhost:${PORT}/backend/login.html  ║
║   • Plain HTML: http://localhost:${PORT}/plain-html-version/pages/login.html ║
║                                                       ║
╚═══════════════════════════════════════════════════════╝
  `);
});

export default app;
