import { verifyAccessToken } from '../utils/jwt.js';
import User from '../models/User.js';

// export const authenticate = async (req, res, next) => {
//   try {
//     const token = req.headers.authorization?.split(' ')[1];

//     if (!token) {
//       return res.status(401).json({ message: 'No token provided' });
//     }

//     const decoded = verifyAccessToken(token);
//     const user = await User.findById(decoded.userId).select('-password');

//     if (!user) {
//       return res.status(401).json({ message: 'User not found' });
//     }

//     req.user = user;
//     next();
//   } catch (error) {
//     return res.status(401).json({ message: 'Invalid token' });
//   }
// };

export const authenticate = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      console.log('❌ No token provided');
      return res.status(401).json({ message: 'No token provided' });
    }

    console.log('🔍 Token received, verifying...');
    const decoded = verifyAccessToken(token);
    console.log('✅ Token decoded:', decoded);

    const user = await User.findById(decoded.userId).select('-password');

    if (!user) {
      console.log('❌ User not found in database');
      return res.status(401).json({ message: 'User not found' });
    }

    console.log('✅ User found:', user.username);

    // ✅ IMPORTANT: Set BOTH formats for compatibility
    // Full user object for wishlist/notification controllers
    req.user = user;

    // Also add userId separately for userController compatibility
    req.user.userId = user._id.toString();

    console.log('✅ req.user set with full object');
    next();
  } catch (error) {
    console.error('❌ Auth error:', error.message);
    return res.status(401).json({ message: 'Invalid token' });
  }
};

export const isAdmin = (req, res, next) => {
  if (req.user.role !== 'ADMIN') {
    return res.status(403).json({ message: 'Admin access required' });
  }
  next();
};

