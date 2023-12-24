const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    UserName: {
      type: String,
      required: true,
    },
    Password: {
      type: String,
      required: true,
    },
    FirstName: {
      type: String,
      required: true,
    },
    LastName: {
      type: String,
      required: true,
    },
    SessionTimeOut: {
      type: Number,
      default: 10,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("user", userSchema, 'users');
module.exports = User;
