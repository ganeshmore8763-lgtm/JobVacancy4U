import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";
import "./AdminAuth.css";

function ResetPassword() {
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleUpdatePassword = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    if (password.length < 6) {
      alert("Password must be at least 6 characters.");
      return;
    }

    setLoading(true);

    const { error } = await supabase.auth.updateUser({
      password: password,
    });

    if (error) {
      console.error("PASSWORD UPDATE ERROR:", error);
      alert("Password update failed: " + error.message);
      setLoading(false);
      return;
    }

    alert("Password updated successfully!");

    await supabase.auth.signOut();

    navigate("/admin-login");

    setLoading(false);
  };

  return (
    <div className="admin-auth-page">
      <div className="admin-auth-card">

        <h1>Set New Password</h1>

        <p>
          Enter your new password below.
        </p>

        <form onSubmit={handleUpdatePassword}>

          <label>New Password</label>

          <input
            type="password"
            placeholder="Enter new password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            minLength="6"
            required
          />

          <label>Confirm Password</label>

          <input
            type="password"
            placeholder="Confirm new password"
            value={confirmPassword}
            onChange={(e) =>
              setConfirmPassword(e.target.value)
            }
            minLength="6"
            required
          />

          <button
            type="submit"
            disabled={loading}
          >
            {loading
              ? "Updating..."
              : "Update Password"}
          </button>

        </form>

      </div>
    </div>
  );
}

export default ResetPassword;