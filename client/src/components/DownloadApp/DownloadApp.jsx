import "./DownloadApp.css";

import mobile from "../../assets/images/mobile-app.png";

import { FaGooglePlay, FaApple } from "react-icons/fa";

const DownloadApp = () => {
  return (
    <section className="download">

      <div className="download-container">

        <div className="download-left">

          <span className="download-tag">
            Download App
          </span>

            <h2>
            Find Your Dream Job
            <br />
            <span>Anywhere, Anytime.</span>
            </h2>

          <p>
            Search jobs, apply instantly, receive notifications,
            and track your applications directly from your mobile.
          </p>

          <div className="download-buttons">

            <button className="play-btn">
              <FaGooglePlay />
              Google Play
            </button>

            <button className="apple-btn">
              <FaApple />
              App Store
            </button>

          </div>

        </div>

        <div className="download-right">

          <img src={mobile} alt="Mobile App" />

        </div>

      </div>

    </section>
  );
};

export default DownloadApp;