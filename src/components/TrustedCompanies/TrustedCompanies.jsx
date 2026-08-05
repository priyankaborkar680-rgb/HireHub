import "./TrustedCompanies.css";
import companies from "../../data/companies";

import companyIllustration from "../../assets/images/companies.png";

const TrustedCompanies = () => {
  return (
    <section className="trusted">

      <div className="trusted-header">

        <div className="trusted-content">
          <h2>Trusted by Leading Companies</h2>

          <p>
            Thousands of companies trust HireHub to hire the best talent.
          </p>
        </div>

        <div className="trusted-image">
          <img
            src={companyIllustration}
            alt="Trusted Companies"
          />
        </div>

      </div>

      <div className="company-container">

        {companies.map((company) => (
          <div className="company-card" key={company.id}>

            <img src={company.logo} alt={company.name} />

            <h4>{company.name}</h4>

          </div>
        ))}

      </div>

    </section>
  );
};

export default TrustedCompanies;