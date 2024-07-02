const db = require('../models'); // Adjust the path to your models

async function addUser(username, password) {
  try {
    const user = await db.User.create({
      username: username,
      password: password // Plain text password, hashing handled by beforeCreate hook
    });
    console.log('User created successfully:', user);
  } catch (error) {
    console.error('Error creating user:', error);
  }
}

// Replace 'testuser' and 'password123' with the desired username and password
addUser('testuser3', 'pass');
