import { Router } from "express";
import { z } from "zod";
import { supabase } from "../config/supabase.js";
import { requireAdmin } from "../middleware/requireAdmin.js";

const router = Router();

const statusSchema = z.enum(["new", "contacted", "qualified", "closed"]);

const idSchema = z.string().uuid();

router.use(requireAdmin);

// GET /api/admin/leads
router.get("/", async (req, res) => {
  const status = req.query.status;

  router.get("/verify", requireAdmin, (req, res) => {
    res.set("Cache-Control", "no-store");
    return res.status(200).json({ authenticated: true });
  });

  if (
    status !== undefined &&
    status !== "all" &&
    !statusSchema.safeParse(status).success
  ) {
    return res.status(400).json({
      message: "Invalid lead status filter.",
    });
  }

  try {
    let query = supabase
      .from("leads")
      .select(
        "id,name,email,phone,company,service,budget,message,status,created_at,updated_at",
      )
      .order("created_at", { ascending: false })
      .limit(200);

    if (status && status !== "all") {
      query = query.eq("status", status);
    }

    const { data, error } = await query;

    if (error) throw error;

    return res.json({ leads: data });
  } catch (error) {
    console.error("Failed to load leads:", error.message);

    return res.status(500).json({
      message: "Unable to load enquiries.",
    });
  }
});

// PATCH /api/admin/leads/:id
router.patch("/:id", async (req, res) => {
  const parsedId = idSchema.safeParse(req.params.id);
  const parsedStatus = statusSchema.safeParse(req.body?.status);

  if (!parsedId.success || !parsedStatus.success) {
    return res.status(400).json({
      message: "Invalid lead ID or status.",
    });
  }

  try {
    const { data, error } = await supabase
      .from("leads")
      .update({
        status: parsedStatus.data,
        updated_at: new Date().toISOString(),
      })
      .eq("id", parsedId.data)
      .select("id,status,updated_at")
      .maybeSingle();

    if (error) throw error;

    if (!data) {
      return res.status(404).json({
        message: "Lead not found.",
      });
    }

    return res.json({
      message: "Lead status updated.",
      lead: data,
    });
  } catch (error) {
    console.error("Failed to update lead:", error.message);

    return res.status(500).json({
      message: "Unable to update the lead.",
    });
  }
});

// DELETE /api/admin/leads/:id
router.delete("/:id", async (req, res) => {
  const parsedId = idSchema.safeParse(req.params.id);

  if (!parsedId.success) {
    return res.status(400).json({
      message: "Invalid lead ID.",
    });
  }

  try {
    const { data, error } = await supabase
      .from("leads")
      .delete()
      .eq("id", parsedId.data)
      .select("id")
      .maybeSingle();

    if (error) throw error;

    if (!data) {
      return res.status(404).json({
        message: "Lead not found.",
      });
    }

    return res.json({
      message: "Lead deleted successfully.",
    });
  } catch (error) {
    console.error("Failed to delete lead:", error.message);

    return res.status(500).json({
      message: "Unable to delete the lead.",
    });
  }
});

export default router;
