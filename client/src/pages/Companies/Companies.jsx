import "./Companies.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Companies = () => {
  const navigate = useNavigate();

  const [jobs, setJobs] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true);

        const response = await fetch(
          "http://localhost:5000/api/jobs"
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.message || "Failed to load companies."
          );
        }

        setJobs(data.jobs || []);
      } catch (err) {
        console.error("Companies Error:", err);
        setError("Unable to load companies.");
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  /*
    Create companies from jobs
  */
  const companiesMap = {};

  jobs.forEach((job) => {
    const companyName = job.company?.trim();

    if (!companyName) return;

    if (!companiesMap[companyName]) {
      companiesMap[companyName] = {
        name: companyName,
        location: job.location || "Location not specified",
        jobs: [],
      };
    }

    companiesMap[companyName].jobs.push(job);
  });

  const companies = Object.values(companiesMap);

  const filteredCompanies = companies.filter((company) =>
    company.name.toLowerCase().includes(search.toLowerCase())
  );

  const getInitials = (name) => {
    const words = name.trim().split(" ");

    if (words.length >= 2) {
      return (
        words[0].charAt(0) +
        words[1].charAt(0)
      ).toUpperCase();
    }

    return name.substring(0, 2).toUpperCase();
  };

  const handleViewJobs = (companyName) => {
    navigate(
      `/jobs?search=${encodeURIComponent(companyName)}`
    );
  };

  return (
    <div className="companies-page">

      {/* Hero */}
      <section className="companies-hero">
        <div className="companies-hero-content">

          <span className="companies-tag">
            EXPLORE COMPANIES
          </span>

          <h1>
            Discover Your Next
            <span> Workplace</span>
          </h1>

          <p>
            Explore companies, discover their culture, and
            find exciting career opportunities that match
            your goals.
          </p>

          <div className="company-search">

            <input
              type="text"
              placeholder="Search companies..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            <button type="button">
              Search
            </button>

          </div>

        </div>
      </section>

      {/* Companies */}
      <section className="companies-section">

        <div className="companies-heading">

          <div>
            <span className="section-label">
              TOP COMPANIES
            </span>

            <h2>
              Find Companies Hiring Now
            </h2>
          </div>

          <p>
            {loading
              ? "Loading..."
              : `${filteredCompanies.length} companies`}
          </p>

        </div>

        {loading && (
          <div className="companies-message">
            Loading companies...
          </div>
        )}

        {!loading && error && (
          <div className="companies-message companies-error">
            {error}
          </div>
        )}

        {!loading &&
          !error &&
          filteredCompanies.length === 0 && (
            <div className="companies-message">
              <h3>No companies found</h3>

              <p>
                Try searching for another company.
              </p>
            </div>
          )}

        {!loading &&
          !error &&
          filteredCompanies.length > 0 && (
            <div className="companies-grid">

              {filteredCompanies.map((company) => (

                <div
                  className="company-card"
                  key={company.name}
                >

                  <div className="company-card-top">

                    <div className="company-logo">
                      {getInitials(company.name)}
                    </div>

                    <div className="company-info">

                      <h3>
                        {company.name}
                      </h3>

                      <p>
                        {company.jobs[0]?.category ||
                          "Technology"}
                      </p>

                    </div>

                  </div>

                  <div className="company-details">

                    <div className="company-location">
                      <span>📍</span>

                      {company.location}
                    </div>

                    <div className="company-jobs">
                      {company.jobs.length}{" "}
                      Open{" "}
                      {company.jobs.length === 1
                        ? "Job"
                        : "Jobs"}
                    </div>

                  </div>

                  <button
                    className="view-company-btn"
                    onClick={() =>
                      handleViewJobs(company.name)
                    }
                  >
                    View Jobs
                    <span>→</span>
                  </button>

                </div>

              ))}

            </div>
          )}

      </section>

      {/* CTA */}
      <section className="companies-cta">

        <div>

          <span className="section-label">
            ARE YOU AN EMPLOYER?
          </span>

          <h2>
            Find the Right Talent for Your Team
          </h2>

          <p>
            Create your company profile and start posting
            jobs on HireHub.
          </p>

        </div>

        <button
          className="employer-btn"
          onClick={() => navigate("/post-job")}
        >
          Post a Job
        </button>

      </section>

    </div>
  );
};

export default Companies;