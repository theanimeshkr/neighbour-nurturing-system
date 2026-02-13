const mongoose = require('mongoose');

const resourceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a resource name'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Please add a description']
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  ownerName: String,
  category: {
    type: String,
    enum: ['Tool', 'Book', 'Service', 'Other'],
    default: 'Other'
  },
  availability: {
    type: String,
    enum: ['Available', 'In Use', 'Unavailable'],
    default: 'Available'
  },
  imageUrl: String,
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Resource', resourceSchema);
