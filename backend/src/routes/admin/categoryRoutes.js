import express from 'express';
import {
  getCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
  toggleCategoryStatus,
  getCategoryStats
} from '../../controllers/admin/categoryController.js';
import { authenticate, isAdmin } from '../../middleware/auth.js';

const router = express.Router();

// Public routes
router.get('/', getCategories);
router.get('/stats', getCategoryStats);
router.get('/:id', getCategoryById);

// authenticateed isAdmin routes
router.post('/', authenticate, isAdmin, createCategory);
router.put('/:id', authenticate, isAdmin, updateCategory);
router.delete('/:id', authenticate, isAdmin, deleteCategory);
router.put('/:id/toggle-status', authenticate, isAdmin, toggleCategoryStatus);

export default router