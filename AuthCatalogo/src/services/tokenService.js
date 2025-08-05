// src/services/tokenService.js
const jwt = require("jsonwebtoken");
const { 
    accessTokenSecret, 
    refreshTokenSecret, 
    accessTokenExpiration, 
    refreshTokenExpiration 
} = require("../config");

const generateAccessToken = (user) => {
    const payload = {
        userId: user.id,
        username: user.username
        // Add other relevant non-sensitive user info if needed (e.g., roles)
    };
    return jwt.sign(payload, accessTokenSecret, { expiresIn: accessTokenExpiration });
};

const generateRefreshToken = (user) => {
    const payload = {
        userId: user.id
        // Keep refresh token payload minimal
    };
    return jwt.sign(payload, refreshTokenSecret, { expiresIn: refreshTokenExpiration });
};

const verifyAccessToken = (token) => {
    try {
        return jwt.verify(token, accessTokenSecret);
    } catch (error) {
        // console.error("Access token verification failed:", error.message);
        return null; // Or throw specific errors
    }
};

const verifyRefreshToken = (token) => {
    try {
        return jwt.verify(token, refreshTokenSecret);
    } catch (error) {
        // console.error("Refresh token verification failed:", error.message);
        return null; // Or throw specific errors
    }
};

module.exports = {
    generateAccessToken,
    generateRefreshToken,
    verifyAccessToken,
    verifyRefreshToken
};
