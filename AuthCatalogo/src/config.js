// src/config.js
require('dotenv').config();

module.exports = {
    port: 5000,
    accessTokenSecret: process.env.ACCESS_TOKEN_SECRET,
    refreshTokenSecret: process.env.REFRESH_TOKEN_SECRET,
    accessTokenExpiration: process.env.ACCESS_TOKEN_EXPIRATION || '15m',
    refreshTokenExpiration: process.env.REFRESH_TOKEN_EXPIRATION || '7d',
    refreshTokenCookieName: process.env.REFRESH_TOKEN_COOKIE_NAME || 'refreshToken',
    refreshTokenCookieMaxAge: parseInt(process.env.REFRESH_TOKEN_COOKIE_MAX_AGE) || 604800000, // 7 days
    corsOrigin: process.env.CORS_ORIGIN || '*'
};
