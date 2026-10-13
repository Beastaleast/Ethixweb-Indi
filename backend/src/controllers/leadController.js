
import { z } from "zod";
import { supabase } from "../config/supabase.js";

const leadSchema = z.object({
  name: z.string().trim().min(2).max(100),
  email: z.string().trim().email().max(254),

  phone: z.string().trim().max(30).optional().default(""),
  company: z.string().trim().max(150).optional().default(""),

  service: z.enum([
    "Websites & Web Apps",
    "AI & Automation",
    "Digital Marketing & SEO",
    "CRM & Integrations",
    "Other",
  ]),

  budget: z.enum([
    "",
    "Under ₹25,000",
    "₹25,000–₹75,000",
    "₹75,000–₹2,00,000",
    "Above ₹2,00,000",
    "Not sure yet",
  ]).optional().default(""),

  message: z.string().trim().min(20).max(5000),
});

export async function createLead(req, res) {
  // Silently discard submissions that fill the honeypot.
  // Real users leave this field empty.
  if (
    typeof req.body?.website === "string" &&
    req.body.website.trim().length > 0
  ) {
    return res.status(202).json({
      message: "Enquiry received.",
    });
  }

  const result = leadSchema.safeParse(req.body ?? {});

  if (!result.success) {
    const errors = {};

    for (const issue of result.error.issues) {
      const field = String(issue.path[0] ?? "form");

      if (!errors[field]) {
        errors[field] = issue.message;
      }
    }

    return res.status(400).json({
      message: "Please check your submitted details.",
      errors,
    });
  }

  const lead = {
    ...result.data,
    phone: result.data.phone || null,
    company: result.data.company || null,
    budget: result.data.budget || null,
    status: "new",
  };

  try {
    const { data, error } = await supabase
      .from("leads")
      .insert(lead)
      .select("id")
      .single();

    if (error) {
      console.error("Lead database insert failed:", error.message);

      return res.status(500).json({
        message: "We couldn't save your enquiry. Please try again.",
      });
    }

    return res.status(201).json({
      message: "Your enquiry was submitted successfully.",
      id: data.id,
    });
  } catch (error) {
    console.error("Unexpected lead submission error:", error.message);

    return res.status(500).json({
      message: "An unexpected error occurred. Please try again.",
    });
  }
}
