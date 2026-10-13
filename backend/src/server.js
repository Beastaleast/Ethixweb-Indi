
import "dotenv/config";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import leadRoutes from "./routes/leadRoutes.js";
import adminLeadRoutes from "./routes/adminLeadRoutes.js";
import { requireAdmin } from "./middleware/requireAdmin.js";


if (!process.env.SUPABASE_URL ||
    !process.env.SUPABASE_SERVICE_ROLE_KEY) {
  console.error(
    "Missing Supabase configuration. Check backend/.env."
  );
  process.exit(1);
}

const app = express();
const PORT = Number(process.env.PORT) || 5000;
const frontendUrl =
  process.env.FRONTEND_URL || "http://localhost:5173";

app.disable("x-powered-by");

app.use(helmet());


app.use(
  cors({
    origin: frontendUrl,
    methods: ["GET", "POST", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);


app.use(express.json({ limit: "20kb" }));

app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    message: "Ethixweb API is running.",
  });
});

app.use("/api/leads", leadRoutes);
app.use("/api/admin/leads", adminLeadRoutes);

app.get("/api/admin/verify", requireAdmin, (req, res) => {
  res.set("Cache-Control", "no-store");

  return res.status(200).json({
    authenticated: true,
  });
});
// Handle unknown endpoints.
app.use((req, res) => {
  res.status(404).json({
    message: "API endpoint not found.",
  });
});

// Handle malformed JSON and unexpected Express errors.
app.use((error, req, res, next) => {
  if (res.headersSent) {
    return next(error);
  }

  if (error.status === 400 && error.type === "entity.parse.failed") {
    return res.status(400).json({
      message: "Invalid JSON request body.",
    });
  }

  if (error.status === 413) {
    return res.status(413).json({
      message: "Request body is too large.",
    });
  }

  console.error("API request error:", error.message);

  return res.status(500).json({
    message: "An unexpected server error occurred.",
  });
});

app.listen(PORT, () => {
  console.log(`Ethixweb API running on port ${PORT}`);
});


