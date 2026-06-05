import { useState } from "react";

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1>VOXLY</h1>

        <p>
          {isLogin
            ? "Sign in to continue"
            : "Create an account"}
        </p>

        <form>
          <input
            type="email"
            placeholder="Email"
          />

          <input
            type="password"
            placeholder="Password"
          />

          <button type="submit">
            {isLogin ? "Login" : "Register"}
          </button>
        </form>
        <div className="switch">
        {isLogin ? (
            <>
            Don't have an account?{" "}
            <span
            className="auth-link"
            onClick={() => setIsLogin(false)}
            >
            Sign up
            </span>
            </>
        ) : (
            <>
            Already have an account?{" "}
            <span
            className="auth-link"
            onClick={() => setIsLogin(true)}
            >
            Login
            </span>
            </>
        )}
        </div>
      </div>
    </div>
  );
}