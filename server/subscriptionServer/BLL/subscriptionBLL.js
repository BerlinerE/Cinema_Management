
const Subscription = require('../models/Subscription');

const getAllSubscription = async () => {
  try {
    const subscriptionDB =  await Subscription.find({})
    .populate("MemberId")
    .populate("Movies.movieId");
    return subscriptionDB;
  } catch (error) {
    throw error;
  }
};

const fetchSubscriptionsForMovie = async (movieId) => {
  try {
    const subscriptions = await Subscription.find({ 'Movies.movieId': movieId }).populate('MemberId');
    return subscriptions;
  } catch (error) {
    throw error; 
  }
};

const createSubscription = async (subscriptionData) => {
  try {
    const { memberId, movieId, date } = subscriptionData;
    const existingMember = await Subscription.findOne({ 'MemberId': memberId  });

    if (existingMember) {
      const existingMovieIds = existingMember.Movies.map((movie) => String(movie.movieId));
      existingMember.Movies.push({ movieId, date });

      const updatedSubscription = await existingMember.save();
      return updatedSubscription;
    } else {
      const newSubscription = new Subscription({
        MemberId: memberId, 
        Movies: [{ movieId, date }], 
      });
      const savedSubscription = await newSubscription.save();
      return savedSubscription;
    }
  } catch (error) {
      throw error;
  }
};

const getMoviesByUserId = async (memberId) => {
  try {
    const subscriptions = await Subscription.find({ MemberId: memberId }).populate('Movies.movieId');

    const movies = subscriptions.map((subscription) => subscription.Movies.map((movie) => movie.movieId));
    return movies.flat(); 
  } catch (error) {
    throw error;
  }
};

const deleteSubscriptionsForMember = async (memberId) => {
  try {
    await Subscription.deleteMany({ MemberId: memberId });
  } catch (error) {
    throw error;
  }
};

const removeMovieFromMembers = async (movieId) => {
  try {
    const subscriptions = await getAllSubscription();

    for (const subscription of subscriptions) {
      const { MemberId, Movies } = subscription;

      const updatedMovies = Movies.filter((movie) => String(movie.movieId._id) !== movieId);

      if (updatedMovies.length > 0) {
        await Subscription.updateOne({ MemberId }, { Movies: updatedMovies });
      } else {
        await Subscription.deleteOne({ MemberId });
      }
    }
  } catch (error) {
    throw error;
  }
};

module.exports = { getAllSubscription , fetchSubscriptionsForMovie, createSubscription, getMoviesByUserId, deleteSubscriptionsForMember, removeMovieFromMembers}

