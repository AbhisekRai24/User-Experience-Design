import User from '../models/User.js';
import { generateAccessToken, generateRefreshToken, verifyRefreshToken } from '../utils/jwt.js';

export const signup = async (req, res) => {
  try {
    console.log('Signup request body:', req.body); // debug

    const { username, email, fullName, password } = req.body;

    const existingUser = await User.findOne({
      $or: [{ email }, { username }],
    });

    if (existingUser) {
      console.log('Signup failed: User already exists'); // debug
      return res.status(400).json({ message: 'User already exists' });
    }

    const user = new User({ username, email, fullName, password });
    await user.save();
    console.log('User created:', user); // debug

    const payload = { userId: user._id, email: user.email, role: user.role };
    const accessToken = generateAccessToken(payload);
    const refreshToken = generateRefreshToken(payload);

    res.status(201).json({
      message: 'User created successfully',
      accessToken,
      refreshToken,
      user: {
        id: user._id,
        username: user.username,
        fullName: user.fullName,
        email: user.email,
        profileImage: user.profileImage,
        role: user.role,
      },
    });
  } catch (error) {
    console.error('Signup error:', error); // debug
    res.status(500).json({ message: error.message });
  }
};

export const login = async (req, res) => {
  try {
    console.log('Login request body:', req.body); // debug

    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      console.log('Login failed: User not found'); // debug
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      console.log('Login failed: Incorrect password'); // debug
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const payload = { userId: user._id, email: user.email, role: user.role };
    const accessToken = generateAccessToken(payload);
    const refreshToken = generateRefreshToken(payload);

    console.log('Login successful for user:', user.email); // debug

    res.json({
      message: 'Login successful',
      accessToken,
      refreshToken,
      user: {
        id: user._id,
        username: user.username,
        fullName: user.fullName,
        email: user.email,
        profileImage: user.profileImage,
        role: user.role,
      },
    });
  } catch (error) {
    console.error('Login error:', error); // debug
    res.status(500).json({ message: error.message });
  }
};

export const refresh = async (req, res) => {
  try {
    console.log('Refresh token request body:', req.body); // debug

    const { refreshToken } = req.body;

    if (!refreshToken) {
      console.log('Refresh failed: No token provided'); // debug
      return res.status(401).json({ message: 'Refresh token required' });
    }

    const decoded = verifyRefreshToken(refreshToken);
    const user = await User.findById(decoded.userId).select('-password');

    if (!user) {
      console.log('Refresh failed: User not found'); // debug
      return res.status(401).json({ message: 'User not found' });
    }

    const payload = { userId: user._id, email: user.email, role: user.role };
    const newAccessToken = generateAccessToken(payload);

    console.log('Refresh token successful for user:', user.email); // debug

    res.json({
      accessToken: newAccessToken,
      user: {
        id: user._id,
        username: user.username,
        fullName: user.fullName,
        email: user.email,
        profileImage: user.profileImage,
        role: user.role,
      },
    });
  } catch (error) {
    console.error('Refresh token error:', error); // debug
    res.status(401).json({ message: 'Invalid refresh token' });
  }
};
