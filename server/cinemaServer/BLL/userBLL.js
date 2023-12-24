
const User = require('../models/User');
const { readJsonFile, writeJsonFile } = require('../DAL/ActionFiles'); 
const fs = require('fs/promises'); 
const PermissionsfilePath = '/Users/berliner/Desktop/Projects/final_cinema/server/cinemaServer/Permissions.json';
const UsersfilePath = '/Users/berliner/Desktop/Projects/final_cinema/server/cinemaServer/Users.json';


// GET - Get all - Read
const getAllUsers = async () => { 

    const usersDB =  User.find({});
    return await usersDB;
  };

// GET - Get By ID - Read
const getUserById = (id) => {
    return User.findById({ _id: id });
  };

// BLL Function to Create a New User
const createUser = async (userData) => {
  try {
    const newUser = new User(userData);
    await newUser.save(); 

    const userId = newUser._id.toString();

    // Prepare user data for writing
    const userDataToWrite = {
      _id: userId,
      UserName: newUser.UserName,
      FirstName: newUser.FirstName,
      LastName: newUser.LastName,
      SessionTimeOut: newUser.SessionTimeOut,
      createdAt: newUser.createdAt,
    };

    // Read and update user data
    const existingUsersData = await readJsonFile(UsersfilePath); // Updated file path
    existingUsersData.users.push(userDataToWrite);

    // Write user data back to the users.json file
    await writeJsonFile(UsersfilePath, existingUsersData); // Updated file path

    return newUser;
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
};

const createDefaultPermissions = async (userId) => {
  try {
    const permissionsData = {
      id: userId,
      permissions: [
        {
          name: 'View Subscriptions',
          checked: false,
        },
        {
          name: 'Create Subscriptions',
          checked: false,
        },
        {
          name: 'Delete Subscriptions',
          checked: false,
        },
        {
          name: 'Update Subscriptions',
          checked: false,
        },
        {
          name: 'View Movies',
          checked: false,
        },
        {
          name: 'Create Movies',
          checked: false,
        },
        {
          name: 'Delete Movies',
          checked: false,
        },
        {
          name: 'Update Movies',
          checked: false,
        },
      ],
    };

    // Read and update permissions data
    const existingPermissionsData = await readJsonFile(PermissionsfilePath); // Updated file path
    const existingUserIndex = existingPermissionsData.usersPermissions.findIndex(
      (userPermissions) => userPermissions.id === userId
    );

    if (existingUserIndex === -1) {
      existingPermissionsData.usersPermissions.push(permissionsData);
    } else {
      existingPermissionsData.usersPermissions[existingUserIndex].permissions = [
        ...existingPermissionsData.usersPermissions[existingUserIndex].permissions,
        ...permissionsData.permissions,
      ];
    }

    // Write permissions data back to the JSON file
    await writeJsonFile(PermissionsfilePath, existingPermissionsData); // Updated file path

    return permissionsData;
  } catch (error) {
    console.error('Error creating permissions:', error);
    throw error;
  }
};


const createPermissions = async (userId, permissionData) => {
  try {
    // Read existing permissions data
    const existingPermissionsData = await readJsonFile(PermissionsfilePath); // Updated file path

    // Find the user's permissions by ID
    const userPermissions = existingPermissionsData.usersPermissions.find(
      (userPermissions) => userPermissions.id === userId
    );

    if (!userPermissions) {
      // If user permissions do not exist, create a new entry
      const newUserPermissions = {
        id: userId,
        permissions: [],
      };

      // Push each permission as an object into the array
      for (const permissionName in permissionData) {
        newUserPermissions.permissions.push({
          name: permissionName,
          checked: permissionData[permissionName],
        });
      }

      existingPermissionsData.usersPermissions.push(newUserPermissions);
    } else {
      // If user permissions exist, update them
      for (const permission of userPermissions.permissions) {
        const permissionName = permission.name;
        if (permissionData.hasOwnProperty(permissionName)) {
          permission.checked = permissionData[permissionName];
        }
      }
    }

    // Write permissions data back to the JSON file
    await writeJsonFile(PermissionsfilePath, existingPermissionsData); // Updated file path

    return permissionData;
  } catch (error) {
    console.error('Error creating permissions:', error);
    throw error;
  }
};

 

// Function to delete a user by ID
const deleteUserById = async (userId) => {
  try {
    // Find the user to be deleted
    const user = await User.findById(userId);

    if (!user) {
      throw new Error('User not found');
    }

    // Delete the user from the database
    await User.findByIdAndDelete(userId);

    // Read and update permissions data
    const existingPermissionsData = await readJsonFile(PermissionsfilePath);

    // Remove the user's permissions by filtering out the matching ID
    existingPermissionsData.usersPermissions = existingPermissionsData.usersPermissions.filter(
      (userPermissions) => userPermissions.id !== userId
    );

    // Read and update user data
    const existingUsersData = await readJsonFile(UsersfilePath);

    // Remove the user's data by filtering out the matching ID
    existingUsersData.users = existingUsersData.users.filter((userData) => userData._id !== userId);

    // Write the updated data back to the JSON files
    await writeJsonFile(PermissionsfilePath, existingPermissionsData);
    await writeJsonFile(UsersfilePath, existingUsersData);
  } catch (error) {
    console.error('Error deleting user:', error);
    throw error;
  }
};


const getUserPermissionsById = async (userId) => {
  try {
    // Read permissions data from Permissions.json
    const permissionsData = await readJsonFile(PermissionsfilePath);

    if (!permissionsData) {

      throw new Error('Permissions data not found');
    }

    const userPermissions = permissionsData.usersPermissions.find((userPerm) => userPerm.id === userId);

 
    if (!userPermissions || !userPermissions.permissions) {
      throw new Error('User permissions not found');
    }
    return userPermissions.permissions;
  } catch (error) {
    console.error('Error fetching user permissions:', error);
    throw error;
  }
};
// Function to get all permissions for all users
const getAllUserPermissions = async () => {
  try {
    // Read permissions data from Permissions.json
    const permissionsData = await readJsonFile(PermissionsfilePath);

    return permissionsData.usersPermissions;
  } catch (error) {
    console.error('Error fetching all user permissions:', error);
    throw error;
  }
};

// Function to edit user data
const editUser = async (userId, updatedUserData) => {
  try {
    // Update user data in MongoDB
    await User.findByIdAndUpdate(userId, updatedUserData);

    // Read user data from JSON file
    const existingUsersData = await readJsonFile(UsersfilePath);

    // Find the user in the JSON data and update their data
    const updatedUsers = existingUsersData.users.map((userData) => {
      if (userData._id === userId) {
        return { ...userData, ...updatedUserData };
      }
      return userData;
    });

    // Write the updated user data back to the JSON file
    await writeJsonFile(UsersfilePath, { users: updatedUsers });

    return updatedUserData;
  } catch (error) {
    console.error('Error editing user:', error);
    throw error;
  }
};
  // Function to edit user permissions
  const editUserPermissions = async (userId, updatedPermissions) => {
    try {
    // Convert updatedPermissions to the desired format
      const formattedPermissions = Object.entries(updatedPermissions).map(([name, checked]) => ({
        name,
        checked,
      }));
      // Read permissions data from the JSON file
      const existingPermissionsData = await readJsonFile(PermissionsfilePath);
      // Find the user's permissions in the JSON data
      const userPermissions = existingPermissionsData.usersPermissions.find(
        (userPermissions) => userPermissions.id === userId
      );
      if (!userPermissions) {
        // If the user's permissions are not found, create a new entry
        existingPermissionsData.usersPermissions.push({
          id: userId,
          permissions: formattedPermissions,
        });
      } else {
        // If the user's permissions are found, update them
        userPermissions.permissions = formattedPermissions;
      }
      // Write the updated permissions data back to the JSON file
      await writeJsonFile(PermissionsfilePath, existingPermissionsData);
      return formattedPermissions;
    } catch (error) {
      console.error('Error editing user permissions:', error);
      throw error;
    }
  };
  
  const getUserTimeoutSession = async (userId) => {
    try {
      let usersData = await readJsonFile(UsersfilePath);
      const user = usersData.users.find((user) => user._id === userId);

      if (!user) {
        throw new Error('User not found');
      }
      const timeoutInMinutes = user.SessionTimeOut;
      const timeoutInSeconds = timeoutInMinutes * 60;
      return timeoutInSeconds;
    } catch (error) {
      console.error('Error fetching user timeout:', error.message);
      throw error;
    }
  };

  const updateTimeoutSession = async (userId, updatedSeconds) => {
    try {
      let usersData = await readJsonFile(UsersfilePath);
      const userToUpdate = usersData.users.find((user) => user._id === userId);
      if (!userToUpdate) {
        throw new Error('User not found');
      }
      userToUpdate.SessionTimeOut = updatedSeconds;
      await writeJsonFile(UsersfilePath, usersData);
    } catch (error) {
      console.error('Error updating user timeout:', error.message);
      throw error;
    }
  };

module.exports = { getAllUsers, getUserById, createUser, deleteUserById, getUserPermissionsById, getAllUserPermissions, editUser, editUserPermissions, createDefaultPermissions, createPermissions, getUserTimeoutSession, updateTimeoutSession}