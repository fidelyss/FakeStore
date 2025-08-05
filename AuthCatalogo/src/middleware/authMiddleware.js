// src/middleware/authMiddleware.js
const { verifyAccessToken } = require("../services/tokenService");

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1]; // Bearer TOKEN

    if (token == null) {
        // No token provided
        return res.status(401).json({ message: "Authentication token required" });
    }

    const userPayload = verifyAccessToken(token);

    if (!userPayload) {
        // Token is invalid or expired
        return res.status(403).json({ message: "Invalid or expired token" }); // Use 403 to differentiate from missing token
    }

    // Token is valid, attach user payload to the request object
    req.user = userPayload;
    next(); // Proceed to the next middleware or route handler
};

module.exports = { authenticateToken };
