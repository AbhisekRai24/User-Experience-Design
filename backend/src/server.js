import dotenv from 'dotenv';
dotenv.config();

console.log('\n=== ENVIRONMENT VARIABLES CHECK ===');
console.log('CLOUDINARY_CLOUD_NAME:', process.env.CLOUDINARY_CLOUD_NAME || '❌ MISSING');
console.log('CLOUDINARY_API_KEY:', process.env.CLOUDINARY_API_KEY || '❌ MISSING');
console.log('CLOUDINARY_API_SECRET:', process.env.CLOUDINARY_API_SECRET ? '✓ Present' : '❌ MISSING');
console.log('MONGO_URI:', process.env.MONGO_URI || '❌ MISSING');
console.log('PORT:', process.env.PORT || '❌ MISSING');
console.log('===================================\n');

import express from 'express';
import cors from 'cors';
import connectDB from './config/database.js';

const app = express();
const PORT = process.env.PORT || 5000;

// ✅ UPDATE CORS - Handle preflight requests properly
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

// ✅ IMPORTANT: Increase size limits for file uploads
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

connectDB();

// Use dynamic imports for routes that depend on cloudinary
const startServer = async () => {
  const { default: authRoutes } = await import('./routes/authRoutes.js');
  const { default: eventRoutes } = await import('./routes/eventRoutes.js');
  const { default: historyRoutes } = await import('./routes/historyRoutes.js');
  const { default: adminUserRoutes } = await import('./routes/admin/userRoutes.js');
  const { default: notificationRoutes } = await import('./routes/notificationRoutes.js');
  const { default: leaderboardRoutes } = await import('./routes/leaderboardRoutes.js');
  const { default: wishlistRoutes } = await import('./routes/wishlistRoutes.js');
  const { default: userRoutes } = await import('./routes/usersRoutes.js');


  app.use('/api/auth', authRoutes);
  app.use('/api/events', eventRoutes);
  app.use('/api/history', historyRoutes);
  app.use('/api/users', adminUserRoutes);
  app.use('/api/notifications', notificationRoutes);

  app.use('/api/nusers', userRoutes);

  app.use('/api/leaderboard', leaderboardRoutes);

  app.use('/api/wishlist', wishlistRoutes);

  app.get('/api/health', (req, res) => {
    res.json({ message: 'Local Space API is running' });
  });

  // Global error handler - MUST be after all routes
  app.use((err, req, res, next) => {
    console.error('\n🔥 GLOBAL ERROR HANDLER:');
    console.error('URL:', req.url);
    console.error('Method:', req.method);
    console.error('Error name:', err.name);
    console.error('Error message:', err.message);
    console.error('Stack:', err.stack);
    console.error('========================\n');

    res.status(err.status || 500).json({
      message: err.message || 'Internal server error',
      error: process.env.NODE_ENV === 'development' ? err.stack : undefined
    });
  });

  // Handle uncaught exceptions
  process.on('uncaughtException', (error) => {
    console.error('\n💥 UNCAUGHT EXCEPTION:');
    console.error(error);
    console.error('========================\n');
  });

  process.on('unhandledRejection', (reason, promise) => {
    console.error('\n💥 UNHANDLED REJECTION:');
    console.error('Reason:', reason);
    console.error('Promise:', promise);
    console.error('========================\n');
  });


  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

startServer();