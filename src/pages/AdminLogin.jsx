
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  LockKeyhole,
  ArrowLeft,
  ShieldCheck,
  Users,
  Inbox,
} from "lucide-react";
import { supabase } from "../lib/supabase";
import "./Admin.css";

export default function AdminLogin() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      const { data, error: loginError } =
        await supabase.auth.signInWithPassword({
          email: email.trim(),
          password,
        });

      if (loginError) throw loginError;

      const apiUrl = (
        import.meta.env.VITE_API_URL || "http://localhost:5000"
      ).replace(/\/+$/, "");

      const response = await fetch(`${apiUrl}/api/admin/leads`, {
        headers: {
          Authorization: `Bearer ${data.session.access_token}`,
        },
      });

      if (!response.ok) {
        await supabase.auth.signOut();

        if (response.status === 403) {
          throw new Error(
            "This account is not authorized as an admin."
          );
        }

        throw new Error(
          response.status === 401
            ? "Your session could not be verified."
            : "Unable to access the admin dashboard."
        );
      }

      navigate("/admin", { replace: true });
    } catch (err) {
      setError(err.message || "Unable to sign in.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="admin-login-page">
      {/* Left: Brand and portal information */}
      <section className="admin-login-brand">
        <Link to="/" className="admin-brand-logo">
          <span className="admin-brand-symbol">E.</span>
          <span>ETHIXWEB</span>
        </Link>

        <div className="admin-brand-content">
          <span className="admin-eyebrow">
            <span className="admin-status-dot" />
            MANAGEMENT PORTAL
          </span>

          <h1>
            Your business.
            <span> Better connected.</span>
          </h1>

          <p className="admin-brand-description">
            A dedicated workspace to manage customer enquiries,
            organise incoming leads, and keep business conversations
            moving forward.
          </p>

          <div className="admin-feature-list">
            <div className="admin-feature">
              <span className="admin-feature-icon">
                <Inbox size={20} />
              </span>
              <span>
                <strong>Enquiry management</strong>
                <small>Keep customer requests organised.</small>
              </span>
            </div>

            <div className="admin-feature">
              <span className="admin-feature-icon">
                <Users size={20} />
              </span>
              <span>
                <strong>Lead tracking</strong>
                <small>Review and manage incoming leads.</small>
              </span>
            </div>

            <div className="admin-feature">
              <span className="admin-feature-icon">
                <ShieldCheck size={20} />
              </span>
              <span>
                <strong>Restricted access</strong>
                <small>For authorised administrators only.</small>
              </span>
            </div>
          </div>
        </div>

        <p className="admin-brand-footer">
          ETHIXWEB <span>·</span> MANAGEMENT SYSTEM
        </p>
      </section>

      {/* Right: Existing sign-in functionality */}
      <section className="admin-login-main">
        <Link to="/" className="admin-back-link">
          <ArrowLeft size={17} />
          Back to website
        </Link>

        <div className="admin-login-card">
          <div className="admin-login-icon">
            <LockKeyhole size={25} />
          </div>

          <p className="admin-form-eyebrow">
            ETHIXWEB MANAGEMENT
          </p>

          <h2>Admin sign in</h2>

          <p className="admin-subtitle">
            Welcome back. Sign in with your authorised administrator
            account.
          </p>

          <form onSubmit={handleSubmit}>
            <div className="admin-form-field">
              <label htmlFor="admin-email">Email address</label>
              <input
                id="admin-email"
                type="email"
                placeholder="admin@example.com"
                autoComplete="username"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
              />
            </div>

            <div className="admin-form-field">
              <label htmlFor="admin-password">Password</label>
              <input
                id="admin-password"
                type="password"
                placeholder="Enter your password"
                autoComplete="current-password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
              />
            </div>

            {error && (
              <p className="admin-error" role="alert">
                {error}
              </p>
            )}

            <button type="submit" disabled={loading}>
              {loading ? "Verifying..." : "Sign in securely"}
            </button>
          </form>

          <p className="admin-card-note">
            <LockKeyhole size={14} />
            Your account must have administrator access.
          </p>
        </div>

        <p className="admin-login-security">
          <ShieldCheck size={15} />
          Secure administrator access
        </p>
      </section>
    </main>
  );
}
