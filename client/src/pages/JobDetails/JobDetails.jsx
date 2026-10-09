import "./JobDetails.css";

import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";

import {
  FaMapMarkerAlt,
  FaBriefcase,
  FaMoneyBillWave,
  FaClock,
  FaHeart,
  FaShareAlt,
} from "react-icons/fa";

const JobDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [job, setJob] = useState(null);
  const [relatedJobs, setRelatedJobs] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          `http://localhost:5000/api/jobs/${id}`
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.message || "Failed to load job."
          );
        }

        setJob(data.job);

        // Fetch related jobs
        const jobsResponse = await fetch(
          `http://localhost:5000/api/jobs?category=${encodeURIComponent(
            data.job.category || ""
          )}`
        );

        const jobsData = await jobsResponse.json();

        if (jobsResponse.ok) {
          const related = (jobsData.jobs || []).filter(
            (item) => item._id !== data.job._id
          );

          setRelatedJobs(related.slice(0, 4));
        }
      } catch (err) {
        console.error("Job Details Error:", err);
        setError(err.message || "Unable to load job.");
      } finally {
        setLoading(false);
      }
    };

    fetchJob();
  }, [id]);

  const handleApply = () => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please login to apply for this job.");
      navigate("/login");
      return;
    }

    navigate(`/job/${id}/apply`);
  };

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(
        window.location.href
      );

      alert("Job link copied!");
    } catch (error) {
      console.error(error);
      alert("Unable to copy job link.");
    }
  };

  if (loading) {
    return (
      <div className="job-not-found">
        <h2>Loading job...</h2>
      </div>
    );
  }

  if (error || !job) {
    return (
      <div className="job-not-found">
        <h1>Job Not Found</h1>

        <p>
          {error || "This job may have been removed."}
        </p>

        <Link to="/jobs">
          Browse Jobs
        </Link>
      </div>
    );
  }

  return (
    <section className="job-details">

      <div className="details-container">

        {/* LEFT */}

        <div className="details-left">

          <div className="company-box">

            <div className="details-company-logo">
              {job.company?.charAt(0)?.toUpperCase() || "H"}
            </div>

            <div>
              <h2>{job.title}</h2>
              <h4>{job.company}</h4>
            </div>

          </div>

          <div className="job-meta">

            <span>
              <FaMapMarkerAlt />
              {job.location}
            </span>

            <span>
              <FaBriefcase />
              {job.jobType || "Full-time"}
            </span>

            <span>
              <FaMoneyBillWave />
              {job.salary || "Not disclosed"}
            </span>

            <span>
              <FaClock />
              {job.experience || "Not specified"}
            </span>

          </div>

          <h3>Job Description</h3>

          <p>
            {job.description}
          </p>

          <h3>Requirements</h3>

          {job.requirements?.length > 0 ? (
            <ul>
              {job.requirements.map((item, index) => (
                <li key={index}>
                  {item}
                </li>
              ))}
            </ul>
          ) : (
            <p>
              No specific requirements provided.
            </p>
          )}

          <h3>Required Skills</h3>

          <div className="skills">

            {job.skills?.length > 0 ? (
              job.skills.map((skill, index) => (
                <span key={index}>
                  {skill}
                </span>
              ))
            ) : (
              <span>No skills specified</span>
            )}

          </div>

        </div>

        {/* RIGHT */}

        <div className="details-right">

          <div className="apply-card">

            <h3>Job Overview</h3>

            <div className="overview-item">
              <strong>Salary</strong>
              <p>
                {job.salary || "Not disclosed"}
              </p>
            </div>

            <div className="overview-item">
              <strong>Experience</strong>
              <p>
                {job.experience || "Not specified"}
              </p>
            </div>

            <div className="overview-item">
              <strong>Category</strong>
              <p>
                {job.category || "Other"}
              </p>
            </div>

            <div className="overview-item">
              <strong>Location</strong>
              <p>
                {job.location}
              </p>
            </div>

            <div className="overview-item">
              <strong>Job Type</strong>
              <p>
                {job.jobType || "Full-time"}
              </p>
            </div>

            <button
              className="apply-btn"
              onClick={handleApply}
            >
              Apply Now
            </button>

            <button
              className="save-btn"
              onClick={() => setSaved(!saved)}
            >
              <FaHeart />
              {saved ? "Saved" : "Save Job"}
            </button>

            <button
              className="share-btn"
              onClick={handleShare}
            >
              <FaShareAlt />
              Share Job
            </button>

          </div>

          {/* Related Jobs */}

          <div className="related-card">

            <h3>Related Jobs</h3>

            {relatedJobs.length === 0 ? (
              <p>No Related Jobs Found.</p>
            ) : (
              relatedJobs.map((item) => (

                <Link
                  key={item._id}
                  to={`/job/${item._id}`}
                  className="related-job"
                >

                  <div className="related-company-logo">
                    {item.company
                      ?.charAt(0)
                      ?.toUpperCase() || "H"}
                  </div>

                  <div>
                    <h4>{item.title}</h4>
                    <p>{item.company}</p>
                  </div>

                </Link>

              ))
            )}

          </div>

        </div>

      </div>

    </section>
  );
};

export default JobDetails;