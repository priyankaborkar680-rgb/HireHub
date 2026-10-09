import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import "./Header.css";

const Header = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const token = localStorage.getItem("token");
  let user = null;

  try {
    user = JSON.parse(localStorage.getItem("user") || "null");
  } catch {
    user = null;
  }

  const closeMenu = () => setMenuOpen(false);

  const handleNavigate = (path) => {
    closeMenu();
    navigate(path);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    closeMenu();
    navigate("/");
    window.location.reload();
  };

  return (
    <header className="header">
      <div className="header-container">
        <Link to="/" className="logo" onClick={closeMenu}>
          Hire<span>Hub</span>
        </Link>

        <button
          type="button"
          className="menu-toggle"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          aria-controls="main-navigation"
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? "✕" : "☰"}
        </button>

        <nav
          id="main-navigation"
          className={`nav-menu ${menuOpen ? "active" : ""}`}
        >
          <NavLink to="/" end onClick={closeMenu}>
            Home
          </NavLink>

          <NavLink to="/jobs" onClick={closeMenu}>
            Jobs
          </NavLink>

          <NavLink to="/companies" onClick={closeMenu}>
            Companies
          </NavLink>

          <NavLink to="/about" onClick={closeMenu}>
            About
          </NavLink>

          {token && user?.role === "jobseeker" && (
            <NavLink to="/my-applications" onClick={closeMenu}>
              My Applications
            </NavLink>
          )}

          {token && user?.role === "employer" && (
            <>
              <NavLink to="/post-job" onClick={closeMenu}>
                Post Job
              </NavLink>

              <NavLink to="/employer-dashboard" onClick={closeMenu}>
                Dashboard
              </NavLink>
            </>
          )}

          <div className="mobile-actions">
            {!token ? (
              <>
                <button
                  type="button"
                  className="login-link"
                  onClick={() => handleNavigate("/login")}
                >
                  Login
                </button>

                <button
                  type="button"
                  className="register-link"
                  onClick={() => handleNavigate("/register")}
                >
                  Sign Up
                </button>
              </>
            ) : (
              <>
                <span className="header-user">
                  Hi, {user?.name || "User"}
                </span>

                <button
                  type="button"
                  className="logout-button"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </>
            )}
          </div>
        </nav>

        <div className="header-actions">
          {!token ? (
            <>
              <button
                type="button"
                className="login-link"
                onClick={() => navigate("/login")}
              >
                Login
              </button>

              <button
                type="button"
                className="register-link"
                onClick={() => navigate("/register")}
              >
                Sign Up
              </button>
            </>
          ) : (
            <>
              <span className="header-user">
                Hi, {user?.name || "User"}
              </span>

              <button
                type="button"
                className="logout-button"
                onClick={handleLogout}
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;