const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,  // Ensure this is set to true
    unique: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  fullName: { // Add this field
    type: String,
  },
  phone: { // Add this field
    type: String,
  },
  address: { // Add this field
    type: String,
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
