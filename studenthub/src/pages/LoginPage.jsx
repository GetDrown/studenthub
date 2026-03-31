// src/pages/Login.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (!form.username || !form.password) {
      setError("Both fields are required.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Login failed.");
        return;
      }

      // Save token + user to global auth context
      login(data.token, data.user);
      navigate("/"); // redirect to home after successful login
    } catch (err) {
      setError("Cannot connect to server. Is the backend running?");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={styles.wrapper}>
      <div style={styles.card}>
        <h2 style={styles.title}>StudentHub</h2>
        <p style={styles.subtitle}>Sign in to continue</p>

        {error && <p style={styles.error}>{error}</p>}

        <form onSubmit={handleSubmit} style={styles.form}>
          <label style={styles.label}>Username</label>
          <input
            name="username"
            value={form.username}
            onChange={handleChange}
            style={styles.input}
            placeholder="Enter username"
            autoComplete="username"
          />

          <label style={styles.label}>Password</label>
          <input
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            style={styles.input}
            placeholder="Enter password"
            autoComplete="current-password"
          />

          <button type="submit" disabled={loading} style={styles.button}>
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <p style={styles.hint}>
          Default credentials: <strong>admin</strong> /{" "}
          <strong>admin123</strong>
        </p>
      </div>
    </div>
  );
}

const styles = {
  wrapper: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f0f4fa",
  },
  card: {
    backgroundColor: "#fff",
    padding: "2.5rem",
    borderRadius: "12px",
    boxShadow: "0 4px 24px rgba(0,0,0,0.10)",
    width: "100%",
    maxWidth: "400px",
  },
  title: {
    margin: 0,
    fontSize: "1.8rem",
    color: "#1B2A4A",
    fontWeight: "bold",
    textAlign: "center",
  },
  subtitle: {
    textAlign: "center",
    color: "#94A3B8",
    marginBottom: "1.5rem",
    marginTop: "0.3rem",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "0.6rem",
  },
  label: {
    fontSize: "0.9rem",
    fontWeight: "bold",
    color: "#334155",
  },
  input: {
    padding: "0.6rem 0.8rem",
    fontSize: "1rem",
    borderRadius: "6px",
    border: "1px solid #CBD5E1",
    outline: "none",
  },
  button: {
    marginTop: "0.8rem",
    padding: "0.75rem",
    backgroundColor: "#2563EB",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    fontSize: "1rem",
    fontWeight: "bold",
    cursor: "pointer",
  },
  error: {
    color: "#DC2626",
    backgroundColor: "#FEF2F2",
    border: "1px solid #FECACA",
    borderRadius: "6px",
    padding: "0.5rem 0.75rem",
    fontSize: "0.9rem",
    marginBottom: "0.8rem",
  },
  hint: {
    textAlign: "center",
    marginTop: "1rem",
    fontSize: "0.82rem",
    color: "#94A3B8",
  },
};

export default Login;
