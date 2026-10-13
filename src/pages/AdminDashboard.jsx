
import { useCallback, useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Inbox,
  Users,
  CheckCircle2,
  Clock3,
  Search,
  RefreshCw,
  LogOut,
  Trash2,
  ExternalLink,
  Menu,
  X,
  ArrowUpRight,
  ShieldCheck,
  Building2,
  Mail,
  Phone,
  CalendarDays,
  CircleAlert,
} from "lucide-react";
import { supabase } from "../lib/supabase";
import "./Admin.css";

const STATUSES = ["new", "contacted", "qualified", "closed"];

const API_URL = (
  import.meta.env.VITE_API_URL || "http://localhost:5000"
).replace(/\/+$/, "");

function formatDate(value) {
  if (!value) return "—";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) return "—";

  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(date);
}

function getLeadArray(payload) {
  if (Array.isArray(payload)) return payload;
  if (Array.isArray(payload?.leads)) return payload.leads;
  if (Array.isArray(payload?.data)) return payload.data;
  return [];
}

export default function AdminDashboard() {
  const navigate = useNavigate();

  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [updatingId, setUpdatingId] = useState("");
  const [deletingId, setDeletingId] = useState("");

  const getAccessToken = useCallback(async () => {
    const {
      data: { session },
      error: sessionError,
    } = await supabase.auth.getSession();

    if (sessionError || !session?.access_token) {
      throw new Error("Your session has expired. Please sign in again.");
    }

    return session.access_token;
  }, []);

  const fetchLeads = useCallback(async (showRefresh = false) => {
    if (showRefresh) {
      setRefreshing(true);
    } else {
      setLoading(true);
    }

    setError("");

    try {
      const token = await getAccessToken();

      const response = await fetch(`${API_URL}/api/admin/leads`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 401) {
        await supabase.auth.signOut();
        navigate("/admin/login", { replace: true });
        return;
      }

      if (response.status === 403) {
        throw new Error("You are not authorised to view these leads.");
      }

      if (!response.ok) {
        throw new Error("Unable to load leads. Please try again.");
      }

      const payload = await response.json();
      setLeads(getLeadArray(payload));
    } catch (err) {
      setError(err.message || "Unable to load leads.");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [getAccessToken, navigate]);

  useEffect(() => {
    fetchLeads();
  }, [fetchLeads]);

  const stats = useMemo(() => {
    const total = leads.length;
    const count = (status) =>
      leads.filter((lead) => lead.status === status).length;

    return [
      {
        label: "Total enquiries",
        value: total,
        note: "All loaded leads",
        icon: Inbox,
        tone: "red",
      },
      {
        label: "New enquiries",
        value: count("new"),
        note: "Awaiting follow-up",
        icon: Clock3,
        tone: "amber",
      },
      {
        label: "Contacted",
        value: count("contacted"),
        note: "Follow-up started",
        icon: Users,
        tone: "blue",
      },
      {
        label: "Qualified",
        value: count("qualified"),
        note: "Potential opportunities",
        icon: CheckCircle2,
        tone: "green",
      },
    ];
  }, [leads]);

  const filteredLeads = useMemo(() => {
    const query = search.trim().toLowerCase();

    return leads.filter((lead) => {
      const matchesStatus =
        statusFilter === "all" || lead.status === statusFilter;

      const searchable = [
        lead.name,
        lead.email,
        lead.phone,
        lead.company,
        lead.service,
        lead.message,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      return matchesStatus && searchable.includes(query);
    });
  }, [leads, search, statusFilter]);

  async function updateStatus(leadId, status) {
    setUpdatingId(leadId);
    setError("");

    try {
      const token = await getAccessToken();

      const response = await fetch(
        `${API_URL}/api/admin/leads/${encodeURIComponent(leadId)}`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status }),
        }
      );

      if (!response.ok) {
        throw new Error("Could not update the lead status.");
      }

      setLeads((current) =>
        current.map((lead) =>
          lead.id === leadId ? { ...lead, status } : lead
        )
      );
    } catch (err) {
      setError(err.message || "Status update failed.");
    } finally {
      setUpdatingId("");
    }
  }

  async function deleteLead(leadId) {
    const confirmed = window.confirm(
      "Delete this enquiry permanently? This action cannot be undone."
    );

    if (!confirmed) return;

    setDeletingId(leadId);
    setError("");

    try {
      const token = await getAccessToken();

      const response = await fetch(
        `${API_URL}/api/admin/leads/${encodeURIComponent(leadId)}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Could not delete this enquiry.");
      }

      setLeads((current) =>
        current.filter((lead) => lead.id !== leadId)
      );
    } catch (err) {
      setError(err.message || "Delete failed.");
    } finally {
      setDeletingId("");
    }
  }

  async function handleSignOut() {
    const { error: signOutError } = await supabase.auth.signOut();

    if (signOutError) {
      setError("Unable to sign out. Please try again.");
      return;
    }

    navigate("/admin/login", { replace: true });
  }

  return (
    <main className="crm-shell">
      {sidebarOpen && (
        <button
          type="button"
          className="crm-mobile-backdrop"
          aria-label="Close navigation"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside className={`crm-sidebar ${sidebarOpen ? "is-open" : ""}`}>
        <Link
          to="/"
          className="crm-brand"
          onClick={() => setSidebarOpen(false)}
        >
          <span className="crm-brand-symbol">E.</span>
          <span className="crm-brand-name">
            ETHIXWEB
            <small>MANAGEMENT</small>
          </span>
        </Link>

        <div className="crm-workspace-label">WORKSPACE</div>

        <nav className="crm-nav" aria-label="Admin navigation">
          <Link
            to="/admin"
            className="crm-nav-item active"
            onClick={() => setSidebarOpen(false)}
          >
            <LayoutDashboard size={18} />
            Overview
            <ArrowUpRight className="crm-nav-arrow" size={15} />
          </Link>

          <button
            type="button"
            className="crm-nav-item"
            onClick={() => {
              setStatusFilter("all");
              setSidebarOpen(false);
              document
                .getElementById("crm-leads")
                ?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            <Inbox size={18} />
            All enquiries
            <span className="crm-nav-count">{leads.length}</span>
          </button>

          <button
            type="button"
            className="crm-nav-item"
            onClick={() => {
              setStatusFilter("new");
              setSidebarOpen(false);
              document
                .getElementById("crm-leads")
                ?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            <Clock3 size={18} />
            New enquiries
            <span className="crm-nav-count">
              {leads.filter((lead) => lead.status === "new").length}
            </span>
          </button>
        </nav>

        <div className="crm-sidebar-bottom">
          <div className="crm-security-card">
            <ShieldCheck size={19} />
            <strong>Secure workspace</strong>
            <p>Administrator access is protected.</p>
          </div>

          <button
            type="button"
            className="crm-signout-button"
            onClick={handleSignOut}
          >
            <LogOut size={17} />
            Sign out
          </button>
        </div>
      </aside>

      <section className="crm-main">
        <header className="crm-topbar">
          <div className="crm-topbar-left">
            <button
              type="button"
              className="crm-menu-button"
              aria-label={sidebarOpen ? "Close menu" : "Open menu"}
              onClick={() => setSidebarOpen((open) => !open)}
            >
              {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
            </button>

            <div>
              <p className="crm-breadcrumb">Workspace / Overview</p>
              <span className="crm-topbar-title">Admin dashboard</span>
            </div>
          </div>

          <div className="crm-topbar-right">
            <span className="crm-live-indicator">
              <span />
              Connected workspace
            </span>

            <div className="crm-avatar">E</div>
          </div>
        </header>

        <div className="crm-content">
          <section className="crm-welcome">
            <div>
              <p className="crm-overline">OVERVIEW</p>
              <h1>Your enquiries, at a glance.</h1>
              <p>
                Review incoming enquiries and keep every opportunity
                moving forward.
              </p>
            </div>

            <button
              type="button"
              className="crm-refresh-button"
              onClick={() => fetchLeads(true)}
              disabled={refreshing || loading}
            >
              <RefreshCw
                size={16}
                className={refreshing ? "crm-spinning" : ""}
              />
              {refreshing ? "Refreshing..." : "Refresh data"}
            </button>
          </section>

          {error && (
            <div className="crm-error-banner" role="alert">
              <CircleAlert size={18} />
              <span>{error}</span>
              <button
                type="button"
                onClick={() => setError("")}
                aria-label="Dismiss error"
              >
                <X size={17} />
              </button>
            </div>
          )}

          <section className="crm-stats-grid" aria-label="Lead statistics">
            {stats.map((stat) => {
              const Icon = stat.icon;

              return (
                <article className="crm-stat-card" key={stat.label}>
                  <div className="crm-stat-top">
                    <span>{stat.label}</span>
                    <span className={`crm-stat-icon ${stat.tone}`}>
                      <Icon size={19} />
                    </span>
                  </div>

                  <strong className="crm-stat-number">
                    {loading ? "—" : stat.value}
                  </strong>

                  <p>{stat.note}</p>
                </article>
              );
            })}
          </section>

          <section className="crm-leads-section" id="crm-leads">
            <div className="crm-leads-heading">
              <div>
                <p className="crm-overline">CUSTOMER RELATIONSHIPS</p>
                <h2>Enquiry management</h2>
                <p>Search, review, and update your incoming leads.</p>
              </div>

              <span className="crm-record-count">
                {loading ? "Loading..." : `${filteredLeads.length} records`}
              </span>
            </div>

            <div className="crm-toolbar">
              <label className="crm-search">
                <Search size={18} />
                <input
                  type="search"
                  placeholder="Search name, email, company..."
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                />
              </label>

              <label className="crm-filter">
                <span>Status</span>
                <select
                  value={statusFilter}
                  onChange={(event) => setStatusFilter(event.target.value)}
                >
                  <option value="all">All statuses</option>
                  {STATUSES.map((status) => (
                    <option key={status} value={status}>
                      {status.charAt(0).toUpperCase() + status.slice(1)}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            <div className="crm-table-wrap">
              <table className="crm-table">
                <thead>
                  <tr>
                    <th>Contact</th>
                    <th>Service / Company</th>
                    <th>Date received</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {loading ? (
                    <tr>
                      <td colSpan="5" className="crm-empty-state">
                        <RefreshCw size={20} className="crm-spinning" />
                        <strong>Loading enquiries</strong>
                        <span>Fetching the latest records...</span>
                      </td>
                    </tr>
                  ) : filteredLeads.length === 0 ? (
                    <tr>
                      <td colSpan="5" className="crm-empty-state">
                        <Inbox size={24} />
                        <strong>No enquiries found</strong>
                        <span>
                          {leads.length === 0
                            ? "New website enquiries will appear here."
                            : "Try changing your search or status filter."}
                        </span>
                      </td>
                    </tr>
                  ) : (
                    filteredLeads.map((lead) => (
                      <tr key={lead.id}>
                        <td>
                          <div className="crm-contact">
                            <span className="crm-contact-avatar">
                              {(lead.name || "L").trim().charAt(0).toUpperCase()}
                            </span>

                            <div className="crm-contact-details">
                              <strong>{lead.name || "Unnamed contact"}</strong>

                              <span>
                                <Mail size={13} />
                                {lead.email || "No email provided"}
                              </span>

                              {lead.phone && (
                                <span>
                                  <Phone size={13} />
                                  {lead.phone}
                                </span>
                              )}
                            </div>
                          </div>
                        </td>

                        <td>
                          <div className="crm-service-cell">
                            <strong>{lead.service || "General enquiry"}</strong>
                            {lead.company && (
                              <span>
                                <Building2 size={13} />
                                {lead.company}
                              </span>
                            )}
                            {lead.budget && (
                              <small>Budget: {lead.budget}</small>
                            )}
                            {lead.message && (
                              <details className="crm-message">
                                <summary>Read message</summary>
                                <p>{lead.message}</p>
                              </details>
                            )}
                          </div>
                        </td>

                        <td>
                          <span className="crm-date">
                            <CalendarDays size={14} />
                            {formatDate(lead.created_at)}
                          </span>
                        </td>

                        <td>
                          <label className="crm-status-control">
                            <span className={`crm-status-dot ${lead.status || "new"}`} />
                            <select
                              aria-label={`Status for ${lead.name || "lead"}`}
                              className={`crm-status-select ${lead.status || "new"}`}
                              value={lead.status || "new"}
                              disabled={updatingId === lead.id}
                              onChange={(event) =>
                                updateStatus(lead.id, event.target.value)
                              }
                            >
                              {STATUSES.map((status) => (
                                <option key={status} value={status}>
                                  {status.charAt(0).toUpperCase() + status.slice(1)}
                                </option>
                              ))}
                            </select>
                          </label>
                        </td>

                        <td>
                          <div className="crm-row-actions">
                            {lead.email && (
                              <a
                                className="crm-icon-button"
                                href={`mailto:${lead.email}`}
                                aria-label={`Email ${lead.name || "lead"}`}
                                title="Send email"
                              >
                                <ExternalLink size={16} />
                              </a>
                            )}

                            <button
                              type="button"
                              className="crm-icon-button danger"
                              aria-label={`Delete ${lead.name || "lead"}`}
                              title="Delete enquiry"
                              disabled={
                                deletingId === lead.id ||
                                updatingId === lead.id
                              }
                              onClick={() => deleteLead(lead.id)}
                            >
                              {deletingId === lead.id ? (
                                <RefreshCw size={16} className="crm-spinning" />
                              ) : (
                                <Trash2 size={16} />
                              )}
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            <p className="crm-table-footnote">
              <ShieldCheck size={14} />
              Enquiry information is available to authorised administrators.
            </p>
          </section>

          <footer className="crm-footer">
            <span>ETHIXWEB MANAGEMENT</span>
            <span>Lead management workspace</span>
          </footer>
        </div>
      </section>
    </main>
  );
}
