import express from 'express';
import { getTopAttendees } from '../controllers/leaderboardController.js';

const router = express.Router();

router.get('/top-attendees', getTopAttendees);

export default router;