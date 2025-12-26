import Event from '../models/Event.js';
import EventHistory from '../models/EventHistory.js';
import { createEventUpdateNotification, createEventCancelledNotification } from './notificationController.js';

export const getEvents = async (req, res) => {
  try {
    const { category } = req.query;
    const filter = category && category !== 'All Events' ? { category } : {};

    const events = await Event.find(filter)
      .populate('createdBy', 'username fullName')
      .sort({ createdAt: -1 });

    res.json(events);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const searchEvents = async (req, res) => {
  console.log('\n=== SEARCH EVENTS REQUEST ===');
  console.log('Query params:', req.query);
  console.log('Search query:', req.query.query);
  console.log('========================\n');

  try {
    const { query } = req.query;

    if (!query || query.trim() === '') {
      console.log('Empty query, returning empty array');
      return res.json([]);
    }

    console.log('Searching for:', query);

    const events = await Event.find({
      $or: [
        { title: { $regex: query, $options: 'i' } },
        { description: { $regex: query, $options: 'i' } },
        { location: { $regex: query, $options: 'i' } },
        { category: { $regex: query, $options: 'i' } }
      ]
    })
      .populate('createdBy', 'username fullName')
      .sort({ createdAt: -1 })
      .limit(20);

    console.log('Found events:', events.length);
    console.log('Events:', events);

    res.json(events);
  } catch (error) {
    console.error('\n❌ SEARCH ERROR:');
    console.error('Message:', error.message);
    console.error('Stack:', error.stack);
    console.error('========================\n');

    res.status(500).json({ message: error.message });
  }
};

export const getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id)
      .populate('createdBy', 'username fullName');

    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    res.json(event);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createEvent = async (req, res) => {
  console.log('\n=== CREATE EVENT REQUEST ===');
  console.log('Time:', new Date().toISOString());
  console.log('User:', req.user);
  console.log('File:', req.file);
  console.log('Body:', req.body);
  console.log('========================\n');

  try {
    if (!req.user) {
      console.log('❌ Authentication failed - no user');
      return res.status(401).json({ message: 'Authentication required' });
    }

    const {
      title,
      description,
      category,
      location,
      date,
      time,
      maxAttendees,
      registrationDeadline
    } = req.body;

    const image = req.file?.path;

    if (!image) {
      console.log('❌ No image uploaded');
      return res.status(400).json({ message: 'Event image is required' });
    }

    // Validate new fields
    if (!maxAttendees || maxAttendees < 1) {
      return res.status(400).json({ message: 'Maximum attendees must be at least 1' });
    }

    if (!registrationDeadline) {
      return res.status(400).json({ message: 'Registration deadline is required' });
    }

    // Validate deadline is before event date
    const eventDate = new Date(date);
    const deadline = new Date(registrationDeadline);

    if (deadline > eventDate) {
      return res.status(400).json({
        message: 'Registration deadline must be before or on the event date'
      });
    }

    console.log('✓ Creating event with data:', {
      title,
      description,
      category,
      location,
      date,
      time,
      image,
      maxAttendees,
      registrationDeadline,
      currentAttendees: 0
    });

    const event = new Event({
      title,
      description,
      category,
      image,
      location,
      date,
      time,
      maxAttendees: parseInt(maxAttendees),
      currentAttendees: 0,
      registrationDeadline,
      createdBy: req.user._id,
    });

    await event.save();
    await event.populate('createdBy', 'username fullName');

    console.log('✓ Event created successfully');
    res.status(201).json(event);
  } catch (error) {
    console.error('\n❌ CREATE EVENT ERROR:');
    console.error('Message:', error.message);
    console.error('Stack:', error.stack);
    console.error('========================\n');

    res.status(500).json({ message: error.message });
  }
};
export const updateEvent = async (req, res) => {
  try {
    const {
      title,
      description,
      category,
      location,
      date,
      time,
      maxAttendees,
      registrationDeadline
    } = req.body;

    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    // Validate if updating maxAttendees
    if (maxAttendees && parseInt(maxAttendees) < event.currentAttendees) {
      return res.status(400).json({
        message: `Cannot reduce max attendees below current registrations (${event.currentAttendees})`
      });
    }

    // Validate deadline if provided
    if (registrationDeadline) {
      const eventDate = new Date(date || event.date);
      const deadline = new Date(registrationDeadline);

      if (deadline > eventDate) {
        return res.status(400).json({
          message: 'Registration deadline must be before or on the event date'
        });
      }
    }

    // Track what changed - INCLUDING NEW FIELDS
    const changes = {};
    if (title && title !== event.title) changes.title = title;
    if (date && date !== event.date.toISOString()) changes.date = date;
    if (time && time !== event.time) changes.time = time;
    if (location && location !== event.location) changes.location = location;

    // ADD THESE TWO LINES:
    if (maxAttendees && parseInt(maxAttendees) !== event.maxAttendees) changes.maxAttendees = maxAttendees;
    if (registrationDeadline && new Date(registrationDeadline).getTime() !== new Date(event.registrationDeadline).getTime()) changes.registrationDeadline = registrationDeadline;

    // Update event
    if (req.file) {
      event.image = req.file.path;
    }

    event.title = title || event.title;
    event.description = description || event.description;
    event.category = category || event.category;
    event.location = location || event.location;
    event.date = date || event.date;
    event.time = time || event.time;
    event.maxAttendees = maxAttendees ? parseInt(maxAttendees) : event.maxAttendees;
    event.registrationDeadline = registrationDeadline || event.registrationDeadline;

    await event.save();
    await event.populate('createdBy', 'username fullName');

    // Send notifications to users who joined this event
    if (Object.keys(changes).length > 0) {
      await createEventUpdateNotification(event, changes);
      console.log('✓ Update notifications sent');
    }

    res.json(event);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const deleteEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    // Get all users who joined this event before deleting
    const eventHistories = await EventHistory.find({ event: event._id });
    const userIds = eventHistories.map(h => h.user);

    // Send cancellation notifications
    await createEventCancelledNotification(event, userIds);

    // Delete event history and event
    await EventHistory.deleteMany({ event: event._id });
    await Event.findByIdAndDelete(req.params.id);

    console.log('✓ Cancellation notifications sent');
    res.json({ message: 'Event deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all volunteers for a specific event
export const getEventVolunteers = async (req, res) => {
  try {
    const eventId = req.params.id;

    // Find all users who joined this event
    const eventHistories = await EventHistory.find({ event: eventId })
      .populate('user', 'username fullName email phoneNumber profileImage')
      .sort({ createdAt: -1 }); // Most recent first

    const volunteers = eventHistories.map(history => ({
      id: history.user._id,
      username: history.user.username,
      fullName: history.user.fullName,
      email: history.user.email,
      phone: history.user.phoneNumber || 'N/A',
      profileImage: history.user.profileImage,
      joinedAt: history.createdAt, // corrected field

      attendees: history.registrationDetails.attendees,
      donation: history.registrationDetails.donation,
      status: history.status


    }));

    res.json({
      event: eventId,
      totalVolunteers: volunteers.length,
      volunteers
    });
  } catch (error) {
    console.error('Get volunteers error:', error);
    res.status(500).json({ message: error.message });
  }
};
