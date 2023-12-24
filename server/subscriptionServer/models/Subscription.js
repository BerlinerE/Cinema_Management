const mongoose = require('mongoose');
const Member = require('../models/Member'); 
const Movie = require('./Movie')
const subscriptionSchema = new mongoose.Schema(
    {
        MemberId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: Member,
        },
        Movies: [
          {
            movieId: {
              type: mongoose.Schema.Types.ObjectId,
              ref: Movie,
            },
            date: {
              type: Date,
            },
          },
        ],
      },
      { timestamps: true }
);

const Subscription = mongoose.model('Subscription', subscriptionSchema, 'subscriptions');

module.exports = Subscription;