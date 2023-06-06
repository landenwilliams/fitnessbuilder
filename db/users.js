const client = require("./client");
const bcrypt = require("bcrypt");
const SALT = 10;
// database functions

// user functions
async function createUser({ username, password }) {
  const hpassword = await bcrypt.hash(password, SALT);

  try {
    const { rows: [ user ] } = await client.query(`
      INSERT INTO users(username, password) 
      VALUES($1, $2) 
      ON CONFLICT (username) DO NOTHING 
      RETURNING id, username;
    `, [username, hpassword]);

    return user;
  } catch (error) {
    console.error("Error creating user!");
    throw error;
  }
}

async function getUser({ username, password }) {
  
    if(!username || !password){
      return;
    }

    try{
      const user = await getUserByUsername(username);
      const matchPasswords = await bcrypt.compare(password, user.password);

      // let matchPasswords = false;

      // if (user.password === password) {
      //   matchPasswords = true;
      // }

      if(!user){
        return
      }
      if(!matchPasswords){
        return
      }
        delete user.password;
        return user;

      
      
      
    } catch (error) {
      console.error('get user error')
      throw error;
    }

}

async function getUserById(userId) {
    try {
      const { rows : [user]} = await client.query(`
      SELECT id, username, password
      FROM users
      WHERE id=${userId}`);

      if (!user) {
        return null
      }
      delete user.password;
      return user;
    } catch (error) {
      console.error('failed to find user by id');
      throw error;
      
    }

    

}

async function getUserByUsername(userName) {
  try {
    const { rows : [user]} = await client.query(`
    SELECT *
    FROM users
    WHERE username=$1`, [userName]);

    if(!user){
      return null;
    }
    return user;
  } catch (error) {
    console.error('failed to find user by name');
    throw error;
    
  }
}

module.exports = {
  createUser,
  getUser,
  getUserById,
  getUserByUsername,
}
