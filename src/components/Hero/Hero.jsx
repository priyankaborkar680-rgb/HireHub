import "./Hero.css";
import SearchBar from "../SearchBar/SearchBar";
import { motion } from "framer-motion";

const Hero = () => {
  return (
    <section className="hero">

      <div className="hero-left">

        <motion.h1
          initial={{opacity:0,y:-30}}
          animate={{opacity:1,y:0}}
          transition={{duration:0.6}}
        >
          Find Your <span>Dream Job</span>
        </motion.h1>

        <motion.p
          initial={{opacity:0}}
          animate={{opacity:1}}
          transition={{delay:.3}}
        >
          Discover thousands of jobs from top companies.
          Search, Apply and Get Hired Faster.
        </motion.p>

        <SearchBar />

        <div className="hero-buttons">
          <button className="primary-btn">Find Jobs</button>

          <button className="secondary-btn">
            Explore Companies
          </button>
        </div>

        <div className="popular-tags">

          <span>Popular :</span>

          <button>React</button>

          <button>Node.js</button>

          <button>UI/UX</button>

          <button>Remote</button>

        </div>

      </div>

    </section>
  );
};

export default Hero;