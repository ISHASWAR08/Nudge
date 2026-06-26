import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";
import "../styles/Onboarding.css";

/* ── DATA ─────────────────────────────────────────────────── */

const ROLES = [
  { id: "frontend",  label: "Frontend Developer" },
  { id: "backend",   label: "Backend Developer" },
  { id: "fullstack", label: "Full Stack Developer" },
  { id: "data",      label: "Data Scientist" },
  { id: "aiml",      label: "AI / ML Engineer" },
  { id: "mobile",    label: "Mobile Developer" },
  { id: "other",     label: "Other" },
];

const COMPANY_TYPES = [
  { id: "startup", label: "Startup", sub: "Fast building, versatile skills" },
  { id: "faang",   label: "Product Company / FAANG", sub: "Strong DSA + projects + system thinking" },
  { id: "service", label: "Service Based", sub: "Strong fundamentals + interview preparation" },
];

const TIMELINES = [
  { id: "3m", label: "3 months" },
  { id: "6m", label: "6 months" },
  { id: "1y", label: "1 year+" },
];

const BUILD_LEVELS = [
  { id: "learning", label: "Just learning",       sub: "Haven't shipped anything yet" },
  { id: "small",    label: "Built small projects", sub: "Personal / tutorial projects" },
  { id: "shipped",  label: "Shipped projects",     sub: "Real users or live deployments" },
];

const LEARN_STYLES = [
  { id: "tutorials",  label: "Tutorials / Courses" },
  { id: "building",   label: "Building Projects" },
  { id: "docs",       label: "Documentation" },
  { id: "mentorship", label: "Mentorship" },
];

const STRUGGLES = [
  { id: "what_next",   label: "I don't know what to learn next" },
  { id: "no_build",    label: "I learn but don't build" },
  { id: "job_ready",   label: "I don't know if I am job ready" },
  { id: "consistency", label: "I lack consistency" },
  { id: "interviews",  label: "I struggle with interviews" },
];

const TOTAL_Q = 6;

/* ── HELPERS ─────────────────────────────────────────────── */

function answeredCount(answers) {
  return [
    answers.role,
    answers.companyType,
    answers.timeline,
    answers.buildLevel,
    answers.learnStyle,
    answers.struggle,
  ].filter(Boolean).length;
}

/* ── LABEL MAPS ──────────────────────────────────────────── */
const ROLE_LABELS = {
  frontend:  "Frontend Developer",
  backend:   "Backend Developer",
  fullstack: "Full Stack Developer",
  data:      "Data Scientist",
  aiml:      "AI / ML Engineer",
  mobile:    "Mobile Developer",
  other:     "Developer",
};

const COMPANY_LABELS = {
  startup: "Startup",
  faang:   "Product Company / FAANG",
  service: "Service Based",
};

const TIMELINE_LABELS = {
  "3m": "3 months",
  "6m": "6 months",
  "1y": "1 year+",
};

/* ── SUB-COMPONENTS ───────────────────────────────────────── */

function ProgressBar({ step, answers }) {
  const filled = answeredCount(answers);
  const pct = Math.round((filled / TOTAL_Q) * 100);
  return (
    <div className="ob-progress">
      <div className="ob-progress__meta">
        <span className="ob-progress__step">Step {step} of 2</span>
        <span className="ob-progress__pct">{pct}% complete</span>
      </div>
      <div className="ob-progress__track">
        <div className="ob-progress__fill" style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}

function SelectCard({ label, sub, selected, onClick }) {
  return (
    <button
      type="button"
      className={`ob-card${selected ? " ob-card--active" : ""}`}
      onClick={onClick}
    >
      <span className="ob-card__check" aria-hidden="true">{selected ? "✓" : ""}</span>
      <span className="ob-card__label">{label}</span>
      {sub && <span className="ob-card__sub">{sub}</span>}
    </button>
  );
}

function PillCard({ label, selected, onClick }) {
  return (
    <button
      type="button"
      className={`ob-pill${selected ? " ob-pill--active" : ""}`}
      onClick={onClick}
    >
      {label}
    </button>
  );
}

function Question({ number, text, children }) {
  return (
    <div className="ob-question">
      <p className="ob-question__num">Q{number}</p>
      <h2 className="ob-question__text">{text}</h2>
      <div className="ob-question__body">{children}</div>
    </div>
  );
}

/* ── MAIN COMPONENT ───────────────────────────────────────── */

export default function Onboarding({ onComplete }) {
  const navigate = useNavigate();
  const { setUserData } = useUser();

  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState({
    role:        null,
    companyType: null,
    timeline:    null,
    buildLevel:  null,
    learnStyle:  null,
    struggle:    null,
  });

  const set = (key, value) =>
    setAnswers((prev) => ({ ...prev, [key]: value }));

  const step1Done = answers.role && answers.companyType && answers.timeline;
  const step2Done = answers.buildLevel && answers.learnStyle && answers.struggle;

  const handleFinish = async () => {

    const userData = {
      role: ROLE_LABELS[answers.role] || answers.role,
      companyType: COMPANY_LABELS[answers.companyType] || answers.companyType,
      timeline: TIMELINE_LABELS[answers.timeline] || answers.timeline,
      buildLevel: answers.buildLevel,
      learnStyle: answers.learnStyle,
      struggle: answers.struggle,
    };
    setUserData(userData);

    try {

      const response = await fetch(
        "http://localhost:5000/api/roadmap/generate",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({

            skills: userData.role,
            careerGoal: userData.role,
            level: userData.buildLevel

          })
        }
      );


      const roadmapResponse = await response.json();


      setUserData({

        ...userData,

        roadmap: roadmapResponse.data

      });


    } catch(error){

      console.error("Roadmap generation failed:", error);
      console.log("SAVING USER DATA:", userData);
      setUserData(userData);

    }


    if (onComplete) onComplete(answers);

    navigate("/dashboard");

};

  return (
    <div className="ob-page">
      <nav className="ob-nav">
        <div className="ob-logo">
          <span className="ob-logo__dot" />
          Nudge
        </div>
      </nav>

      <ProgressBar step={step} answers={answers} />

      <main className="ob-main">
        {step === 1 && (
          <div className="ob-step">
            <div className="ob-step__header">
              <p className="ob-eyebrow">Career Goal</p>
              <h1 className="ob-step__title">
                Let's reverse-engineer<br />your path to hired.
              </h1>
            </div>

            <Question number={1} text="What role are you targeting?">
              <div className="ob-grid ob-grid--roles">
                {ROLES.map((r) => (
                  <SelectCard
                    key={r.id}
                    label={r.label}
                    selected={answers.role === r.id}
                    onClick={() => set("role", r.id)}
                  />
                ))}
              </div>
            </Question>

            <Question number={2} text="What type of company are you aiming for?">
              <div className="ob-grid ob-grid--company">
                {COMPANY_TYPES.map((c) => (
                  <SelectCard
                    key={c.id}
                    label={c.label}
                    sub={c.sub}
                    selected={answers.companyType === c.id}
                    onClick={() => set("companyType", c.id)}
                  />
                ))}
              </div>
            </Question>

            <Question number={3} text="When do you want to be ready?">
              <div className="ob-grid ob-grid--pills">
                {TIMELINES.map((t) => (
                  <PillCard
                    key={t.id}
                    label={t.label}
                    selected={answers.timeline === t.id}
                    onClick={() => set("timeline", t.id)}
                  />
                ))}
              </div>
            </Question>

            <div className="ob-actions">
              <button
                className="ob-btn ob-btn--primary"
                disabled={!step1Done}
                onClick={() => setStep(2)}
              >
                Continue →
              </button>
              {!step1Done && (
                <p className="ob-actions__hint">Answer all 3 questions to continue</p>
              )}
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="ob-step">
            <div className="ob-step__header">
              <p className="ob-eyebrow">Current Situation</p>
              <h1 className="ob-step__title">
                Now let's see where<br />you actually stand.
              </h1>
            </div>

            <Question number={4} text="How much have you built?">
              <div className="ob-grid ob-grid--company">
                {BUILD_LEVELS.map((b) => (
                  <SelectCard
                    key={b.id}
                    label={b.label}
                    sub={b.sub}
                    selected={answers.buildLevel === b.id}
                    onClick={() => set("buildLevel", b.id)}
                  />
                ))}
              </div>
            </Question>

            <Question number={5} text="How do you usually learn?">
              <div className="ob-grid ob-grid--pills">
                {LEARN_STYLES.map((l) => (
                  <PillCard
                    key={l.id}
                    label={l.label}
                    selected={answers.learnStyle === l.id}
                    onClick={() => set("learnStyle", l.id)}
                  />
                ))}
              </div>
            </Question>

            <Question number={6} text="What's your biggest struggle right now?">
              <div className="ob-grid ob-grid--struggles">
                {STRUGGLES.map((s) => (
                  <SelectCard
                    key={s.id}
                    label={s.label}
                    selected={answers.struggle === s.id}
                    onClick={() => set("struggle", s.id)}
                  />
                ))}
              </div>
            </Question>

            <div className="ob-actions">
              <button className="ob-btn ob-btn--ghost" onClick={() => setStep(1)}>
                ← Back
              </button>
              <button
                className="ob-btn ob-btn--primary"
                disabled={!step2Done}
                onClick={handleFinish}
              >
                See my readiness score →
              </button>
            </div>
            {!step2Done && (
              <p className="ob-actions__hint">Answer all 3 questions to continue</p>
            )}
          </div>
        )}
      </main>
    </div>
  );
}