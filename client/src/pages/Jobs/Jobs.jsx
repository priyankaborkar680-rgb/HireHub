import "./Jobs.css";
import { useEffect, useState } from "react";
import JobCard from "../../components/JobCard/JobCard";

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [filters, setFilters] = useState({
    search: "",
    category: "",
    location: "",
    jobType: "",
  });

  const fetchJobs = async () => {
    try {
      setLoading(true);
      setError("");

      const params = new URLSearchParams();

      if (filters.search) {
        params.append("search", filters.search);
      }

      if (filters.category) {
        params.append("category", filters.category);
      }

      if (filters.location) {
        params.append("location", filters.location);
      }

      if (filters.jobType) {
        params.append("jobType", filters.jobType);
      }

      const response = await fetch(
        `http://localhost:5000/api/jobs?${params.toString()}`
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to load jobs.");
      }

      setJobs(data.jobs || []);
    } catch (err) {
      console.error("Fetch Jobs Error:", err);
      setError("Unable to load jobs. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, [
    filters.search,
    filters.category,
    filters.location,
    filters.jobType,
  ]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const clearFilters = () => {
    setFilters({
      search: "",
      category: "",
      location: "",
      jobType: "",
    });
  };

  return (
    <section className="jobs-page">

      <div className="jobs-top">
        <h1>Find Your Dream Job</h1>

        <p>
          Browse thousands of opportunities from top companies.
        </p>
      </div>

      <div className="jobs-container">

        {/* Filters */}
        <aside className="jobs-filter">

          <h3>Filters</h3>

          <input
            type="text"
            name="search"
            placeholder="Search Job..."
            value={filters.search}
            onChange={handleChange}
          />

          <select
            name="category"
            value={filters.category}
            onChange={handleChange}
          >
            <option value="">All Categories</option>
            <option value="Frontend">Frontend</option>
            <option value="Backend">Backend</option>
            <option value="Full Stack">Full Stack</option>
            <option value="Design">Design</option>
            <option value="IT">IT</option>
            <option value="Other">Other</option>
          </select>

          <select
            name="location"
            value={filters.location}
            onChange={handleChange}
          >
            <option value="">All Locations</option>
            <option value="Bangalore">Bangalore</option>
            <option value="Hyderabad">Hyderabad</option>
            <option value="Mumbai">Mumbai</option>
            <option value="Pune">Pune</option>
            <option value="Nagpur">Nagpur</option>
            <option value="Remote">Remote</option>
          </select>

          <select
            name="jobType"
            value={filters.jobType}
            onChange={handleChange}
          >
            <option value="">All Job Types</option>
            <option value="Full-time">Full-time</option>
            <option value="Part-time">Part-time</option>
            <option value="Contract">Contract</option>
            <option value="Internship">Internship</option>
            <option value="Remote">Remote</option>
          </select>

          <button
            type="button"
            className="clear-filters-btn"
            onClick={clearFilters}
          >
            Clear Filters
          </button>

        </aside>

        {/* Jobs */}
        <div className="jobs-list">

          <div className="jobs-list-header">
            <h2>Available Jobs</h2>

            <span>
              {loading ? "Loading..." : `${jobs.length} jobs found`}
            </span>
          </div>

          {loading && (
            <div className="jobs-message">
              Loading jobs...
            </div>
          )}

          {!loading && error && (
            <div className="jobs-message jobs-error">
              {error}
            </div>
          )}

          {!loading && !error && jobs.length === 0 && (
            <div className="jobs-message">
              <h3>No jobs found</h3>
              <p>
                Try changing your search or filters.
              </p>
            </div>
          )}

          {!loading &&
            !error &&
            jobs.map((job) => (
              <JobCard
                key={job._id}
                job={job}
              />
            ))}

        </div>

      </div>

    </section>
  );
};

export default Jobs;