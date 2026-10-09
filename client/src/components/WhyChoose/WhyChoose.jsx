import "./WhyChoose.css";
import {
  FaSearch,
  FaBuilding,
  FaUserTie,
  FaRocket,
} from "react-icons/fa";

const features = [
  {
    id: 1,
    icon: <FaSearch />,
    title: "Smart Job Search",
    desc: "Find jobs based on your skills, location and experience."
  },
  {
    id: 2,
    icon: <FaBuilding />,
    title: "Top Companies",
    desc: "Explore opportunities from trusted companies worldwide."
  },
  {
    id: 3,
    icon: <FaUserTie />,
    title: "Career Growth",
    desc: "Build your career with premium job opportunities."
  },
  {
    id: 4,
    icon: <FaRocket />,
    title: "Quick Apply",
    desc: "Apply for your dream job in just one click."
  },
];

const WhyChoose = () => {
  return (
    <section className="why">
      <div className="why-heading">
        <h2>Why Choose HireHub?</h2>
        <p>
          Everything you need to find your dream job in one place.
        </p>
      </div>

      <div className="why-container">
        {features.map((item) => (
          <div className="why-card" key={item.id}>
            <div className="why-icon">{item.icon}</div>

            <h3>{item.title}</h3>

            <p>{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default WhyChoose;