import "./FeaturedJobs.css";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const FeaturedJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeaturedJobs = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/jobs"
        );

        const data = await response.json();

        if (response.ok) {
          // Latest 6 jobs
          setJobs((data.jobs || []).slice(0, 6));
        }
      } catch (error) {
        console.error("Featured Jobs Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedJobs();
  }, []);

  return (
    <section className="featured">

      <div className="featured-header">
        <h2>Featured Jobs</h2>

        <p>
          Discover the latest opportunities from top companies.
        </p>
      </div>

      {loading ? (
        <div className="featured-message">
          Loading jobs...
        </div>
      ) : jobs.length === 0 ? (
        <div className="featured-message">
          <h3>No jobs available yet</h3>
          <p>
            New opportunities will appear here when companies post jobs.
          </p>

          <Link to="/post-job">
            Post a Job
          </Link>
        </div>
      ) : (
        <div className="jobs-container">

          {jobs.map((job) => (

            <div
              className="job-card"
              key={job._id}
            >

              <div className="job-top">

                <div className="featured-company-logo">
                  {job.company
                    ?.charAt(0)
                    ?.toUpperCase() || "H"}
                </div>

                <div>
                  <h3>{job.title}</h3>

                  <span>
                    {job.company}
                  </span>
                </div>

              </div>

              <div className="job-info">

                <span>
                  📍 {job.location}
                </span>

                <span>
                  {job.jobType || "Full-time"}
                </span>

              </div>

              <div className="job-bottom">

                <h4 className="salary">
                  {job.salary || "Not disclosed"}
                </h4>

                <Link
                  to={`/job/${job._id}`}
                  className="apply-btn"
                >
                  View Details
                </Link>

              </div>

            </div>

          ))}

        </div>
      )}

      <div className="featured-view-all">
        <Link to="/jobs">
          View All Jobs →
        </Link>
      </div>

    </section>
  );
};

export default FeaturedJobs;