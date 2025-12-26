// import mongoose from 'mongoose';
// import bcrypt from 'bcrypt';

// const userSchema = new mongoose.Schema({
//   username: {
//     type: String,
//     required: true,
//     unique: true,
//     trim: true,
//     minlength: 3,
//     maxlength: 30,
//   },
//   email: {
//     type: String,
//     required: true,
//     unique: true,
//     trim: true,
//     lowercase: true,
//   },
//   fullName: {
//     type: String,
//     required: true,
//     trim: true,
//   },
//   password: {
//     type: String,
//     required: true,
//     minlength: 6,
//   },
//   profileImage: {
//     type: String,
//     default: 'https://ui-avatars.com/api/?name=User&background=random',
//   },
//   role: {
//     type: String,
//     enum: ['USER', 'ADMIN'],
//     default: 'USER',
//   },
//   gender: {
//     type: String,
//     required: false,

//   },
//   gender: {
//     type: String,
//     enum: ['Male', 'Female', 'Other'],
//     default: '',
//     required: false, // optional
//   }

// }, {
//   timestamps: true,
// });

// userSchema.pre('save', async function (next) {
//   if (!this.isModified('password')) return next();
//   this.password = await bcrypt.hash(this.password, 10);
//   next();
// });

// userSchema.methods.comparePassword = async function (candidatePassword) {
//   return await bcrypt.compare(candidatePassword, this.password);
// };

// const User = mongoose.model('User', userSchema);
// export default User;
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3,
    maxlength: 30,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  fullName: {
    type: String,
    required: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  profileImage: {
    type: String,
    default: 'https://ui-avatars.com/api/?name=User&background=random',
  },
  role: {
    type: String,
    enum: ['USER', 'ADMIN'],
    default: 'USER',
  },
  gender: {
    type: String,
    enum: ['male', 'female', 'other'],

    default: '',
    required: false,
  },
  // Notification settings
  notificationSettings: {
    eventReminders: {
      type: Boolean,
      default: true,
    },
  },
  // NEW: Wishlist field - User-specific favorite events
  wishlist: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Event'
  }],
}, {
  timestamps: true,
});

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.model('User', userSchema);
export default User;