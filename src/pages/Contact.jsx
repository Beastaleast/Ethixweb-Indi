
import { useState } from "react";
import { useLocation } from "react-router-dom";
import {
  ArrowUpRight,
  CheckCircle2,
  Mail,
  MessageSquare,
  Send,
} from "lucide-react";
import "./Contact.css";

const serviceOptions = [
  "Websites & Web Apps",
  "AI & Automation",
  "Digital Marketing & SEO",
  "CRM & Integrations",
  "Other",
];

const initialForm = {
  name: "",
  email: "",
  phone: "",
  company: "",
  service: "",
  budget: "",
  message: "",
  website: "",
};

export default function Contact() {
  const location = useLocation();

  const [form, setForm] = useState(() => ({
    ...initialForm,
    service: serviceOptions.includes(location.state?.service)
      ? location.state.service
      : "",
  }));

  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState({
    type: "",
    message: "",
  });

  function handleChange(event) {
    const { name, value } = event.target;

    setForm((current) => ({
      ...current,
      [name]: value,
    }));

    setErrors((current) => ({
      ...current,
      [name]: "",
    }));

    setResult({ type: "", message: "" });
  }

  function validateForm() {
    const nextErrors = {};

    if (form.name.trim().length < 2) {
      nextErrors.name = "Enter your full name.";
    }

    if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())
    ) {
      nextErrors.email = "Enter a valid business email.";
    }

    if (!form.service) {
      nextErrors.service = "Please select a service.";
    }

    if (form.message.trim().length < 20) {
      nextErrors.message =
        "Please describe your project in at least 20 characters.";
    }

    return nextErrors;
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const validationErrors = validateForm();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      setResult({
        type: "error",
        message: "Please correct the highlighted fields.",
      });
      return;
    }



    setSubmitting(true);
    setResult({ type: "", message: "" });

    try {
      const apiUrl = (
        import.meta.env.VITE_API_URL || "http://localhost:5000"
      ).replace(/\/+$/, "");

      const response = await fetch(`${apiUrl}/api/leads`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: form.name.trim(),
          email: form.email.trim(),
          phone: form.phone.trim(),
          company: form.company.trim(),
          service: form.service,
          budget: form.budget,
          message: form.message.trim(),
          website: form.website,
        }),
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(
          data.message || "We couldn't submit your enquiry."
        );
      }

      setForm(initialForm);
      setErrors({});
      setResult({
        type: "success",
        message:
          "Thank you! Your enquiry was submitted successfully.",
      });
    } catch (error) {
      setResult({
        type: "error",
        message:
          error.message ||
          "Unable to connect. Please try again shortly.",
      });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="contact-page" id="top">
      <section className="contact-hero">
        <div className="container contact-hero-inner">
          <div className="contact-intro">
            <p className="section-label">LET'S TALK</p>

            <h1>
              Good things
              <br />
              start with a <span>conversation.</span>
            </h1>

            <p className="contact-lead">
              Tell us about your business, the challenge
              you're facing or the idea you'd like to build.
              We'll start with understanding what matters to you.
            </p>

            <div className="contact-detail">
              <span className="contact-detail-icon">
                <MessageSquare size={20} />
              </span>
              <div>
                <strong>Have a project in mind?</strong>
                <p>Give us the details using the form.</p>
              </div>
            </div>

            <div className="contact-detail">
              <span className="contact-detail-icon">
                <Mail size={20} />
              </span>
              <div>
                <strong>Clear from the start</strong>
                <p>Share your goals so we can understand your needs.</p>
              </div>
            </div>
          </div>

          <div className="contact-form-panel">
            <div className="contact-form-heading">
              <span className="section-label">PROJECT ENQUIRY</span>
              <h2>Let's build something meaningful.</h2>
              <p>Fields marked * are required.</p>
            </div>

            <form onSubmit={handleSubmit} noValidate>
              <div className="contact-fields-grid">
                <div className="contact-field">
                  <label htmlFor="name">Full name *</label>
                  <input
                    id="name"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    autoComplete="name"
                    required
                    aria-invalid={Boolean(errors.name)}
                  />
                  {errors.name && (
                    <span className="field-error">{errors.name}</span>
                  )}
                </div>

                <div className="contact-field">
                  <label htmlFor="email">Email address *</label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="you@company.com"
                    autoComplete="email"
                    required
                    aria-invalid={Boolean(errors.email)}
                  />
                  {errors.email && (
                    <span className="field-error">{errors.email}</span>
                  )}
                </div>

                <div className="contact-field">
                  <label htmlFor="phone">Phone number</label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="+91"
                    autoComplete="tel"
                  />
                </div>

                <div className="contact-field">
                  <label htmlFor="company">Company name</label>
                  <input
                    id="company"
                    name="company"
                    value={form.company}
                    onChange={handleChange}
                    placeholder="Your business"
                    autoComplete="organization"
                  />
                </div>

                <div className="contact-field">
                  <label htmlFor="service">Service required *</label>
                  <select
                    id="service"
                    name="service"
                    value={form.service}
                    onChange={handleChange}
                    required
                    aria-invalid={Boolean(errors.service)}
                  >
                    <option value="">Choose a service</option>
                    {serviceOptions.map((service) => (
                      <option key={service} value={service}>
                        {service}
                      </option>
                    ))}
                  </select>
                  {errors.service && (
                    <span className="field-error">{errors.service}</span>
                  )}
                </div>

                <div className="contact-field">
                  <label htmlFor="budget">Estimated budget</label>
                  <select
                    id="budget"
                    name="budget"
                    value={form.budget}
                    onChange={handleChange}
                  >
                    <option value="">Select a range</option>
                    <option value="Under ₹25,000">Under ₹25,000</option>
                    <option value="₹25,000–₹75,000">
                      ₹25,000–₹75,000
                    </option>
                    <option value="₹75,000–₹2,00,000">
                      ₹75,000–₹2,00,000
                    </option>
                    <option value="Above ₹2,00,000">
                      Above ₹2,00,000
                    </option>
                    <option value="Not sure yet">Not sure yet</option>
                  </select>
                </div>

                <div className="contact-field contact-field-full">
                  <label htmlFor="message">Project details *</label>
                  <textarea
                    id="message"
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Tell us about your goals, requirements and timeline..."
                    rows={5}
                    required
                    aria-invalid={Boolean(errors.message)}
                  />
                  <div className="message-hint">
                    At least 20 characters.
                  </div>
                  {errors.message && (
                    <span className="field-error">{errors.message}</span>
                  )}
                </div>

                <div className="contact-honeypot" aria-hidden="true">
                  <label htmlFor="website">Leave this field empty</label>
                  <input
                    id="website"
                    name="website"
                    tabIndex={-1}
                    autoComplete="off"
                    value={form.website}
                    onChange={handleChange}
                  />
                </div>
              </div>

              {result.message && (
                <div
                  className={`form-result ${result.type}`}
                  role="status"
                  aria-live="polite"
                >
                  {result.type === "success" && (
                    <CheckCircle2 size={18} />
                  )}
                  <span>{result.message}</span>
                </div>
              )}

              <button
                type="submit"
                className="contact-submit"
                disabled={submitting}
              >
                {submitting ? "Submitting..." : "Send your enquiry"}
                <Send size={17} />
              </button>

              <p className="contact-privacy-note">
                Please don't include passwords or other sensitive
                personal information in your message.
              </p>
            </form>
          </div>
        </div>
      </section>

      <section className="contact-bottom">
        <div className="container contact-bottom-inner">
          <div>
            <p className="section-label">YOUR NEXT STEP</p>
            <h2>Let's turn your idea into a plan.</h2>
          </div>

          <a href="#top" className="contact-back-top">
            Back to form <ArrowUpRight size={18} />
          </a>
        </div>
      </section>
    </main>
  );
}
