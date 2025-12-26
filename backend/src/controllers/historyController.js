// import EventHistory from '../models/EventHistory.js';
// import Event from '../models/Event.js';

// // export const joinEvent = async (req, res) => {
// //   try {
// //     const { eventId } = req.body;
// //     const userId = req.user._id;

// //     const existingHistory = await EventHistory.findOne({ user: userId, event: eventId });
// //     if (existingHistory) {
// //       return res.status(400).json({ message: 'Event already joined' });
// //     }

// //     const history = new EventHistory({ user: userId, event: eventId });
// //     await history.save();

// //     const event = await Event.findById(eventId);
// //     event.attendees += 1;
// //     await event.save();

// //     await history.populate({
// //       path: 'event',
// //       populate: { path: 'createdBy', select: 'username fullName' },
// //     });

// //     res.status(201).json(history);
// //   } catch (error) {
// //     res.status(500).json({ message: error.message });
// //   }
// // };
// export const joinEvent = async (req, res) => {
//   try {
//     const { eventId, name, email, phone, attendees, donation } = req.body;
//     const userId = req.user._id;

//     const existingHistory = await EventHistory.findOne({ user: userId, event: eventId });
//     if (existingHistory) {
//       return res.status(400).json({ message: 'Event already joined' });
//     }

//     // Create history entry with registration details
//     const history = new EventHistory({ 
//       user: userId, 
//       event: eventId,
//       registrationDetails: {
//         name,
//         email,
//         phone: phone || '',
//         attendees: attendees || 1,
//         donation: {
//           cash: donation?.cash || '',
//           items: donation?.items || '',
//         },
//       },
//     });
//     await history.save();

//     // Update event attendees count based on number of attendees registered
//     const event = await Event.findById(eventId);
//     event.attendees += (attendees || 1);
//     await event.save();

//     await history.populate({
//       path: 'event',
//       populate: { path: 'createdBy', select: 'username fullName' },
//     });

//     res.status(201).json(history);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };
// export const getUserHistory = async (req, res) => {
//   try {
//     const userId = req.params.userId;

//     const history = await EventHistory.find({ user: userId })
//       .populate({
//         path: 'event',
//         populate: { path: 'createdBy', select: 'username fullName' },
//       })
//       .sort({ createdAt: -1 });

//     res.json(history);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // export const removeFromHistory = async (req, res) => {
// //   try {
// //     const historyId = req.params.id;
// //     const history = await EventHistory.findById(historyId);

// //     if (!history) {
// //       return res.status(404).json({ message: 'History item not found' });
// //     }

// //     if (history.user.toString() !== req.user._id.toString()) {
// //       return res.status(403).json({ message: 'Not authorized' });
// //     }

// //     const event = await Event.findById(history.event);
// //     if (event) {
// //       event.attendees = Math.max(0, event.attendees - 1);
// //       await event.save();
// //     }

// //     await EventHistory.findByIdAndDelete(historyId);

// //     res.json({ message: 'Event removed from history' });
// //   } catch (error) {
// //     res.status(500).json({ message: error.message });
// //   }
// // };

// export const removeFromHistory = async (req, res) => {
//   try {
//     const historyId = req.params.id;
//     const history = await EventHistory.findById(historyId);

//     if (!history) {
//       return res.status(404).json({ message: 'History item not found' });
//     }

//     if (history.user.toString() !== req.user._id.toString()) {
//       return res.status(403).json({ message: 'Not authorized' });
//     }

//     const event = await Event.findById(history.event);
//     if (event) {
//       // Subtract the number of attendees that were registered
//       const registeredAttendees = history.registrationDetails?.attendees || 1;
//       event.attendees = Math.max(0, event.attendees - registeredAttendees);
//       await event.save();
//     }

//     await EventHistory.findByIdAndDelete(historyId);

//     res.json({ message: 'Event removed from history' });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };









import EventHistory from '../models/EventHistory.js';
import Event from '../models/Event.js';
import { createJoinEventNotification } from './notificationController.js';

// Join an event with registration data
export const joinEvent = async (req, res) => {
  try {
    const { eventId } = req.params;
    const userId = req.user._id;
    const registrationData = req.body; // Contains name, email, phone, attendees, donation

    console.log('\n=== JOIN EVENT REQUEST ===');
    console.log('Event ID:', eventId);
    console.log('User ID:', userId);
    console.log('Registration Data:', registrationData);

    // Get the event
    const event = await Event.findById(eventId);

    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    // ========================================
    // STATUS VALIDATIONS
    // ========================================

    const now = new Date();
    const eventDate = new Date(event.date);
    const deadline = event.registrationDeadline ? new Date(event.registrationDeadline) : null;

    // 1. Check if event has already passed
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    eventDate.setHours(0, 0, 0, 0);

    if (eventDate < today) {
      return res.status(400).json({ message: 'This event has already ended' });
    }

    // 2. Check if registration deadline has passed
    if (deadline && now > deadline) {
      return res.status(400).json({ message: 'Registration deadline has passed' });
    }

    // 3. Check if event is fully booked
    if (event.currentAttendees >= event.maxAttendees) {
      return res.status(400).json({ message: 'Event is fully booked' });
    }

    // 4. Check if user already joined
    const existingHistory = await EventHistory.findOne({
      user: userId,
      event: eventId,
    });

    if (existingHistory) {
      return res.status(400).json({ message: 'You have already joined this event' });
    }

    // ========================================
    // CREATE HISTORY & INCREMENT SEATS
    // ========================================

    // Create event history with registration data
    const eventHistory = new EventHistory({
      user: userId,
      event: eventId,
      registrationDetails: {
        name: registrationData.name,
        email: registrationData.email,
        phone: registrationData.phone || '',
        attendees: registrationData.attendees || 1,
        donation: {
          cash: registrationData.donation?.cash || '',
          items: registrationData.donation?.items || '',
        },
      },
      joinedAt: new Date(),
    });

    await eventHistory.save();

    // Increment currentAttendees by the number of attendees registered
    const attendeesCount = registrationData.attendees || 1;
    event.currentAttendees += attendeesCount;
    await event.save();

    console.log('✓ User joined successfully');
    console.log('✓ Current attendees:', event.currentAttendees, '/', event.maxAttendees);
    console.log('✓ Added attendees:', attendeesCount);

    // Create notification
    await createJoinEventNotification(userId, eventId);

    res.status(201).json({
      message: 'Successfully registered for the event',
      eventHistory,
      spotsLeft: event.maxAttendees - event.currentAttendees
    });

  } catch (error) {
    console.error('\n❌ JOIN EVENT ERROR:');
    console.error('Message:', error.message);
    console.error('Stack:', error.stack);

    res.status(500).json({ message: error.message });
  }
};

// Get user's event history
export const getUserHistory = async (req, res) => {
  try {
    const userId = req.params.userId;

    const history = await EventHistory.find({ user: userId })
      .populate({
        path: 'event',
        populate: { path: 'createdBy', select: 'username fullName' }
      })
      .sort({ joinedAt: -1 });

    res.json(history);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete event from history (optional - if you want users to "leave" an event)
export const deleteEventHistory = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user._id;

    const eventHistory = await EventHistory.findOne({
      _id: id,
      user: userId,
    });

    if (!eventHistory) {
      return res.status(404).json({ message: 'Event history not found' });
    }

    // Decrement currentAttendees by the number of attendees that were registered
    const event = await Event.findById(eventHistory.event);
    if (event && event.currentAttendees > 0) {
      const attendeesCount = eventHistory.registrationDetails?.attendees || 1;
      event.currentAttendees = Math.max(0, event.currentAttendees - attendeesCount);
      await event.save();
    }

    await EventHistory.findByIdAndDelete(id);

    res.json({
      message: 'Removed from event history',
      spotsLeft: event ? event.maxAttendees - event.currentAttendees : null
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};