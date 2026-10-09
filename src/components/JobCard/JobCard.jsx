import "./JobCard.css";

const JobCard = ({ job }) => {
  return (
    <div className="job-card">

      <div className="job-company">

        <img src={job.logo} alt={job.company} />

        <div>
          <h3>{job.title}</h3>
          <p>{job.company}</p>
        </div>

      </div>

      <div className="job-info">

        <span>{job.location}</span>

        <span>{job.type}</span>

      </div>

      <div className="job-footer">

        <h4>{job.salary}</h4>

        <button>Apply Now</button>

      </div>

    </div>
  );
};

export default JobCard;