import User from '../../models/User.js';

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password').sort({ createdAt: -1 });
    res.json(users);
  } catch (error) {
    console.error('Get all users error:', error);
    res.status(500).json({ message: error.message });
  }
};

export const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    console.error('Get user by ID error:', error);
    res.status(500).json({ message: error.message });
  }
};

export const createUser = async (req, res) => {
  try {
    const { username, email, fullName, password, role, gender } = req.body;

    const existingUser = await User.findOne({
      $or: [{ email }, { username }],
    });

    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const user = new User({
      username,
      email,
      fullName,
      password,
      role: role || 'USER',
      gender: gender || '',
    });

    await user.save();

    res.status(201).json({
      message: 'User created successfully',
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
    console.error('Create user error:', error);
    res.status(500).json({ message: error.message });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { username, email, fullName, role, gender, password } = req.body;

    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if email or username is being changed to one that already exists
    if (email !== user.email || username !== user.username) {
      const existingUser = await User.findOne({
        _id: { $ne: req.params.id },
        $or: [{ email }, { username }],
      });

      if (existingUser) {
        return res.status(400).json({ message: 'Email or username already taken' });
      }
    }

    user.username = username || user.username;
    user.email = email || user.email;
    user.fullName = fullName || user.fullName;
    user.role = role || user.role;
    user.gender = gender !== undefined ? gender : user.gender;

    // Only update password if provided
    if (password) {
      user.password = password;
    }

    await user.save();

    res.json({
      message: 'User updated successfully',
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
    console.error('Update user error:', error);
    res.status(500).json({ message: error.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Prevent deleting yourself
    if (user._id.toString() === req.user._id.toString()) {
      return res.status(400).json({ message: 'Cannot delete your own account' });
    }

    await User.findByIdAndDelete(req.params.id);

    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Delete user error:', error);
    res.status(500).json({ message: error.message });
  }
};