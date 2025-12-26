// import express from 'express';
// import {
//   getEvents,
//   getEventById,
//   searchEvents, // NEW

//   createEvent,
//   updateEvent,
//   deleteEvent,
// } from '../controllers/eventController.js';
// import { authenticate, isAdmin } from '../middleware/auth.js';
// import { upload } from '../config/cloudinary.js';

// const router = express.Router();

// // Add logging middleware to see ALL requests
// router.use((req, res, next) => {
//   console.log(`🔵 Event Route Hit: ${req.method} ${req.originalUrl}`);
//   console.log('Query params:', req.query);
//   next();
// });

// router.get('/search', searchEvents); // NEW
// router.get('/', getEvents);
// router.get('/:id', getEventById);
// router.post('/', authenticate, isAdmin, upload.single('image'), createEvent);
// router.put('/:id', authenticate, isAdmin, upload.single('image'), updateEvent);
// router.delete('/:id', authenticate, isAdmin, deleteEvent);

// export default router;
import express from 'express';
import {
  getEvents,
  searchEvents,
  getEventById,
  createEvent,
  updateEvent,
  deleteEvent,
  getEventVolunteers
} from '../controllers/eventController.js';
import { authenticate, isAdmin } from '../middleware/auth.js';
import { upload } from '../config/cloudinary.js';

const router = express.Router();

// Public routes - NO authentication required
router.get('/', getEvents);              // Browse all events
router.get('/search', searchEvents);     // Search events
router.get('/:id', getEventById);        // View event details

// Protected routes - Authentication required
router.post('/', authenticate, isAdmin, upload.single('image'), createEvent);
router.put('/:id', authenticate, isAdmin, upload.single('image'), updateEvent);
router.delete('/:id', authenticate, isAdmin, deleteEvent);
router.get('/:id/volunteers', authenticate, isAdmin, getEventVolunteers);

export default router;