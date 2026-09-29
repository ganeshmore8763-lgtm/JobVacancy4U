import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";
import "./AdminAuth.css";

function AdminLogin() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    setLoading(true);

    const { data, error } = await supabase
      .from("admin")
      .select("id")
      .eq("id", email.trim())
      .eq("password", password)
      .maybeSingle();

    if (error) {
      console.error("Login error:", error);
      alert("Database Error: " + error.message);
      setLoading(false);
      return;
    }

    if (!data) {
      alert("Invalid ID or Password");
      setLoading(false);
      return;
    }

    // Save admin login status
    localStorage.setItem("adminLoggedIn", "true");

    alert("Admin Login Successful!");

    navigate("/AdminDashboard");

    setLoading(false);
  };

  return (
    <div className="admin-auth-page">
      <div className="admin-auth-card">

        <h1>Admin Login</h1>

        <p>Login to manage job vacancies.</p>

        <form onSubmit={handleLogin}>

          <label>Email / Admin ID</label>

          <input
            type="email"
            placeholder="Enter admin email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label>Password</label>

          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button
            type="submit"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Admin Login"}
          </button>

        </form>

      </div>
    </div>
  );
}

export default AdminLogin;