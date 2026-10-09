const express = require("express");

const router = express.Router();

const {
  applyForJob,
  getMyApplications,
  getJobApplications,
  updateApplicationStatus,
} = require("../controllers/applicationController");

const protect = require("../middleware/authMiddleware");

// Apply for a job
router.post("/", protect, applyForJob);

// Candidate's applications
router.get("/my", protect, getMyApplications);

// Employer: get applicants for a job
router.get("/job/:jobId", protect, getJobApplications);

// Employer: update application status
router.put("/:id/status", protect, updateApplicationStatus);

module.exports = router;