import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { login, register } from "../services/auth";

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({
  email: "",
  password: "",
});
const navigate = useNavigate();


const handleChange = (e) => {
  setForm({
    ...form,
    [e.target.name]: e.target.value,
  });
};
const [error, setError] = useState("");
const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const result = isLogin
      ? await login(form.email, form.password)
      : await register(form.email, form.password);

    console.log(result);

if (result.ERROR || result.error) {

  const msg = result.MSG || result.ERROR;

  if (msg.includes("duplicate key")) {
    setError("An account with this email already exists.");
  } else if (msg.includes("no rows in result set")) {
  setError("Invalid email or password.");
} else {
    setError(msg);
  }

  return;
}

setError("");
if (result.message === "success") {
  navigate("/dashboard");
}
  } catch (error) {
  console.error(error);
  setError("Unable to connect to server.");
}
};


  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1>VOXLY</h1>

        <p>
          {isLogin
            ? "Sign in to continue"
            : "Create an account"}
        </p>

        {error && (
  <div className="error-message">
    {error}
  </div>
)}

        <form onSubmit={handleSubmit}>
            <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
            />

            <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
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