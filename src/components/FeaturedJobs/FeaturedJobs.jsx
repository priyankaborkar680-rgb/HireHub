import "./FeaturedJobs.css";
import jobs from "../../data/jobs";
import JobCard from "../JobCard/JobCard";

const FeaturedJobs = () => {
  return (
<section className="featured">

  <div className="featured-header">
    <h2>Featured Jobs</h2>
    <p>Discover the latest opportunities from top companies.</p>
  </div>

  <div className="jobs-container">

    {jobs.map((job)=>(
      <div className="job-card" key={job.id}>

        <div className="job-top">
          <img src={job.logo} alt={job.company} />

          <div>
            <h3>{job.title}</h3>
            <span>{job.company}</span>
          </div>
        </div>

        <div className="job-info">
          <span>{job.location}</span>
          <span>{job.type}</span>
        </div>

        <div className="job-bottom">
          <h4 className="salary">{job.salary}</h4>

          <button className="apply-btn">
            Apply Now
          </button>
        </div>

      </div>
    ))}

  </div>

</section>
  );
};

export default FeaturedJobs;