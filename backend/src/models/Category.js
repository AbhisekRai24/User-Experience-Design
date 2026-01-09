
import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  color: {
    type: String,
    default: '#1AA928', // default green color
  },
  icon: {
    type: String,
    default: '📋', // default emoji icon
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  eventCount: {
    type: Number,
    default: 0,
  }
}, {
  timestamps: true,
});

// Index for efficient queries
categorySchema.index({ name: 1 });
categorySchema.index({ isActive: 1 });

const Category = mongoose.model('Category', categorySchema);
export default Category;