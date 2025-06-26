import { Link } from "react-router-dom";
import "../css/Navbar.css";
import { useContext} from "react";
import { AuthContext } from "../AuthContext";

const Navbar = () => {
  const { username } = useContext(AuthContext);

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
            <img src="/default_profilepic.png" alt="Profile" className="navbar-profile-icon" />
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
