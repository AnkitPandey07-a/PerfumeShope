const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  images: [{
    type: String
  }],
  sizes: [{
    type: String
  }]
}, {
  timestamps: true
});

module.exports = mongoose.model('Product', productSchema);