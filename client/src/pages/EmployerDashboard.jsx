import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./EmployerDashboard.css";

const EmployerDashboard = () => {
  const navigate = useNavigate();

  const [jobs, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [applications, setApplications] = useState([]);

  const [loadingJobs, setLoadingJobs] = useState(true);
  const [loadingApplications, setLoadingApplications] = useState(false);
  const [error, setError] = useState("");

  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user") || "null");

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }

    const fetchJobs = async () => {
      try {
        setLoadingJobs(true);

        const response = await fetch(
          "http://localhost:5000/api/jobs"
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.message || "Failed to load jobs."
          );
        }

        const myJobs = (data.jobs || []).filter(
          (job) =>
            job.postedBy?._id === user?.id ||
            job.postedBy === user?.id
        );

        setJobs(myJobs);
      } catch (err) {
        console.error("Employer Jobs Error:", err);
        setError(err.message);
      } finally {
        setLoadingJobs(false);
      }
    };

    fetchJobs();
  }, [navigate, token, user?.id]);

  const handleViewApplicants = async (job) => {
    try {
      setSelectedJob(job);
      setLoadingApplications(true);
      setApplications([]);
      setError("");

      const response = await fetch(
        `http://localhost:5000/api/applications/job/${job._id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to load applicants."
        );
      }

      setApplications(data.applications || []);
    } catch (err) {
      console.error("Applicants Error:", err);
      setError(err.message);
    } finally {
      setLoadingApplications(false);
    }
  };

  const handleStatusChange = async (
    applicationId,
    status
  ) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/applications/${applicationId}/status`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ status }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to update status."
        );
      }

      setApplications((prev) =>
        prev.map((application) =>
          application._id === applicationId
            ? {
                ...application,
                status: data.application.status,
              }
            : application
        )
      );
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <section className="employer-dashboard">
      <div className="dashboard-container">

        <div className="dashboard-header">
          <div>
            <span>EMPLOYER PANEL</span>
            <h1>Employer Dashboard</h1>
            <p>
              Manage your jobs and review applications.
            </p>
          </div>

          <Link
            to="/post-job"
            className="post-new-job-btn"
          >
            + Post New Job
          </Link>
        </div>

        {error && (
          <div className="dashboard-error">
            {error}
          </div>
        )}

        <div className="dashboard-layout">

          <div className="jobs-panel">
            <h2>Your Posted Jobs</h2>

            {loadingJobs && (
              <div className="dashboard-message">
                Loading jobs...
              </div>
            )}

            {!loadingJobs && jobs.length === 0 && (
              <div className="dashboard-message">
                <h3>No Jobs Posted</h3>
                <p>
                  You haven't posted any jobs yet.
                </p>

                <Link to="/post-job">
                  Post Your First Job
                </Link>
              </div>
            )}

            {!loadingJobs &&
              jobs.map((job) => (
                <div
                  className={`employer-job-card ${
                    selectedJob?._id === job._id
                      ? "selected"
                      : ""
                  }`}
                  key={job._id}
                >
                  <div>
                    <h3>{job.title}</h3>

                    <p>{job.company}</p>

                    <small>
                      📍 {job.location}
                    </small>
                  </div>

                  <button
                    onClick={() =>
                      handleViewApplicants(job)
                    }
                  >
                    View Applicants
                  </button>
                </div>
              ))}
          </div>

          <div className="applicants-panel">
            {!selectedJob ? (
              <div className="select-job-message">
                <div>👥</div>
                <h2>Select a Job</h2>
                <p>
                  Select one of your posted jobs to view
                  applicants.
                </p>
              </div>
            ) : (
              <>
                <div className="applicants-header">
                  <div>
                    <span>APPLICATIONS</span>
                    <h2>{selectedJob.title}</h2>
                    <p>{selectedJob.company}</p>
                  </div>

                  <strong>
                    {applications.length} Applicants
                  </strong>
                </div>

                {loadingApplications && (
                  <div className="dashboard-message">
                    Loading applicants...
                  </div>
                )}

                {!loadingApplications &&
                  applications.length === 0 && (
                    <div className="dashboard-message">
                      <h3>No Applications Yet</h3>
                      <p>
                        No candidates have applied for
                        this job yet.
                      </p>
                    </div>
                  )}

                {!loadingApplications &&
                  applications.map((application) => (
                    <div
                      className="applicant-card"
                      key={application._id}
                    >
                      <div className="applicant-top">
                        <div className="applicant-avatar">
                          {application.name
                            ?.charAt(0)
                            ?.toUpperCase() || "U"}
                        </div>

                        <div>
                          <h3>
                            {application.name}
                          </h3>

                          <p>
                            {application.email}
                          </p>

                          <p>
                            📱 {application.phone}
                          </p>
                        </div>
                      </div>

                      <div className="applicant-details">

                        {application.resume && (
                          <div>
                            <strong>Resume</strong>
                            <p>
                              {application.resume}
                            </p>
                          </div>
                        )}

                        {application.coverLetter && (
                          <div>
                            <strong>
                              Cover Letter
                            </strong>
                            <p>
                              {application.coverLetter}
                            </p>
                          </div>
                        )}

                      </div>

                      <div className="applicant-footer">

                        <span
                          className={`application-status status-${application.status
                            ?.toLowerCase()
                            .replace(" ", "-")}`}
                        >
                          {application.status}
                        </span>

                        <select
                          value={application.status}
                          onChange={(e) =>
                            handleStatusChange(
                              application._id,
                              e.target.value
                            )
                          }
                        >
                          <option value="Applied">
                            Applied
                          </option>

                          <option value="Under Review">
                            Under Review
                          </option>

                          <option value="Shortlisted">
                            Shortlisted
                          </option>

                          <option value="Rejected">
                            Rejected
                          </option>

                          <option value="Hired">
                            Hired
                          </option>
                        </select>

                      </div>
                    </div>
                  ))}
              </>
            )}
          </div>

        </div>
      </div>
    </section>
  );
};

export default EmployerDashboard;