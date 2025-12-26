import User from '../models/User.js';
import Event from '../models/Event.js';

// Add event to wishlist
export const addToWishlist = async (req, res) => {
    try {
        const userId = req.user._id;
        const { eventId } = req.params;

        // Check if event exists
        const event = await Event.findById(eventId);
        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }

        // Find user and update wishlist
        const user = await User.findById(userId);

        // Check if already in wishlist
        if (user.wishlist.includes(eventId)) {
            return res.status(400).json({ message: 'Event already in wishlist' });
        }

        user.wishlist.push(eventId);
        await user.save();

        res.json({
            message: 'Event added to wishlist',
            wishlist: user.wishlist
        });
    } catch (error) {
        console.error('Add to wishlist error:', error);
        res.status(500).json({ message: error.message });
    }
};

// Remove event from wishlist
export const removeFromWishlist = async (req, res) => {
    try {
        const userId = req.user._id;
        const { eventId } = req.params;

        const user = await User.findById(userId);

        // Remove event from wishlist
        user.wishlist = user.wishlist.filter(
            id => id.toString() !== eventId.toString()
        );

        await user.save();

        res.json({
            message: 'Event removed from wishlist',
            wishlist: user.wishlist
        });
    } catch (error) {
        console.error('Remove from wishlist error:', error);
        res.status(500).json({ message: error.message });
    }
};

// Get user's wishlist with full event details
export const getWishlist = async (req, res) => {
    try {
        const userId = req.user._id;

        const user = await User.findById(userId).populate({
            path: 'wishlist',
            populate: {
                path: 'createdBy',
                select: 'username fullName'
            }
        });

        res.json(user.wishlist);
    } catch (error) {
        console.error('Get wishlist error:', error);
        res.status(500).json({ message: error.message });
    }
};

// Check if event is in wishlist
export const checkWishlist = async (req, res) => {
    try {
        const userId = req.user._id;
        const { eventId } = req.params;

        const user = await User.findById(userId);
        const isInWishlist = user.wishlist.includes(eventId);

        res.json({ isInWishlist });
    } catch (error) {
        console.error('Check wishlist error:', error);
        res.status(500).json({ message: error.message });
    }
};