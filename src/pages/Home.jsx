
import { Link } from "react-router-dom";
import {
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  Code2,
  Workflow,
  TrendingUp,
  Network,
  Compass,
  PenTool,
  Rocket,
  ShieldCheck,
  Zap,
  MousePointer2,
} from "lucide-react";
import "./Home.css";

const services = [
  {
    number: "01",
    icon: Code2,
    title: "Websites & Web Apps",
    tag: "DESIGN + DEVELOPMENT",
    description:
      "Fast, responsive digital experiences that help your business stand out and convert visitors into customers.",
  },
  {
    number: "02",
    icon: Workflow,
    title: "AI & Automation",
    tag: "WORK SMARTER",
    description:
      "Simplify repetitive work with practical automation and intelligent workflows built around your business.",
  },
  {
    number: "03",
    icon: TrendingUp,
    title: "Digital Marketing & SEO",
    tag: "REACH + GROW",
    description:
      "Improve online visibility and create a clearer path from discovery to meaningful customer relationships.",
  },
  {
    number: "04",
    icon: Network,
    title: "CRM & Integrations",
    tag: "CONNECTED SYSTEMS",
    description:
      "Connect your business tools and create smoother customer journeys across your digital operations.",
  },
];

const process = [
  {
    number: "01",
    icon: Compass,
    title: "Discover",
    description:
      "We understand your business, your audience and the problem worth solving.",
  },
  {
    number: "02",
    icon: PenTool,
    title: "Plan",
    description:
      "We define the direction, user journey and priorities before building.",
  },
  {
    number: "03",
    icon: Zap,
    title: "Build",
    description:
      "We develop, test and refine the experience across devices and interactions.",
  },
  {
    number: "04",
    icon: Rocket,
    title: "Launch",
    description:
      "We prepare your solution for launch and identify opportunities to improve.",
  },
];

export default function Home() {
  return (
    <main className="ethix-home">
      {/* HERO */}
      <section className="eh-hero">
        <div className="eh-container eh-hero-grid">
          <div className="eh-hero-content">
            <div className="eh-eyebrow">
              <span className="eh-dot" />
              DIGITAL PARTNER FOR AMBITIOUS BUSINESSES
            </div>

            <h1>
              Make digital
              <br />
              work <span>better.</span>
            </h1>

            <p className="eh-hero-description">
              We bring design, technology and growth strategy together
              to help businesses move forward with clarity.
            </p>

            <div className="eh-actions">
              <Link to="/contact" className="eh-button eh-button-primary">
                Start a project <ArrowUpRight size={18} />
              </Link>

              <Link to="/services" className="eh-text-button">
                Explore our services <ArrowRight size={17} />
              </Link>
            </div>

            <div className="eh-trust">
              <CheckCircle2 size={18} />
              Thoughtful strategy. Useful technology. Human-first design.
            </div>
          </div>

          <div className="eh-hero-art" aria-label="Ethixweb brand illustration">
            <div className="eh-art-top">
              <span>IDEAS INTO IMPACT</span>
              <span>ETH / 001</span>
            </div>

            <div className="eh-art-stage">
              <div className="eh-orbit eh-orbit-one" />
              <div className="eh-orbit eh-orbit-two" />

              <div className="eh-art-circle">
                <div className="eh-art-inner">
                  <span>MAKE</span>
                  <span>IT</span>
                  <span>MATTER.</span>
                </div>
              </div>

              <div className="eh-floating-card">
                <span>A BETTER WAY FORWARD</span>
                <strong>Built around you.</strong>
                <ArrowUpRight size={21} />
              </div>

              <div className="eh-art-note">
                <span>✳</span>
                <span>
                  DESIGN
                  <br />
                  WITH INTENT
                </span>
              </div>
            </div>

            <div className="eh-art-bottom">
              <span>DESIGN / DEVELOP / GROW</span>
              <span>BUILT FOR BUSINESS</span>
            </div>
          </div>
        </div>

        <div className="eh-container eh-keywords">
          <span>STRATEGY</span>
          <i />
          <span>EXPERIENCE</span>
          <i />
          <span>TECHNOLOGY</span>
          <i />
          <span>GROWTH</span>
        </div>
      </section>

      {/* SERVICES */}
      <section className="eh-section eh-container">
        <div className="eh-section-heading">
          <div>
            <span className="eh-label">WHAT WE DO</span>
            <h2>
              Good work starts
              <br />
              with <span>a clear idea.</span>
            </h2>
          </div>

          <div className="eh-heading-aside">
            <p>
              From your first website to the systems behind your business,
              we focus on digital solutions that are useful, considered
              and built to move you forward.
            </p>

            <Link to="/services" className="eh-inline-link">
              Explore all services <ArrowRight size={17} />
            </Link>
          </div>
        </div>

        <div className="eh-service-grid">
          {services.map(({ number, icon: Icon, title, tag, description }) => (
            <article className="eh-service-card" key={number}>
              <div className="eh-card-top">
                <span>{number}</span>
                <Icon size={27} strokeWidth={1.5} />
              </div>

              <span className="eh-card-tag">{tag}</span>
              <h3>{title}</h3>
              <p>{description}</p>

              <Link
                to="/contact"
                state={{ service: title }}
                className="eh-card-link"
                aria-label={`Discuss ${title}`}
              >
                <ArrowUpRight size={20} />
              </Link>
            </article>
          ))}
        </div>
      </section>

      {/* BRAND STATEMENT */}
      <section className="eh-manifesto">
        <div className="eh-container eh-manifesto-grid">
          <div>
            <span className="eh-label">THE ETHIXWEB APPROACH</span>
            <h2>
              Less noise.
              <br />
              <span>More meaning.</span>
            </h2>
          </div>

          <div className="eh-manifesto-copy">
            <p className="eh-manifesto-lead">
              Digital should make things clearer — not more complicated.
            </p>

            <p>
              We start with what your business and your customers actually
              need. Then we bring together design, development and strategy
              to create a more thoughtful digital experience.
            </p>

            <Link to="/about" className="eh-light-link">
              Get to know us <ArrowUpRight size={18} />
            </Link>
          </div>

          <div className="eh-brand-stamp" aria-hidden="true">
            <span>ETHIX</span>
            <span>WEB.</span>
            <small>THOUGHTFUL BY DESIGN</small>
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="eh-section eh-container">
        <div className="eh-section-heading">
          <div>
            <span className="eh-label">HOW WE WORK</span>
            <h2>
              Clear steps.
              <br />
              <span>Better outcomes.</span>
            </h2>
          </div>

          <p className="eh-process-intro">
            A collaborative process designed to keep the work focused,
            transparent and moving in the right direction.
          </p>
        </div>

        <div className="eh-process-grid">
          {process.map(({ number, icon: Icon, title, description }) => (
            <article className="eh-process-card" key={number}>
              <div className="eh-process-top">
                <span>{number}</span>
                <Icon size={24} strokeWidth={1.5} />
              </div>

              <h3>{title}</h3>
              <p>{description}</p>
            </article>
          ))}
        </div>
      </section>

      {/* WHY ETHIXWEB */}
      <section className="eh-principles">
        <div className="eh-container eh-principles-grid">
          <div className="eh-principles-intro">
            <span className="eh-label">WHY ETHIXWEB</span>
            <h2>
              Built on the
              <br />
              <span>right things.</span>
            </h2>
            <p>
              Good partnerships come from clarity, care and a shared focus
              on the work that matters.
            </p>
          </div>

          <div className="eh-principles-list">
            <article>
              <ShieldCheck size={23} />
              <div>
                <h3>Clarity over complexity</h3>
                <p>
                  Understandable recommendations and purposeful solutions
                  that make sense for your team.
                </p>
              </div>
            </article>

            <article>
              <MousePointer2 size={23} />
              <div>
                <h3>People-first experiences</h3>
                <p>
                  Useful, accessible journeys designed around the people
                  who will actually use them.
                </p>
              </div>
            </article>

            <article>
              <Zap size={23} />
              <div>
                <h3>Built to keep moving</h3>
                <p>
                  Responsive foundations that can evolve as your goals
                  and business change.
                </p>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="eh-container eh-cta-section">
        <div className="eh-cta-panel">
          <div className="eh-cta-decoration" aria-hidden="true" />

          <span className="eh-label">YOUR NEXT STEP STARTS HERE</span>

          <h2>
            Have a good idea?
            <br />
            <span>Let's make it real.</span>
          </h2>

          <p>
            Tell us what you're working towards. Let's explore a thoughtful
            way to get there.
          </p>

          <Link to="/contact" className="eh-button eh-button-primary">
            Let's talk <ArrowUpRight size={18} />
          </Link>

          <span className="eh-cta-index">ETHIXWEB / DIGITAL PARTNER</span>
        </div>
      </section>
    </main>
  );
}
