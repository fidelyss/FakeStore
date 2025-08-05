// src/models/User.js

// In-memory user store for simplicity. Replace with a database in production.
const users = [];
let userIdCounter = 1;

const findUserById = (id) => users.find(user => user.id === id);

const findUserByGmail = (email) => users.find(user => user.email === email);

const createUser = (email, hashedPassword) => {
    const newUser = {
        id: userIdCounter++,
        email,
        password: hashedPassword,
        // In a real app, refresh tokens might be stored here or in a separate collection/table
        // refreshTokens: [] 
    };
    users.push(newUser);
    return newUser;
};

// Function to add/manage refresh tokens if stored with the user model
// const addRefreshToken = (userId, token) => { ... };
// const removeRefreshToken = (userId, token) => { ... };

module.exports = {
    findUserById,
    findUserByGmail,
    createUser,
    // addRefreshToken, 
    // removeRefreshToken
};
