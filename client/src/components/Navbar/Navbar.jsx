import "./Navbar.css";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar">

      {/* Logo */}
      <Link to="/" className="logo">
        Hire<span>Hub</span>
      </Link>

      {/* Navigation */}
      <ul className="nav-links">
        <li>
          <Link to="/">Home</Link>
        </li>

        <li>
          <Link to="/jobs">Jobs</Link>
        </li>

        <li>
          <Link to="/companies">Companies</Link>
        </li>

        <li>
          <Link to="/about">About</Link>
        </li>
      </ul>

      {/* Buttons */}
      <div className="nav-buttons">

        <Link to="/login" className="login-btn">
          Login
        </Link>

        <Link to="/register" className="register-btn">
          Register
        </Link>

      </div>

    </nav>
  );
};

export default Navbar;