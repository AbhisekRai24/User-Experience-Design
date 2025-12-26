// import mongoose from 'mongoose';

// const eventHistorySchema = new mongoose.Schema({
//   user: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'User',
//     required: true,
//   },
//   event: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'Event',
//     required: true,
//   },

// }, {
//   timestamps: true,
// });

// eventHistorySchema.index({ user: 1, event: 1 }, { unique: true });

// const EventHistory = mongoose.model('EventHistory', eventHistorySchema);
// export default EventHistory;

import mongoose from 'mongoose';

const eventHistorySchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  event: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Event',
    required: true,
  },
  registrationDetails: {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      default: '',
    },
    attendees: {
      type: Number,
      default: 1,
      min: 1,
      max: 10,
    },
    donation: {
      cash: {
        type: String,
        default: '',
      },
      items: {
        type: String,
        default: '',
      },
    },
  },
}, {
  timestamps: true,
});

eventHistorySchema.index({ user: 1, event: 1 }, { unique: true });

const EventHistory = mongoose.model('EventHistory', eventHistorySchema);
export default EventHistory;