// src/controllers/authController.js
const bcrypt = require("bcrypt");
const User = require("../models/User");
const {
    generateAccessToken,
    generateRefreshToken,
    verifyRefreshToken
} = require("../services/tokenService");
const {
    refreshTokenCookieName,
    refreshTokenCookieMaxAge
} = require("../config");

const register = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "Gmail and password are required" });
    }

    try {
        const existingUser = User.findUserByGmail(email);
        if (existingUser) {
            return res.status(409).json({ message: "Gmail already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10); // Salt rounds = 10
        User.createUser(email, hashedPassword);

        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        console.error("Registration error:", error);
        res.status(500).json({ message: "Internal server error during registration" });
    }
};

const login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "Gmail and password are required" });
    }

    try {
        const user = User.findUserByGmail(email);
        if (!user) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        // Generate tokens
        const accessToken = generateAccessToken(user);
        const refreshToken = generateRefreshToken(user);

        // Store refresh token securely (e.g., in HttpOnly cookie)
        res.cookie(refreshTokenCookieName, refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production", // Use secure cookies in production (HTTPS)
            sameSite: "Strict", // Or 'Lax'
            maxAge: refreshTokenCookieMaxAge
        });

        // In a real app, you might store the refresh token associated with the user in the DB
        // User.addRefreshToken(user.id, refreshToken);

        res.json({ accessToken });

    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ message: "Internal server error during login" });
    }
};

const refresh = (req, res) => {
    const tokenFromCookie = req.cookies[refreshTokenCookieName];

    if (!tokenFromCookie) {
        return res.status(401).json({ message: "Refresh token not found" });
    }

    const payload = verifyRefreshToken(tokenFromCookie);

    if (!payload) {
        // Clear the potentially invalid cookie
        res.clearCookie(refreshTokenCookieName, { httpOnly: true, sameSite: "Strict", secure: process.env.NODE_ENV === "production" });
        return res.status(403).json({ message: "Invalid or expired refresh token" });
    }

    // In a real app, check if the refresh token exists in the user's stored tokens (DB)
    // const user = User.findUserById(payload.userId);
    // if (!user || !user.refreshTokens.includes(tokenFromCookie)) { ... }

    const user = User.findUserById(payload.userId); // Fetch user based on token payload
    if (!user) {
        res.clearCookie(refreshTokenCookieName, { httpOnly: true, sameSite: "Strict", secure: process.env.NODE_ENV === "production" });
        return res.status(403).json({ message: "User not found for refresh token" });
    }

    // Generate a new access token
    const newAccessToken = generateAccessToken(user);

    // Optional: Implement refresh token rotation (generate a new refresh token)
    // const newRefreshToken = generateRefreshToken(user);
    // res.cookie(refreshTokenCookieName, newRefreshToken, { ... });
    // Update stored refresh token in DB

    res.json({ accessToken: newAccessToken });
};

const logout = (req, res) => {
    const tokenFromCookie = req.cookies[refreshTokenCookieName];

    // Clear the refresh token cookie
    res.clearCookie(refreshTokenCookieName, {
        httpOnly: true,
        sameSite: "Strict",
        secure: process.env.NODE_ENV === "production"
    });

    // Optional: Invalidate the refresh token on the server-side (e.g., remove from DB)
    // if (tokenFromCookie) {
    //     const payload = verifyRefreshToken(tokenFromCookie); // Verify before invalidating
    //     if (payload) {
    //         User.removeRefreshToken(payload.userId, tokenFromCookie);
    //     }
    // }

    res.status(204).send(); // No Content
};

module.exports = {
    register,
    login,
    refresh,
    logout
};
