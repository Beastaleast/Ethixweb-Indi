
import { Link } from "react-router-dom";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Code2,
  Workflow,
  TrendingUp,
  Network,
  Check,
} from "lucide-react";
import "./Services.css";

const services = [
  {
    number: "01",
    icon: Code2,
    title: "Websites & Web Apps",
    description:
      "Create a strong digital presence with responsive websites and web applications designed around your business goals.",
    features: [
      "Business websites",
      "Custom web applications",
      "Responsive user experiences",
    ],
    tag: "DESIGN & DEVELOPMENT",
  },
  {
    number: "02",
    icon: Workflow,
    title: "AI & Automation",
    description:
      "Reduce repetitive work and streamline everyday operations with practical automation and AI-powered workflows.",
    features: [
      "Workflow automation",
      "AI-powered solutions",
      "Process optimization",
    ],
    tag: "WORK SMARTER",
  },
  {
    number: "03",
    icon: TrendingUp,
    title: "Digital Marketing & SEO",
    description:
      "Improve your online visibility and build a digital marketing strategy aligned with your target customers.",
    features: [
      "Search engine optimization",
      "Digital advertising",
      "Performance analysis",
    ],
    tag: "REACH & GROW",
  },
  {
    number: "04",
    icon: Network,
    title: "CRM & Integrations",
    description:
      "Connect your business tools and organize customer workflows to support a smoother, more consistent operation.",
    features: [
      "CRM integrations",
      "Business tool connections",
      "Workflow improvements",
    ],
    tag: "CONNECTED SYSTEMS",
  },
];

const process = [
  {
    number: "01",
    title: "Discover",
    description:
      "Understand your business, audience, priorities and the problem to solve.",
  },
  {
    number: "02",
    title: "Plan & Design",
    description:
      "Define the solution, user journey and implementation approach.",
  },
  {
    number: "03",
    title: "Build & Test",
    description:
      "Develop the solution, validate its functionality and refine the details.",
  },
  {
    number: "04",
    title: "Launch & Improve",
    description:
      "Deploy the work and identify opportunities for ongoing improvement.",
  },
];

export default function Services() {
  return (
    <main className="services-page">
      <section className="services-hero">
        <div className="container services-hero-inner">
          <div className="services-breadcrumb">
            <Link to="/">Home</Link>
            <span>/</span>
            <span>Services</span>
          </div>

          <p className="section-label">WHAT WE DO</p>

          <h1>
            The right tools.
            <br />
            <span>For your next stage.</span>
          </h1>

          <div className="services-hero-bottom">
            <p>
              From digital experiences to connected workflows,
              we help businesses turn ideas into practical
              digital solutions.
            </p>

            <a href="#service-list" className="scroll-link">
              Explore our services
              <ArrowDown size={17} />
            </a>
          </div>
        </div>
      </section>

      <section
        className="service-list-section"
        id="service-list"
      >
        <div className="container">
          <div className="services-section-heading">
            <div>
              <p className="section-label">OUR CAPABILITIES</p>
              <h2>
                Built around
                <br />
                <span>your business.</span>
              </h2>
            </div>

            <p className="section-intro">
              Every business has different challenges. Start
              with the service you need, then build the right
              solution around your goals.
            </p>
          </div>

          <div className="service-grid">
            {services.map((service) => {
              const Icon = service.icon;

              return (
                <article
                  className="service-card"
                  key={service.number}
                >
                  <div className="service-card-top">
                    <span className="service-number">
                      {service.number}
                    </span>
                    <Icon
                      className="service-icon"
                      size={27}
                      strokeWidth={1.6}
                    />
                  </div>

                  <p className="service-tag">{service.tag}</p>

                  <h3>{service.title}</h3>

                  <p className="service-description">
                    {service.description}
                  </p>

                  <ul className="service-features">
                    {service.features.map((feature) => (
                      <li key={feature}>
                        <Check size={15} />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <Link
                    to="/contact"
                    className="service-link"
                    state={{ service: service.title }}
                  >
                    Discuss this service
                    <ArrowUpRight size={18} />
                  </Link>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="process-section">
        <div className="container">
          <p className="section-label">HOW WE WORK</p>

          <div className="process-heading">
            <h2>
              Clear steps.
              <br />
              <span>Thoughtful execution.</span>
            </h2>

            <p>
              Good digital work starts with understanding the
              problem and continues through careful delivery
              and improvement.
            </p>
          </div>

          <div className="process-grid">
            {process.map((item) => (
              <article className="process-card" key={item.number}>
                <span className="process-number">
                  {item.number}
                </span>

                <h3>{item.title}</h3>

                <p>{item.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="services-cta-section">
        <div className="container services-cta">
          <div>
            <p className="section-label">HAVE A PROJECT IN MIND?</p>

            <h2>
              Let's make your
              <br />
              next move count.
            </h2>

            <p>
              Tell us what you're working on. We'll start with
              your goals and explore the right approach.
            </p>
          </div>

          <Link to="/contact" className="primary-button">
            Start a conversation
            <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </main>
  );
}
