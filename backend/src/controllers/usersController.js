import User from '../models/User.js';
import cloudinary from '../config/cloudinary.js';

// Get user profile
export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select('-password');
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({
      id: user._id,
      username: user.username,
      fullName: user.fullName,
      email: user.email,
      profileImage: user.profileImage,
      role: user.role,
      gender: user.gender,
      createdAt: user.createdAt,
    });
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({ message: error.message });
  }
};

// Update user profile
export const updateProfile = async (req, res) => {
  try {
    const { fullName, username, gender } = req.body;
    const userId = req.user.userId;

    console.log('Update profile request:', { fullName, username, gender, hasFile: !!req.file });

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if username is taken by another user
    if (username && username !== user.username) {
      const existingUser = await User.findOne({ username, _id: { $ne: userId } });
      if (existingUser) {
        return res.status(400).json({ message: 'Username already taken' });
      }
      user.username = username;
    }

    // Handle profile image upload
    if (req.file) {
      console.log('New image uploaded:', req.file.path);
      
      // Delete old image from cloudinary if it's not the default
      if (user.profileImage && !user.profileImage.includes('ui-avatars.com')) {
        try {
          // Extract public_id from Cloudinary URL
          const urlParts = user.profileImage.split('/');
          const filename = urlParts[urlParts.length - 1];
          const publicId = `localspace/profiles/${filename.split('.')[0]}`;
          
          console.log('Deleting old image:', publicId);
          await cloudinary.uploader.destroy(publicId);
        } catch (err) {
          console.log('Error deleting old image:', err.message);
          // Continue even if deletion fails
        }
      }
      
      user.profileImage = req.file.path;
    }

    // Update other fields
    if (fullName) user.fullName = fullName;
    if (gender !== undefined) user.gender = gender;

    await user.save();

    console.log('Profile updated successfully for user:', user.username);

    res.json({
      message: 'Profile updated successfully',
      user: {
        id: user._id,
        username: user.username,
        fullName: user.fullName,
        email: user.email,
        profileImage: user.profileImage,
        role: user.role,
        gender: user.gender,
      },
    });
  } catch (error) {
    console.error('Update profile error:', error);
    
    // Clean up uploaded file if there was an error
    if (req.file && req.file.path) {
      try {
        const urlParts = req.file.path.split('/');
        const filename = urlParts[urlParts.length - 1];
        const publicId = `localspace/profiles/${filename.split('.')[0]}`;
        await cloudinary.uploader.destroy(publicId);
      } catch (cleanupErr) {
        console.log('Error cleaning up uploaded file:', cleanupErr.message);
      }
    }
    
    res.status(500).json({ message: error.message });
  }
};

// Get user by ID (for public profiles, leaderboard, etc.)
export const getUserById = async (req, res) => {
  try {
    const { userId } = req.params;
    
    const user = await User.findById(userId).select('-password -notificationSettings');
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({
      id: user._id,
      username: user.username,
      fullName: user.fullName,
      profileImage: user.profileImage,
      role: user.role,
    });
  } catch (error) {
    console.error('Get user by ID error:', error);
    res.status(500).json({ message: error.message });
  }
};