// src/routes/dataRoutes.js
const express = require("express");
const dataController = require("../controllers/dataController");
const { authenticateToken } = require("../middleware/authMiddleware");

const router = express.Router();

// Apply the authentication middleware to this route
router.get("/data", authenticateToken, dataController.getProtectedData);

module.exports = router;
