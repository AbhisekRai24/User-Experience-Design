import jwt from 'jsonwebtoken';

// Generate Access Token
export const generateAccessToken = (payload) => {
  if (!process.env.ACCESS_TOKEN_SECRET) {
    throw new Error('ACCESS_TOKEN_SECRET is not defined in .env');
  }
  return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15m' });
};

// Generate Refresh Token
export const generateRefreshToken = (payload) => {
  if (!process.env.REFRESH_TOKEN_SECRET) {
    throw new Error('REFRESH_TOKEN_SECRET is not defined in .env');
  }
  return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '7d' });
};

// Verify Access Token
export const verifyAccessToken = (token) => {
  if (!process.env.ACCESS_TOKEN_SECRET) {
    throw new Error('ACCESS_TOKEN_SECRET is not defined in .env');
  }
  return jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
};

// Verify Refresh Token
export const verifyRefreshToken = (token) => {
  if (!process.env.REFRESH_TOKEN_SECRET) {
    throw new Error('REFRESH_TOKEN_SECRET is not defined in .env');
  }
  return jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
};
