import dotenv from 'dotenv';
import connectDB from './config/database.js';
import User from './models/User.js';

dotenv.config();

const seedAdmin = async () => {
  try {
    await connectDB();

    const adminExists = await User.findOne({ email: 'admin@gmail.com' });
    
    if (adminExists) {
      console.log('Admin user already exists');
      process.exit(0);
    }

    const admin = new User({
      username: 'admin',
      email: 'admin@gmail.com',
      fullName: 'Admin User',
      password: 'admin123',
      role: 'ADMIN',
    });

    await admin.save();
    console.log('Admin user created successfully');
    console.log('Email: admin@gmail.com');
    console.log('Password: admin');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding admin:', error);
    process.exit(1);
  }
};

seedAdmin();

