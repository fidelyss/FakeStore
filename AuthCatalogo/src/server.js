// src/server.js
const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const { port, corsOrigin } = require("./config");
const authRoutes = require("./routes/authRoutes");
const dataRoutes = require("./routes/dataRoutes");

const app = express();

// Middleware
app.use(cors({
    origin: corsOrigin, // Allow requests from your frontend origin
    credentials: true // Allow cookies to be sent
}));
app.use(express.json()); // Parse JSON request bodies
app.use(cookieParser()); // Parse cookies

// Routes
app.use("/auth", authRoutes); // Mount authentication routes
app.use("/api", dataRoutes); // Mount data routes (protected)

// Basic root route
app.get("/", (req, res) => {
    res.send("API de Autenticação JWT está rodando!");
});

// Start the server
app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});
