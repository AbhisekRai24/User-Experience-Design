import express from 'express';
import {
  addToWishlist,
  removeFromWishlist,
  getWishlist,
  checkWishlist,
} from '../controllers/wishlistController.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

// All wishlist routes require authentication
router.post('/:eventId', authenticate, addToWishlist);
router.delete('/:eventId', authenticate, removeFromWishlist);
router.get('/', authenticate, getWishlist);
router.get('/check/:eventId', authenticate, checkWishlist);

export default router;