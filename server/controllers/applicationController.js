const Application = require("../models/Application");
const Job = require("../models/Job");

// Apply for a job
const applyForJob = async (req, res) => {
  try {
    const {
      jobId,
      name,
      email,
      phone,
      resume,
      coverLetter,
    } = req.body;

    if (!jobId || !name || !email || !phone) {
      return res.status(400).json({
        success: false,
        message: "Job, name, email and phone are required",
      });
    }

    const job = await Job.findById(jobId);

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found",
      });
    }

    if (!job.isActive) {
      return res.status(400).json({
        success: false,
        message: "This job is no longer active",
      });
    }

    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Please login to apply for this job",
      });
    }

    // Prevent employer from applying to jobs
    if (req.user.role === "employer") {
      return res.status(403).json({
        success: false,
        message: "Employers cannot apply for jobs",
      });
    }

    // Check duplicate application
    const existingApplication = await Application.findOne({
      job: jobId,
      applicant: req.user._id,
    });

    if (existingApplication) {
      return res.status(400).json({
        success: false,
        message: "You have already applied for this job",
      });
    }

    const application = await Application.create({
      job: jobId,
      applicant: req.user._id,
      name,
      email,
      phone,
      resume: resume || "",
      coverLetter: coverLetter || "",
    });

    res.status(201).json({
      success: true,
      message: "Application submitted successfully",
      application,
    });
  } catch (error) {
    console.error("Apply Job Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to submit application",
    });
  }
};


// Get applications of logged-in candidate
const getMyApplications = async (req, res) => {
  try {
    const applications = await Application.find({
      applicant: req.user._id,
    })
      .populate(
        "job",
        "title company location salary jobType"
      )
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: applications.length,
      applications,
    });
  } catch (error) {
    console.error("My Applications Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch applications",
    });
  }
};


// Get applicants for employer's job
const getJobApplications = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Please login",
      });
    }

    // Only employers can view applicants
    if (req.user.role !== "employer") {
      return res.status(403).json({
        success: false,
        message: "Only employers can view applicants",
      });
    }

    const job = await Job.findById(req.params.jobId);

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found",
      });
    }

    // Employer can only view applicants
    // for their own job
    if (
      !job.postedBy ||
      job.postedBy.toString() !== req.user._id.toString()
    ) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to view applicants for this job",
      });
    }

    const applications = await Application.find({
      job: req.params.jobId,
    })
      .populate("applicant", "name email")
      .populate(
        "job",
        "title company location"
      )
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: applications.length,
      applications,
    });
  } catch (error) {
    console.error("Job Applications Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch applicants",
    });
  }
};


// Update application status
const updateApplicationStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const allowedStatuses = [
      "Applied",
      "Under Review",
      "Shortlisted",
      "Rejected",
      "Hired",
    ];

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid application status",
      });
    }

    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Please login",
      });
    }

    // Only employers can change status
    if (req.user.role !== "employer") {
      return res.status(403).json({
        success: false,
        message: "Only employers can update application status",
      });
    }

    const application = await Application.findById(
      req.params.id
    );

    if (!application) {
      return res.status(404).json({
        success: false,
        message: "Application not found",
      });
    }

    // Get the job connected to this application
    const job = await Job.findById(application.job);

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found",
      });
    }

    // Only job owner can update application
    if (
      !job.postedBy ||
      job.postedBy.toString() !== req.user._id.toString()
    ) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to update this application",
      });
    }

    application.status = status;

    await application.save();

    res.status(200).json({
      success: true,
      message: "Application status updated",
      application,
    });
  } catch (error) {
    console.error("Update Application Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to update application status",
    });
  }
};


module.exports = {
  applyForJob,
  getMyApplications,
  getJobApplications,
  updateApplicationStatus,
};