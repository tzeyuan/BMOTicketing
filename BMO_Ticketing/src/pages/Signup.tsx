import "../css/Signup.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agree, setAgree] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!agree) {
      alert("Please read and agree to the terms and conditions.");
      return;
    }
    alert("Sign Up successful with email: " + email);
  };

  return (
    <div className="signup-page">
      <div className="signup-box">
        <h2>SIGN UP</h2>

        <form onSubmit={handleSubmit}>
          <label>Username</label>
          <input
            type="text"
            placeholder="Your Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />

          <label>Email</label>
          <input
            type="email"
            placeholder="example@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label>Password</label>
          <input
            type="password"
            placeholder="Create a password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <div className="signup-options">
            <label>
              <input
                type="checkbox"
                checked={agree}
                onChange={() => setAgree(!agree)}
              />
              I agree to the terms and conditions
            </label>
          </div>

          <button className="signup-btn" type="submit">Sign Up</button>
        </form>

        <div className="divider">OR SIGN UP WITH</div>
        <div className="social-signup">
          <button className="facebook-btn">Facebook</button>
          <button className="google-btn">Google</button>
        </div>

        <div className="login-prompt">
          <span>Already have an account? </span>
          <a href="/login">Log In</a>
        </div>
      </div>
    </div>
  );
};

export default Signup;
