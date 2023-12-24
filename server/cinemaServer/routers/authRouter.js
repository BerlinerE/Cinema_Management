const express = require('express');
const userBLL = require('../BLL/userBLL'); // Import the userBLL module
const authBLL = require('../BLL/authBLL');
const router = express.Router();

router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const result = await authBLL.authenticateUser(username, password);

    if (result.success && result.message === 'Existing User') {
      res.json({ message: 'Logged in successfully', user: result.user });
    } else {
      res.status(401).json({ error: 'Authentication failed' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.post('/register', async (req, res) => {
  try {
    const { username, password, firstName, lastName } = req.body;
    const result = await authBLL.authenticateUser(username, password);

    if (result.success && result.message === 'New User') {
      const newUser = await userBLL.createUser({
        UserName: username,
        Password: password,
        FirstName: firstName,
        LastName: lastName,
        SessionTimeOut: 15, 
        isAdmin: false,
      });

      const permissions = await userBLL.createDefaultPermissions(newUser._id.toString());

      res.json({ message: 'User registered successfully', user: newUser, permissions, action: 'registered' });
    } else if (!result.success && result.message === 'Username already exists') {
      res.json({ message: result.message });
    } else if (result.success && result.message === 'Existing User') {
      res.json({ message: result.message });
    } else {
      res.status(500).json({ error: 'Internal server error' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});



module.exports = router;
