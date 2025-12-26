import express from 'express';
import { signup, login, refresh } from '../controllers/authController.js';
// import { updateSettings } from '../controllers/authController.js';


const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.post('/refresh', refresh);

// router.put('/settings', authenticate, updateSettings);

export default router;

