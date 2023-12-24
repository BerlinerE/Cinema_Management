const express = require('express');
const router = express.Router();
const { getAllUsers, getUserById, deleteUserById, getUserPermissionsById, getAllUserPermissions, editUser, editUserPermissions, createUser, createPermissions, getUserTimeoutSession,updateTimeoutSession } = require('../BLL/userBLL');

// GET all users
router.get('/', async (req, res) => {
    try {
      const users = await getAllUsers();
      res.json(users);
    } catch (error) {
      console.error('Error fetching users:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  
  // GET user by ID
  router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
          const user = await getUserById(id);
          if (!user) {
            return res.status(404).json({ error: 'User not found' });
          }
          res.json(user);
        } catch (error) {
          console.error('Error fetching user by ID:', error);
          res.status(500).json({ error: 'Internal server error' });
        }
      });
      
  // DELETE user by ID
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
      const user = await getUserById(id);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
        await deleteUserById(id);
  
      res.json({ message: 'User deleted successfully' });
    } catch (error) {
      console.error('Error deleting user:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  
  // Route to get user permissions by user ID
router.get('/:userId/permissions', async (req, res) => {

    try {
      const { userId } = req.params;
      const userPermissions = await getUserPermissionsById(userId);
      res.json({ permissions: userPermissions });
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  // Route to get all user permissions
router.get('/permissions', async (req, res) => {
    try {
      const allUserPermissions = await getAllUserPermissions();
      res.json({ permissions: allUserPermissions });
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  
  // Route to update user information and permissions by ID
  router.put('/:userId', async (req, res) => {
    try {
      const { userId } = req.params;
      const { updatedUserData, updatedPermissions } = req.body;
      let response;
  
      // Check if updatedUserData is provided and update user information
      if (updatedUserData) {
        const updatedUser = await editUser(userId, updatedUserData);
        response = { updatedUser };
      }
  
      // Check if updatedPermissions is provided and update user permissions
      if (updatedPermissions) {
        const updatedUserPermissions = await editUserPermissions(userId, updatedPermissions);
        response = { updatedUserPermissions };
      }
  
      // If neither condition is met, handle invalid request with missing data
      if (!updatedUserData && !updatedPermissions) {
        return res.status(400).json({ error: 'Invalid request, missing data.' });
      }
  
      return res.json(response);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
// Route to create user
router.post('/', async (req, res) => {
  try {
    const { permissionsData, userData } = req.body;

    // Call the createUser function to create the user
    const newUser = await createUser(userData);
    const userId = newUser._id.toString();

    // Call the createPermissions function to create or update permissions
    const createdPermissions = await createPermissions(userId, permissionsData);
    res.json({ message: 'User created successfully', user: newUser, permissions: createdPermissions, action: 'created' });
  } catch (error) {
    // Handle errors and send an error response
    console.error('Error creating user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET timeout session for a specific user
router.get('/timeout/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const timeoutInSeconds = await getUserTimeoutSession(userId);
    res.status(200).send({ timeout: timeoutInSeconds });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: 'Error in getting timeout session',
      error: error.message,
    });
  }
});

// PUT update timeout session for a specific user
router.put('/timeout/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const { updatedSeconds } = req.body;

    await updateTimeoutSession(userId, updatedSeconds);
    res.status(200).send('Timeout updated successfully.');
  } catch (error) {
    res.status(500).send({
      success: false,
      message: 'Error in updating timeout session',
      error: error.message,
    });
  }
});

module.exports = router;
  