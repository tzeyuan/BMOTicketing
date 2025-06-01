import { Link } from "react-router-dom";
import "../css/Navbar.css";

const Navbar = () => {
  return (
    <header className="navbar">
      <div className="navbar-left">
        <Link to="/" className="navbar-brand">
          <img src="/Icon.png" alt="Logo" className="navbar-logo" />
          <h1 className="navbar-title">BMO Ticketing</h1>
        </Link>
      </div>

      <nav className="navbar-links">
        <Link to="/concerts">Concerts</Link>
        <Link to="/events">Events</Link>
        <Link to="/learn">Learn More</Link>
      </nav>
      
      <div className="navbar-auth">
        <Link to="/login" className="login-btn">Log In</Link>
        <Link to="/signup" className="signup-btn">Sign Up</Link>
      </div>
    </header>
  );
};

export default Navbar;
