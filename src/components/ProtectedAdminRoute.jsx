
import { useEffect, useState } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { supabase } from "../lib/supabase";

const API_URL = (
  import.meta.env.VITE_API_URL || "http://localhost:5000"
).replace(/\/+$/, "");

export default function ProtectedAdminRoute() {
  const [status, setStatus] = useState("checking");
  const location = useLocation();

  useEffect(() => {
    let active = true;

    async function verifyAccess() {
      try {
        const {
          data: { session },
          error,
        } = await supabase.auth.getSession();

        if (error) throw error;

        if (!session?.access_token) {
          if (active) setStatus("unauthenticated");
          return;
        }

        // The backend, not React, decides whether this user is an admin.
        const response = await fetch(`${API_URL}/api/admin/verify`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${session.access_token}`,
          },
          cache: "no-store",
        });

        if (response.status === 401) {
          if (active) setStatus("unauthenticated");
          return;
        }

        if (response.status === 403) {
          if (active) setStatus("forbidden");
          return;
        }

        if (!response.ok) {
          throw new Error("Unable to verify administrator access");
        }

        if (active) setStatus("authorized");
      } catch (error) {
        console.error("Admin access verification failed:", error);
        if (active) setStatus("error");
      }
    }

    verifyAccess();

    return () => {
      active = false;
    };
  }, []);

  if (status === "checking") {
    return <main className="container">Verifying access…</main>;
  }

  if (status === "unauthenticated") {
    return (
      <Navigate
        to="/admin/login"
        replace
        state={{ from: location }}
      />
    );
  }

  if (status === "forbidden") {
    return <Navigate to="/" replace />;
  }

  if (status === "error") {
    return (
      <main className="container">
        <h2>Admin access could not be verified</h2>
        <p>Please refresh the page. The dashboard remains locked until access can be verified.</p>
      </main>
    );
  }

  return <Outlet />;
}
