// import Notification from '../models/Notification.js';
// import EventHistory from '../models/EventHistory.js';
// import User from '../models/User.js';

// // ============================================
// // API HANDLERS (for routes)
// // ============================================

// // Get all notifications for logged-in user
// export const getNotifications = async (req, res) => {
//   try {
//     const notifications = await Notification.find({ user: req.user._id })
//       .populate('event', 'title date time location image')
//       .sort({ createdAt: -1 })
//       .limit(50);

//     res.json(notifications);
//   } catch (error) {
//     console.error('Get notifications error:', error);
//     res.status(500).json({ message: error.message });
//   }
// };

// // Get unread count
// export const getUnreadCount = async (req, res) => {
//   try {
//     const count = await Notification.countDocuments({
//       user: req.user._id,
//       isRead: false,
//     });

//     res.json({ count });
//   } catch (error) {
//     console.error('Get unread count error:', error);
//     res.status(500).json({ message: error.message });
//   }
// };

// // Mark notification as read
// export const markAsRead = async (req, res) => {
//   try {
//     const notification = await Notification.findOneAndUpdate(
//       { _id: req.params.id, user: req.user._id },
//       { isRead: true },
//       { new: true }
//     );

//     if (!notification) {
//       return res.status(404).json({ message: 'Notification not found' });
//     }

//     res.json(notification);
//   } catch (error) {
//     console.error('Mark as read error:', error);
//     res.status(500).json({ message: error.message });
//   }
// };

// // Mark all as read
// export const markAllAsRead = async (req, res) => {
//   try {
//     await Notification.updateMany(
//       { user: req.user._id, isRead: false },
//       { isRead: true }
//     );

//     res.json({ message: 'All notifications marked as read' });
//   } catch (error) {
//     console.error('Mark all as read error:', error);
//     res.status(500).json({ message: error.message });
//   }
// };

// // Delete notification
// export const deleteNotification = async (req, res) => {
//   try {
//     const notification = await Notification.findOneAndDelete({
//       _id: req.params.id,
//       user: req.user._id,
//     });

//     if (!notification) {
//       return res.status(404).json({ message: 'Notification not found' });
//     }

//     res.json({ message: 'Notification deleted' });
//   } catch (error) {
//     console.error('Delete notification error:', error);
//     res.status(500).json({ message: error.message });
//   }
// };

// // Clear all notifications
// export const clearAll = async (req, res) => {
//   try {
//     await Notification.deleteMany({ user: req.user._id });
//     res.json({ message: 'All notifications cleared' });
//   } catch (error) {
//     console.error('Clear all error:', error);
//     res.status(500).json({ message: error.message });
//   }
// };

// // ============================================
// // HELPER FUNCTIONS (used by other controllers)
// // ============================================

// // Create reminder notification (24 hours before event)
// export const createReminderNotification = async (event) => {
//   try {
//     console.log(`Creating reminders for event: ${event.title}`);

//     const eventHistories = await EventHistory.find({ event: event._id })
//       .populate('user', 'notificationSettings');

//     for (const history of eventHistories) {
//       const user = history.user;

//       if (!user.notificationSettings?.eventReminders) {
//         console.log(`User ${user._id} has reminders disabled`);
//         continue;
//       }

//       const existingNotification = await Notification.findOne({
//         user: user._id,
//         event: event._id,
//         type: 'reminder',
//       });

//       if (existingNotification) {
//         console.log(`Reminder already exists for user ${user._id}`);
//         continue;
//       }

//       await Notification.create({
//         user: user._id,
//         event: event._id,
//         type: 'reminder',
//         title: `Reminder: ${event.title}`,
//         message: `Don't forget! ${event.title} is happening tomorrow at ${event.time} at ${event.location}`,
//       });

//       console.log(`✓ Created reminder for user ${user._id}`);
//     }
//   } catch (error) {
//     console.error('Error creating reminder notifications:', error);
//   }
// };

// // Create event update notification (when admin edits event)
// export const createEventUpdateNotification = async (event, changes) => {
//   try {
//     console.log(`Creating update notifications for event: ${event.title}`);

//     const eventHistories = await EventHistory.find({ event: event._id });

//     let changeMessage = 'The event has been updated. ';
//     if (changes.title) changeMessage += `New title: ${changes.title}. `;
//     if (changes.date) changeMessage += `New date: ${new Date(changes.date).toLocaleDateString()}. `;
//     if (changes.time) changeMessage += `New time: ${changes.time}. `;
//     if (changes.location) changeMessage += `New location: ${changes.location}. `;

//     for (const history of eventHistories) {
//       await Notification.create({
//         user: history.user,
//         event: event._id,
//         type: 'event_updated',
//         title: `Event Updated: ${event.title}`,
//         message: changeMessage,
//         metadata: { changes },
//       });

//       console.log(`✓ Created update notification for user ${history.user}`);
//     }
//   } catch (error) {
//     console.error('Error creating update notifications:', error);
//   }
// };

// // Create event cancellation notification (when admin deletes event)
// export const createEventCancelledNotification = async (event, userIds) => {
//   try {
//     console.log(`Creating cancellation notifications for event: ${event.title}`);

//     for (const userId of userIds) {
//       await Notification.create({
//         user: userId,
//         event: event._id,
//         type: 'event_cancelled',
//         title: `Event Cancelled: ${event.title}`,
//         message: `The event "${event.title}" scheduled for ${new Date(event.date).toLocaleDateString()} at ${event.time} has been cancelled by an admin.`,
//       });

//       console.log(`✓ Created cancellation notification for user ${userId}`);
//     }
//   } catch (error) {
//     console.error('Error creating cancellation notifications:', error);
//   }
// };



import Notification from '../models/Notification.js';
import EventHistory from '../models/EventHistory.js';
import User from '../models/User.js';

// ============================================
// API HANDLERS (for routes)
// ============================================

// Get all notifications for logged-in user
export const getNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find({ user: req.user._id })
      .populate('event', 'title date time location image')
      .sort({ createdAt: -1 })
      .limit(50);

    res.json(notifications);
  } catch (error) {
    console.error('Get notifications error:', error);
    res.status(500).json({ message: error.message });
  }
};

// Get unread count
export const getUnreadCount = async (req, res) => {
  try {
    const count = await Notification.countDocuments({
      user: req.user._id,
      isRead: false,
    });

    res.json({ count });
  } catch (error) {
    console.error('Get unread count error:', error);
    res.status(500).json({ message: error.message });
  }
};

// Mark notification as read
export const markAsRead = async (req, res) => {
  try {
    const notification = await Notification.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      { isRead: true },
      { new: true }
    );

    if (!notification) {
      return res.status(404).json({ message: 'Notification not found' });
    }

    res.json(notification);
  } catch (error) {
    console.error('Mark as read error:', error);
    res.status(500).json({ message: error.message });
  }
};

// Mark all as read
export const markAllAsRead = async (req, res) => {
  try {
    await Notification.updateMany(
      { user: req.user._id, isRead: false },
      { isRead: true }
    );

    res.json({ message: 'All notifications marked as read' });
  } catch (error) {
    console.error('Mark all as read error:', error);
    res.status(500).json({ message: error.message });
  }
};

// Delete notification
export const deleteNotification = async (req, res) => {
  try {
    const notification = await Notification.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!notification) {
      return res.status(404).json({ message: 'Notification not found' });
    }

    res.json({ message: 'Notification deleted' });
  } catch (error) {
    console.error('Delete notification error:', error);
    res.status(500).json({ message: error.message });
  }
};

// Clear all notifications
export const clearAll = async (req, res) => {
  try {
    await Notification.deleteMany({ user: req.user._id });
    res.json({ message: 'All notifications cleared' });
  } catch (error) {
    console.error('Clear all error:', error);
    res.status(500).json({ message: error.message });
  }
};

// ============================================
// HELPER FUNCTIONS (used by other controllers)
// ============================================

// NEW: Create notification when user joins an event
export const createJoinEventNotification = async (userId, eventId) => {
  try {
    const Event = (await import('../models/Event.js')).default;
    const event = await Event.findById(eventId);

    if (!event) {
      console.error('Event not found for notification');
      return;
    }

    console.log(`Creating join confirmation for user ${userId} and event: ${event.title}`);

    await Notification.create({
      user: userId,
      event: eventId,
      type: 'registration_confirmed',
      title: `Registration Confirmed: ${event.title}`,
      message: `You've successfully registered for "${event.title}" on ${new Date(event.date).toLocaleDateString()} at ${event.time}. See you there!`,
    });

    console.log(`✓ Created registration confirmation for user ${userId}`);
  } catch (error) {
    console.error('Error creating join notification:', error);
  }
};

// Create reminder notification (24 hours before event)
export const createReminderNotification = async (event) => {
  try {
    console.log(`Creating reminders for event: ${event.title}`);

    const eventHistories = await EventHistory.find({ event: event._id })
      .populate('user', 'notificationSettings');

    for (const history of eventHistories) {
      const user = history.user;

      if (!user.notificationSettings?.eventReminders) {
        console.log(`User ${user._id} has reminders disabled`);
        continue;
      }

      const existingNotification = await Notification.findOne({
        user: user._id,
        event: event._id,
        type: 'reminder',
      });

      if (existingNotification) {
        console.log(`Reminder already exists for user ${user._id}`);
        continue;
      }

      await Notification.create({
        user: user._id,
        event: event._id,
        type: 'reminder',
        title: `Reminder: ${event.title}`,
        message: `Don't forget! ${event.title} is happening tomorrow at ${event.time} at ${event.location}`,
      });

      console.log(`✓ Created reminder for user ${user._id}`);
    }
  } catch (error) {
    console.error('Error creating reminder notifications:', error);
  }
};

// Create event update notification (when admin edits event)
export const createEventUpdateNotification = async (event, changes) => {
  try {
    console.log(`Creating update notifications for event: ${event.title}`);

    const eventHistories = await EventHistory.find({ event: event._id });

    let changeMessage = 'The event has been updated. ';
    if (changes.title) changeMessage += `New title: ${changes.title}. `;
    if (changes.date) changeMessage += `New date: ${new Date(changes.date).toLocaleDateString()}. `;
    if (changes.time) changeMessage += `New time: ${changes.time}. `;
    if (changes.location) changeMessage += `New location: ${changes.location}. `;
    if (changes.maxAttendees) changeMessage += `New max attendees: ${changes.maxAttendees}. `;
    if (changes.registrationDeadline) changeMessage += `New registration deadline: ${new Date(changes.registrationDeadline).toLocaleDateString()}. `;

    for (const history of eventHistories) {
      await Notification.create({
        user: history.user,
        event: event._id,
        type: 'event_updated',
        title: `Event Updated: ${event.title}`,
        message: changeMessage,
        metadata: { changes },
      });

      console.log(`✓ Created update notification for user ${history.user}`);
    }
  } catch (error) {
    console.error('Error creating update notifications:', error);
  }
};
// Create event cancellation notification (when admin deletes event)
export const createEventCancelledNotification = async (event, userIds) => {
  try {
    console.log(`Creating cancellation notifications for event: ${event.title}`);

    for (const userId of userIds) {
      await Notification.create({
        user: userId,
        event: event._id,
        type: 'event_cancelled',
        title: `Event Cancelled: ${event.title}`,
        message: `The event "${event.title}" scheduled for ${new Date(event.date).toLocaleDateString()} at ${event.time} has been cancelled by an admin.`,
      });

      console.log(`✓ Created cancellation notification for user ${userId}`);
    }
  } catch (error) {
    console.error('Error creating cancellation notifications:', error);
  }
};