// import mongoose from 'mongoose';

// const eventSchema = new mongoose.Schema({
//   title: {
//     type: String,
//     required: true,
//     trim: true,
//   },
//   description: {
//     type: String,
//     required: true,
//   },
//   category: {
//     type: String,
//     enum: ['Nature', 'Promotional', 'Volunteer', 'All Events'],
//     required: true,
//   },
//   image: {
//     type: String,
//     required: true,
//   },
//   location: {
//     type: String,
//     required: true,
//   },
//   date: {
//     type: Date,
//     required: true,
//   },
//   time: {
//     type: String,
//     required: true,
//   },
//   attendees: {
//     type: Number,
//     default: 0,
//   },
//   createdBy: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'User',
//     required: true,
//   },

// }, {
//   timestamps: true,
// });

// const Event = mongoose.model('Event', eventSchema);
// export default Event;



import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
  },
  // category: {
  //   type: String,
  //   enum: ['Nature', 'Promotional', 'Volunteer', 'All Events'],
  //   required: true,
  // },
  category: {
    type: String,
    required: true,
    trim: true,
  },
  image: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  attendees: {
    type: Number,
    default: 0,
  },
  // ============ NEW FIELDS ============
  maxAttendees: {
    type: Number,
    required: true,
    default: 50,
    min: [1, 'Maximum attendees must be at least 1'],
  },
  currentAttendees: {
    type: Number,
    default: 0,
    min: [0, 'Current attendees cannot be negative'],
  },
  registrationDeadline: {
    type: Date,
    required: true,
    validate: {
      validator: function (deadline) {
        return deadline < this.date;
      },
      message: 'Registration deadline must be before the event date'
    }
  },
  // ====================================
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
}, {
  timestamps: true,
});

// Add index for efficient queries
eventSchema.index({ date: 1, registrationDeadline: 1 });

const Event = mongoose.model('Event', eventSchema);
export default Event;