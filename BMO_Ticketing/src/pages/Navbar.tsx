import { Link } from "react-router-dom";
import "../css/Navbar.css";
import { useEffect, useState } from "react";

const Navbar = () => {
  const [username, setUsername] = useState(localStorage.getItem("username"));

  useEffect(() => {
    const checkLogin = () => {
      const storedUser = localStorage.getItem("username");
      setUsername(storedUser);
    };

    // Listen to storage change (if other tabs change login)
    window.addEventListener("storage", checkLogin);

    // Poll every second for changes (in case login happens in same tab)
    const interval = setInterval(checkLogin, 1000);

    return () => {
      window.removeEventListener("storage", checkLogin);
      clearInterval(interval);
    };
  }, []);

  return (
    <nav className="navbar">
        <Link to="/" className="navbar-brand">
          <img src="/Icon.png" alt="Logo" className="navbar-logo" />
          <h1 className="navbar-title">BMO Ticketing</h1>
        </Link>
      

      <nav className="navbar-links">
        <Link to="/events">Concerts</Link>
        <Link to="/merchandise">Merchandise</Link>
        <Link to="/aboutus">About Us</Link>
      
      
      {username ? (
          <Link to="/profile">
            <img src="/profile-icon.png" alt="Profile" className="navbar-profile-icon" />
          </Link>
        ) : (
          <div className="navbar-auth">
            <Link to="/login" className="login-btn">Log In</Link>
            <Link to="/signup" className="signup-btn">Sign Up</Link>
          </div>
        )}
      </nav>
    </nav>
  );
};

export default Navbar;
