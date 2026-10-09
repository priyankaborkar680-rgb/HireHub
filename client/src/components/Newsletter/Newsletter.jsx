import "./Newsletter.css";

import { FaPaperPlane } from "react-icons/fa";

const Newsletter = () => {
  return (
    <section className="newsletter">

      <div className="newsletter-container">

        <h2>Stay Updated with New Jobs</h2>

        <p>
          Subscribe to receive the latest job opportunities, career tips,
          and hiring updates directly in your inbox.
        </p>

        <form className="newsletter-form">

          <input
            type="email"
            placeholder="Enter your email"
          />

          <button type="submit">
            <FaPaperPlane />
            Subscribe
          </button>

        </form>

      </div>

    </section>
  );
};

export default Newsletter;