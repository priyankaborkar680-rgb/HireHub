import "./Footer.css";

import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="footer">

      <div className="footer-container">

        <div className="footer-about">

          <h2>
            Hire<span>Hub</span>
          </h2>

          <p>
            HireHub helps thousands of job seekers connect with top companies
            and land their dream jobs faster.
          </p>

          <div className="footer-social">

            <a href="#"><FaFacebookF /></a>
            <a href="#"><FaTwitter /></a>
            <a href="#"><FaLinkedinIn /></a>
            <a href="#"><FaInstagram /></a>

          </div>

        </div>

        <div className="footer-links">

          <h3>Quick Links</h3>

          <a href="#">Home</a>
          <a href="#">Jobs</a>
          <a href="#">Companies</a>
          <a href="#">About</a>

        </div>

        <div className="footer-links">

          <h3>Resources</h3>

          <a href="#">Blog</a>
          <a href="#">Career Tips</a>
          <a href="#">Support</a>
          <a href="#">FAQs</a>

        </div>

        <div className="footer-contact">

          <h3>Contact</h3>

          <p>Nagpur, Maharashtra</p>

          <p>support@hirehub.com</p>

          <p>+91 9876543210</p>

        </div>

      </div>

      <div className="footer-bottom">

        © 2026 HireHub. All Rights Reserved.

      </div>

    </footer>
  );
};

export default Footer;