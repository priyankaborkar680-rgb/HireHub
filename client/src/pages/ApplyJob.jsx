import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./ApplyJob.css";

const ApplyJob = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user") || "null");
  const token = localStorage.getItem("token");

  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: "",
    resume: "",
    coverLetter: "",
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

    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    if (!token) {
      navigate("/login");
      return;
    }

    if (!formData.name || !formData.email || !formData.phone) {
      setError("Please fill all required fields.");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(
        "http://localhost:5000/api/applications",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            jobId: id,
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            resume: formData.resume,
            coverLetter: formData.coverLetter,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to submit application."
        );
      }

      setSuccess(
        "Application submitted successfully!"
      );

      setTimeout(() => {
        navigate("/my-applications");
      }, 1200);

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="apply-job-page">

      <div className="apply-job-container">

        <div className="apply-job-header">
          <span>JOB APPLICATION</span>

          <h1>
            Apply for this Position
          </h1>

          <p>
            Complete the form below to submit your application.
          </p>
        </div>

        <div className="apply-job-card">

          {error && (
            <div className="apply-error">
              {error}
            </div>
          )}

          {success && (
            <div className="apply-success">
              {success}
            </div>
          )}

          <form onSubmit={handleSubmit}>

            <div className="form-row">

              <div className="form-group">
                <label>
                  Full Name *
                </label>

                <input
                  type="text"
                  name="name"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label>
                  Email Address *
                </label>

                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>

            </div>

            <div className="form-group">
              <label>
                Phone Number *
              </label>

              <input
                type="tel"
                name="phone"
                placeholder="Enter your phone number"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>
                Resume
              </label>

              <input
                type="text"
                name="resume"
                placeholder="Resume URL or file name"
                value={formData.resume}
                onChange={handleChange}
              />

              <small>
                You can add your resume link here for now.
              </small>
            </div>

            <div className="form-group">
              <label>
                Cover Letter
              </label>

              <textarea
                name="coverLetter"
                placeholder="Write a short cover letter..."
                value={formData.coverLetter}
                onChange={handleChange}
                rows="7"
              />
            </div>

            <button
              type="submit"
              className="submit-application-btn"
              disabled={loading}
            >
              {loading
                ? "Submitting..."
                : "Submit Application"}
            </button>

          </form>

        </div>

      </div>

    </section>
  );
};

export default ApplyJob;