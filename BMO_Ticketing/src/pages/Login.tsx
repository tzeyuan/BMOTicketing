import "../css/Login.css";
import { useState } from "react";


const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Login attempt with: " + email);
  };

  return (
    <div className="login-page">
        <div className="login-box">
            <h2>LOG IN</h2>

            <form onSubmit={handleSubmit}>
                <label>Email</label>
                <input
                    type="email"
                    placeholder="Username / Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />

                <label>Password</label>
                <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                />
                

                <div className="login-options">
                    <label>
                        <input
                            type="checkbox"
                            checked={remember}
                            onChange={() => setRemember(!remember)}
                        />
                        Remember me
                    </label>
                    <a href="#">Forgot password?</a>
                </div>

                <button className="login-btn" type="submit">Login</button>
            </form>
            
            <div className="divider">OR LOGIN WITH</div>
            <div className="social-login">
                <button className="facebook-btn">Facebook</button>
                <button className="google-btn">Google</button>
            </div>
            <div className="signup-prompt">
                <span>New user? </span>
                <a href="/signup">Sign Up now!</a>
            </div>

      </div>
    </div>
  );
};

export default Login;
