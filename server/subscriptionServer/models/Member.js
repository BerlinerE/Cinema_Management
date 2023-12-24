const mongoose = require('mongoose');

const memberSchema = new mongoose.Schema(
    {
        Name: {
          type: String,
          required: true,
        },
        Email: {
          type: String,
          required: true,
        },
        City: {
          type: String,
          required: true,
        },
      },
      { timestamps: true }

);

const Member = mongoose.model('member', memberSchema, 'members');

module.exports = Member;

