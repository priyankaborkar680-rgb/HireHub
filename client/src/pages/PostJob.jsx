import "./PostJob.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const PostJob = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    company: "",
    location: "",
    salary: "",
    jobType: "Full-time",
    category: "",
    experience: "",
    skills: "",
    description: "",
    requirements: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    if (
      !formData.title ||
      !formData.company ||
      !formData.location ||
      !formData.description
    ) {
      setError(
        "Please fill in Job Title, Company, Location and Description."
      );
      return;
    }

    const token = localStorage.getItem("token");

    if (!token) {
      setError("Please login before posting a job.");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(
        "http://localhost:5000/api/jobs",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            title: formData.title,
            company: formData.company,
            location: formData.location,
            salary: formData.salary,
            jobType: formData.jobType,
            category: formData.category,
            experience: formData.experience,

            skills: formData.skills
              .split(",")
              .map((skill) => skill.trim())
              .filter(Boolean),

            description: formData.description,

            requirements: formData.requirements
              .split("\n")
              .map((item) => item.trim())
              .filter(Boolean),
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to create job"
        );
      }

      setSuccess("Job posted successfully!");

      setFormData({
        title: "",
        company: "",
        location: "",
        salary: "",
        jobType: "Full-time",
        category: "",
        experience: "",
        skills: "",
        description: "",
        requirements: "",
      });

      setTimeout(() => {
        navigate("/jobs");
      }, 1200);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="post-job-page">
      <div className="post-job-container">
        <h1>Post a Job</h1>

        <p className="post-job-subtitle">
          Find the right candidate for your company.
        </p>

        {error && (
          <div className="form-error">
            {error}
          </div>
        )}

        {success && (
          <div className="form-success">
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Job Title *</label>
            <input
              type="text"
              name="title"
              placeholder="e.g. Frontend Developer"
              value={formData.title}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Company *</label>
            <input
              type="text"
              name="company"
              placeholder="e.g. Tech Solutions Pvt Ltd"
              value={formData.company}
              onChange={handleChange}
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Location *</label>
              <input
                type="text"
                name="location"
                placeholder="e.g. Pune, Maharashtra"
                value={formData.location}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Salary</label>
              <input
                type="text"
                name="salary"
                placeholder="e.g. ₹5 - ₹8 LPA"
                value={formData.salary}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Job Type</label>
              <select
                name="jobType"
                value={formData.jobType}
                onChange={handleChange}
              >
                <option value="Full-time">
                  Full-time
                </option>
                <option value="Part-time">
                  Part-time
                </option>
                <option value="Contract">
                  Contract
                </option>
                <option value="Internship">
                  Internship
                </option>
                <option value="Remote">
                  Remote
                </option>
              </select>
            </div>

            <div className="form-group">
              <label>Category</label>
              <input
                type="text"
                name="category"
                placeholder="e.g. Development"
                value={formData.category}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-group">
            <label>Experience</label>
            <input
              type="text"
              name="experience"
              placeholder="e.g. 2-4 years"
              value={formData.experience}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Skills</label>
            <input
              type="text"
              name="skills"
              placeholder="React, JavaScript, CSS, HTML"
              value={formData.skills}
              onChange={handleChange}
            />
            <small>
              Separate skills with commas.
            </small>
          </div>

          <div className="form-group">
            <label>Job Description *</label>
            <textarea
              name="description"
              rows="7"
              placeholder="Describe the role, responsibilities and what the candidate will do..."
              value={formData.description}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Requirements</label>
            <textarea
              name="requirements"
              rows="6"
              placeholder={`Bachelor's degree in Computer Science
2+ years of experience
Good communication skills
Experience with React`}
              value={formData.requirements}
              onChange={handleChange}
            />

            <small>
              Write each requirement on a new line.
            </small>
          </div>

          <button
            type="submit"
            disabled={loading}
          >
            {loading ? "Posting Job..." : "Post Job"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default PostJob;