const dns = require("dns");

// DNS configuration for MongoDB Atlas connection
dns.setServers(["8.8.8.8", "1.1.1.1"]);

const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");

// Routes
const authRoutes = require("./routes/authRoutes");
const jobRoutes = require("./routes/jobRoutes");
const applicationRoutes = require("./routes/applicationRoutes");

const app = express();

// Connect MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Health check
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "HireHub Backend is running 🚀",
  });
});

// ================================
// API ROUTES
// ================================

// Authentication
app.use("/api/auth", authRoutes);

// Jobs
app.use("/api/jobs", jobRoutes);

// Applications
app.use("/api/applications", applicationRoutes);

// ================================
// SERVER
// ================================

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(
    `HireHub Server running on http://localhost:${PORT}`
  );
});
