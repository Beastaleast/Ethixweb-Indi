
import { supabase } from "../config/supabase.js";

const adminEmails = new Set(
  (process.env.ADMIN_EMAILS || "")
    .split(",")
    .map((email) => email.trim().toLowerCase())
    .filter(Boolean)
);

export async function requireAdmin(req, res, next) {
  const authorization = req.get("authorization") || "";
  const match = authorization.match(/^Bearer\s+(\S+)$/i);

  if (!match) {
    return res.status(401).json({
      message: "Authentication is required.",
    });
  }

  if (adminEmails.size === 0) {
    return res.status(503).json({
      message: "Admin access is not configured.",
    });
  }

  try {
    const { data, error } = await supabase.auth.getUser(
      match[1]
    );

    if (error || !data.user) {
      return res.status(401).json({
        message: "Your session is invalid or has expired.",
      });
    }

    const email = data.user.email?.toLowerCase();

    if (!email || !adminEmails.has(email)) {
      return res.status(403).json({
        message: "You are not authorized to manage leads.",
      });
    }

    req.adminUser = data.user;
    next();
  } catch (error) {
    console.error("Admin authentication failed:", error.message);

    return res.status(500).json({
      message: "Unable to verify your session.",
    });
  }
}
