import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./MyApplications.css";

const MyApplications = () => {
  const navigate = useNavigate();

  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchApplications = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        navigate("/login");
        return;
      }

      try {
        const response = await fetch(
          "http://localhost:5000/api/applications/my",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.message || "Failed to load applications."
          );
        }

        setApplications(data.applications || []);
      } catch (err) {
        console.error("My Applications Error:", err);
        setError(err.message || "Unable to load applications.");
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, [navigate]);

  const getStatusClass = (status) => {
    switch (status) {
      case "Shortlisted":
        return "status-shortlisted";

      case "Rejected":
        return "status-rejected";

      case "Hired":
        return "status-hired";

      case "Under Review":
        return "status-review";

      default:
        return "status-applied";
    }
  };

  if (loading) {
    return (
      <section className="applications-page">
        <div className="applications-container">
          <div className="applications-message">
            Loading your applications...
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="applications-page">
      <div className="applications-container">
        <div className="applications-header">
          <div>
            <span>MY CAREER</span>
            <h1>My Applications</h1>
            <p>
              Track the jobs you have applied for and check your
              application status.
            </p>
          </div>

          <Link to="/jobs" className="browse-jobs-btn">
            Browse Jobs
          </Link>
        </div>

        {error && (
          <div className="applications-error">
            {error}
          </div>
        )}

        {!error && applications.length === 0 && (
          <div className="empty-applications">
            <div className="empty-icon">📄</div>
            <h2>No Applications Yet</h2>
            <p>
              You haven't applied for any jobs yet. Start exploring
              opportunities and apply for your dream job.
            </p>

            <Link to="/jobs" className="browse-jobs-btn">
              Find Jobs
            </Link>
          </div>
        )}

        {!error && applications.length > 0 && (
          <div className="applications-list">
            {applications.map((application) => (
              <div
                className="application-card"
                key={application._id}
              >
                <div className="application-main">
                  <div className="application-logo">
                    {application.job?.company
                      ?.charAt(0)
                      ?.toUpperCase() || "H"}
                  </div>

                  <div className="application-info">
                    <h2>
                      {application.job?.title ||
                        "Job Position"}
                    </h2>

                    <h4>
                      {application.job?.company ||
                        "Company"}
                    </h4>

                    <p>
                      📍{" "}
                      {application.job?.location ||
                        "Location not specified"}
                    </p>
                  </div>
                </div>

                <div className="application-right">
                  <span
                    className={`application-status ${getStatusClass(
                      application.status
                    )}`}
                  >
                    {application.status || "Applied"}
                  </span>

                  <p className="applied-date">
                    Applied on{" "}
                    {new Date(
                      application.createdAt
                    ).toLocaleDateString()}
                  </p>

                  {application.job?._id && (
                    <Link
                      to={`/job/${application.job._id}`}
                      className="view-job-btn"
                    >
                      View Job
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default MyApplications;