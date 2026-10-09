import "./About.css";

const About = () => {
  return (
    <div className="about-page">

      {/* Hero Section */}
      <section className="about-hero">
        <div className="about-hero-content">
          <span className="about-tag">ABOUT HIREHUB</span>

          <h1>
            Connecting Talent With
            <span> Opportunity</span>
          </h1>

          <p>
            HireHub is a modern job platform designed to connect talented
            professionals with companies looking for the right people.
          </p>
        </div>
      </section>

      {/* About Content */}
      <section className="about-content">
        <div className="about-image">
          <div className="about-image-box">
            <span>HireHub</span>
          </div>
        </div>

        <div className="about-text">
          <span className="section-tag">WHO WE ARE</span>

          <h2>
            Making Job Search
            <br />
            Simple & Meaningful
          </h2>

          <p>
            Finding the right job should not be complicated. HireHub brings
            job seekers and employers together through a simple and
            user-friendly platform.
          </p>

          <p>
            Whether you are starting your career, looking for your next
            opportunity, or hiring talented professionals, HireHub helps make
            the process easier and more efficient.
          </p>

          <button className="about-btn">
            Explore Jobs
          </button>
        </div>
      </section>

      {/* Stats */}
      <section className="about-stats">
        <div className="stat-box">
          <h3>10K+</h3>
          <p>Active Jobs</p>
        </div>

        <div className="stat-box">
          <h3>5K+</h3>
          <p>Companies</p>
        </div>

        <div className="stat-box">
          <h3>25K+</h3>
          <p>Job Seekers</p>
        </div>

        <div className="stat-box">
          <h3>15K+</h3>
          <p>Successful Hires</p>
        </div>
      </section>

      {/* Mission */}
      <section className="mission-section">
        <div className="mission-content">
          <span className="section-tag">OUR MISSION</span>

          <h2>
            Helping People Build
            <br />
            Better Careers
          </h2>

          <p>
            Our mission is to create a reliable platform where people can
            discover opportunities and companies can find talented
            professionals.
          </p>
        </div>
      </section>

    </div>
  );
};

export default About;

