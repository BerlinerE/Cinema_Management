const express = require('express');
const router = express.Router();
const { getAllSubscription ,fetchSubscriptionsForMovie, createSubscription, getMoviesByUserId,deleteSubscriptionsForMember} = require('../BLL/subscriptionBLL');

// GET all subscruptions
router.get('/', async (req, res) => {
    try {
      const subscriptions = await getAllSubscription();
      res.json(subscriptions);
    } catch (error) {
      console.error('Error fetching subscriptions:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  // GET subscriptions for a specific movie
router.get('/:movieId', async (req, res) => {
  const { movieId } = req.params;
  try {
    const subscriptions = await fetchSubscriptionsForMovie(movieId);
    res.json(subscriptions);
  } catch (error) {
    console.error('Error fetching subscriptions for movie:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// POST - Create a new subscription (add a member to a new movie)
router.post('/', async (req, res) => {
  try {
      const newSubscription = await createSubscription(req.body);
      res.status(201).json(newSubscription);
  } catch (error) {
      console.error('Error creating a subscription:', error);
      res.status(500).json({ error: 'Internal server error' });
  }
});


// GET request to fetch movies watched by a user
router.get('/member/:memberId', async (req, res) => {
  try {
    const memberId = req.params.memberId; 
    const movies = await getMoviesByUserId(memberId);
    res.status(200).json({ movies });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// DELETE subscriptions for a specific member
router.delete('/:memberId', async (req, res) => {
  const { memberId } = req.params;
  try {
    await deleteSubscriptionsForMember(memberId);
    res.status(204).end();
  } catch (error) {
    console.error('Error deleting subscriptions for member:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;

