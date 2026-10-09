import "./JobCard.css";
import { Link } from "react-router-dom";
import { FaMapMarkerAlt } from "react-icons/fa";
import { BsBriefcaseFill } from "react-icons/bs";

const JobCard = ({ job }) => {
  return (
    <div className="job-card">

      <div className="job-company">

        <div className="job-logo">
          {job.company?.charAt(0)?.toUpperCase() || "H"}
        </div>

        <div>
          <h3>{job.title}</h3>
          <p>{job.company}</p>
        </div>

      </div>

      <div className="job-info">

        <span>
          <FaMapMarkerAlt />
          {job.location}
        </span>

        <span className="job-type">
          {job.jobType || "Full-time"}
        </span>

      </div>

      <div className="job-extra">

        <span>
          <BsBriefcaseFill />
          {job.experience || "Not specified"}
        </span>

        <span>{job.category || "Other"}</span>

      </div>

      <div className="job-footer">

        <h4>{job.salary || "Not disclosed"}</h4>

        <Link
          to={`/job/${job._id}`}
          className="job-link"
        >
          View Details
        </Link>

      </div>

    </div>
  );
};

export default JobCard;