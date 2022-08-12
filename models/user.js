const { Schema, model } = require('mongoose')

const UserSchema = Schema({
  first_name: {
    type: String,
    required: [true, 'First name is required'],
  },
  last_name: {
    type: String,
    required: [true, 'Last name is required'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
  },
  identity_card: {
    type: String,
    required: [true, 'Identity card is required'],
  },
  role: {
    type: String,
    required: [true, 'Role is required'],
    enum: ['ADMIN', 'USER'],
  },
  status: {
    type: Boolean,
    default: true,
  },
  google: {
    type: Boolean,
    default: false,
  },
  img: {
    type: String,
  },
})

module.exports = model('User', UserSchema)
