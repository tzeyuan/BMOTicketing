import { Link } from "react-router-dom";
import "../css/Navbar.css";

const Navbar = () => {
  const username = localStorage.getItem("username");

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
