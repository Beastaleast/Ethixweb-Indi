
import { Link } from "react-router-dom";
import {
  ArrowRight,
  ArrowUpRight,
  Compass,
  Layers3,
  Target,
  Users,
} from "lucide-react";
import "./About.css";

const principles = [
  {
    number: "01",
    icon: Target,
    title: "Start with the real problem",
    description:
      "Understand the business, its customers and its goals before deciding what technology to use.",
  },
  {
    number: "02",
    icon: Layers3,
    title: "Build with purpose",
    description:
      "Create useful websites, connected systems and digital experiences that solve practical problems.",
  },
  {
    number: "03",
    icon: Users,
    title: "Design for real people",
    description:
      "Make experiences clear, accessible and easy to use across devices and different customer journeys.",
  },
];

const priorities = [
  {
    number: "01",
    title: "Understand the context",
    description:
      "Every business has a different audience, operating model and definition of success. We start by understanding yours.",
  },
  {
    number: "02",
    title: "Choose the right approach",
    description:
      "From a business website to workflow automation, the solution should fit the challenge instead of adding unnecessary complexity.",
  },
  {
    number: "03",
    title: "Keep improving",
    description:
      "A launch is an important milestone. Good digital work also considers performance, feedback, reliability and future growth.",
  },
];

export default function About() {
  return (
    <main className="about-page">
      <section className="about-hero">
        <div className="container about-hero-inner">
          <div className="about-breadcrumb">
            <Link to="/">Home</Link>
            <span>/</span>
            <span>About</span>
          </div>

          <p className="section-label">
            ABOUT ETHIXWEB
          </p>

          <h1>
            Technology with purpose.
            <br />
            <span>Growth with direction.</span>
          </h1>

          <div className="about-hero-bottom">
            <p>
              We believe digital solutions should do more than
              look impressive. They should make businesses
              easier to run, easier to discover and better
              equipped for what's next.
            </p>

            <div className="about-location-note">
              <Compass size={20} />
              <span>
                <strong>Our focus</strong>
                <small>Businesses in a changing digital India</small>
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="about-story-section">
        <div className="container about-story-grid">
          <div className="about-story-heading">
            <p className="section-label">
              OUR INDIA STORY
            </p>

            <h2>
              India's businesses
              <br />
              deserve <span>better digital.</span>
            </h2>
          </div>

          <div className="about-story-copy">
            <p className="about-story-lead">
              India's business landscape is diverse,
              ambitious and constantly evolving. Digital
              experiences need to reflect that reality.
            </p>

            <p>
              A growing local business, an ambitious startup
              and an established company may have very
              different needs. But each deserves clear
              communication, thoughtful design and technology
              that serves a genuine business purpose.
            </p>

            <p>
              That is the idea behind this India-focused
              direction for Ethixweb: combine digital
              craftsmanship with practical thinking, and
              build solutions around the people who use them.
            </p>

            <Link to="/services" className="about-text-link">
              Explore what we do
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      <section className="about-principles-section">
        <div className="container">
          <div className="about-section-heading">
            <div>
              <p className="section-label">
                WHAT GUIDES US
              </p>

              <h2>
                Good work starts
                <br />
                <span>with good thinking.</span>
              </h2>
            </div>

            <p>
              Our approach connects business understanding,
              thoughtful execution and a focus on outcomes.
            </p>
          </div>

          <div className="about-principles-grid">
            {principles.map((item) => {
              const Icon = item.icon;

              return (
                <article
                  className="about-principle-card"
                  key={item.number}
                >
                  <div className="about-principle-top">
                    <span>{item.number}</span>
                    <Icon size={27} strokeWidth={1.5} />
                  </div>

                  <h3>{item.title}</h3>

                  <p>{item.description}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="about-approach-section">
        <div className="container about-approach-grid">
          <div className="about-approach-intro">
            <p className="section-label">
              THE WAY FORWARD
            </p>

            <h2>
              Built around
              <br />
              <span>your reality.</span>
            </h2>

            <p>
              There is no single digital formula for every
              business. The right approach begins with your
              challenges and adapts to your goals.
            </p>
          </div>

          <div className="about-priorities">
            {priorities.map((item) => (
              <article
                className="about-priority"
                key={item.number}
              >
                <span className="about-priority-number">
                  {item.number}
                </span>

                <div>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>

                <ArrowUpRight
                  className="about-priority-arrow"
                  size={20}
                />
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="about-cta-section">
        <div className="container about-cta">
          <div>
            <p className="section-label">
              HAVE SOMETHING IN MIND?
            </p>

            <h2>
              Let's build what's
              <br />
              next for your business.
            </h2>

            <p>
              Tell us about your goals, your challenges and
              the idea you want to bring to life.
            </p>
          </div>

          <Link to="/contact" className="primary-button">
            Let's talk <ArrowUpRight size={18} />
          </Link>
        </div>
      </section>
    </main>
  );
}
