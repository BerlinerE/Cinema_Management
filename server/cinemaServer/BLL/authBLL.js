const User = require('../models/User');
const { readJsonFile, writeJsonFile } = require('../DAL/ActionFiles'); 
usersFilePath = '/Users/berliner/Desktop/Projects/final_cinema/server/cinemaServer/Users.json';

const authenticateUser = async (username, password) => {
  try {
    // Check if a user with the given username and password exists in the database
    const existingUser = await User.findOne({ UserName: username, Password: password });
    if (existingUser) {
      // Update the session timeout in the JSON file
      let usersData = await readJsonFile(usersFilePath);
      let userRecord = usersData.users.find((entry) => entry._id === existingUser._id.toString());

      if (userRecord) {
        if (userRecord.SessionTimeOut !== existingUser.SessionTimeOut) {
          userRecord.SessionTimeOut = existingUser.SessionTimeOut
          console.log('Session timeouts are different!');
        }
        await writeJsonFile(usersFilePath, usersData);
      }
      // User with provided credentials exists
      return { success: true, user: existingUser, message: 'Existing User' };
    } else {
      // Check if a user with the given username exists (without considering the password)
      const userWithUsername = await User.findOne({ UserName: username });

      if (userWithUsername) {
        // User with the provided username exists
        return { success: false, message: 'Username already exists' };
      } else {
        // User does not exist, create a new user
        return { success: true, message: 'New User' };
      }
    }
  } catch (error) {
    console.error('Error:', error);
    return { success: false, error: 'Internal server error' };
  }
};

module.exports = {
  authenticateUser
};