import express from 'express';
import {
  joinEvent,
  getUserHistory,
  deleteEventHistory,
  cancelEventRegistration
} from '../controllers/historyController.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

// router.post('/join', authenticate, joinEvent);
router.post('/join/:eventId', authenticate, joinEvent);

router.get('/user/:userId', authenticate, getUserHistory);
router.delete('/:id', authenticate, deleteEventHistory);
router.post('/:id/cancel', authenticate, cancelEventRegistration);


export default router;

