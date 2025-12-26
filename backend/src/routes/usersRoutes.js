import express from 'express';
import { getProfile, updateProfile, getUserById } from '../controllers/usersController.js';
import { authenticate } from '../middleware/auth.js';
import { uploadProfile } from '../config/cloudinary.js';

const router = express.Router();

// Get current user profile (authenticated)
router.get('/profile', authenticate, getProfile);

// Update current user profile (authenticated, with optional image upload)
router.put('/profile', authenticate, uploadProfile.single('profileImage'), updateProfile);

// Get user by ID (public route, for leaderboard, etc.)
router.get('/:userId', getUserById);

export default router;