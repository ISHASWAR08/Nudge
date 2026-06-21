import { useState, useEffect, useRef } from "react";
import "../styles/Landing.css";
 
const FEATURES = [
  {
    icon: "🎯",
    title: "Goal-First Onboarding",
    desc: "Enter your target role, company type, and deadline. Nudge reverse-engineers exactly what you need — and what you don't.",
  },
  {
    icon: "📊",
    title: "Live Readiness Score",
    desc: 'Not a dopamine hit. A brutally honest number: "You\'re 64% ready for a frontend internship." Updated every time you act.',
  },
  {
    icon: "🚨",
    title: "Tutorial Hell Detector",
    desc: "Flags passive spirals before they waste weeks. If you've been watching and not building, it will call you out.",
  },
  {
    icon: "✅",
    title: "Action Milestones",
    desc: "Can't unlock the next phase until you ship something real. Learning is gated by doing.",
  },
  {
    icon: "🟢",
    title: "Greenlit Signal",
    desc: "Stop guessing when you're ready to apply. Nudge tells you exactly when — and makes you pull the trigger.",
  },
];
 
const STATS = [
  { value: "73%", label: "of students who don't get internships were actively studying" },
  { value: "4.2x", label: "more likely to get hired if you have shipped side projects" },
  { value: "3 wks", label: "average time lost per student in a single tutorial hell spiral" },
];
 
function ReadinessMeter({ target = 64 }) {
  const [filled, setFilled] = useState(false);
  const ref = useRef(null);
 
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setFilled(true), 200);
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
 
  return (
    <div className="meter" ref={ref}>
      <div className="meter__head">
        <span className="meter__label">Readiness Score</span>
        <span className="meter__value">{filled ? `${target}%` : "—"}</span>
      </div>
      <div className="meter__track">
        <div
          className="meter__fill"
          style={{ width: filled ? `${target}%` : "0%" }}
        />
        <div
          className="meter__thumb"
          style={{ left: filled ? `${target}%` : "0%" }}
        />
      </div>
      <div className="meter__legend">
        <span>Not ready</span>
        <span className="meter__verdict">Apply now →</span>
        <span>Overqualified</span>
      </div>
    </div>
  );
}
 
export default function Landing({ onGetStarted }) {
  const handleCTA = () => {
    if (onGetStarted) onGetStarted();
  };
 
  return (
    <div className="page">
 
      {/* NAV */}
      <nav className="nav">
        <div className="logo">
          <span className="logo__dot" />
          Nudge
        </div>
        <button className="nav__cta" onClick={handleCTA}>
          Get started →
        </button>
      </nav>
 
      {/* HERO */}
      <section className="hero">
        <p className="eyebrow">Career Readiness Platform</p>
        <h1 className="hero__headline">
          Stop learning.<br />
          <span className="accent">Start doing.</span><br />
          Get hired.
        </h1>
        <p className="hero__sub">
          You don't lack resources. You lack a signal. Nudge tracks your
          learning behavior, detects when you're spiraling, and tells you
          exactly when to stop studying and start applying.
        </p>
        <ReadinessMeter target={64} />
        <div className="hero__actions">
          <button className="btn btn--primary" onClick={handleCTA}>
            Build your roadmap
          </button>
          <span className="hero__hint">Takes 3 minutes. No fluff.</span>
        </div>
      </section>
 
      {/* PROBLEM */}
      <section className="section">
        <p className="eyebrow">The real problem</p>
        <h2 className="section__h2">
          You didn't fail the internship.<br />
          Tutorial hell failed you.
        </h2>
        <p className="section__body">
          Students are drowning in courses, certifications, and YouTube
          playlists — and still getting rejected. Not because they haven't
          learned enough. Because nobody told them when to stop learning
          and start shipping.
        </p>
        <blockquote className="quote">
          <p className="quote__text">
            "I completed 3 bootcamps, 2 Udemy courses, and got a Meta
            rejection for having no real projects."
          </p>
          <cite className="quote__cite">— Every CS student, 2024</cite>
        </blockquote>
      </section>
 
      {/* STATS */}
      <div className="stats">
        {STATS.map((s, i) => (
          <div className="stats__item" key={i}>
            <div className="stats__value">{s.value}</div>
            <div className="stats__label">{s.label}</div>
          </div>
        ))}
      </div>
 
      {/* FEATURES */}
      <section className="section">
        <p className="eyebrow">How it works</p>
        <h2 className="section__h2">
          Five systems.<br />One outcome: hired.
        </h2>
        <ul className="features">
          {FEATURES.map((f, i) => (
            <li className="features__item" key={i}>
              <div className="features__icon" aria-hidden="true">{f.icon}</div>
              <div className="features__body">
                <p className="features__title">{f.title}</p>
                <p className="features__desc">{f.desc}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>
 
      {/* FINAL CTA */}
      <section className="section section--cta">
        <p className="cta__tag">🟢 You might already be ready</p>
        <h2 className="section__h2 section__h2--large">
          What's your real<br />readiness score?
        </h2>
        <p className="section__body">
          Set your goal. Rate your skills. Get a brutally honest number —
          and a path to hit 80% in weeks, not months.
        </p>
        <button className="btn btn--primary btn--lg" onClick={handleCTA}>
          Find out now →
        </button>
      </section>
 
      {/* FOOTER */}
      <footer className="footer">
        <div className="logo logo--sm">
          <span className="logo__dot" />
          Nudge
        </div>
        <p className="footer__tag">Stop learning. Start doing. Get hired.</p>
      </footer>
 
    </div>
  );
}