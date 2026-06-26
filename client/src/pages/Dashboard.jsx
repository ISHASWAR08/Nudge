import { useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { useUser } from "../context/UserContext";
import "./Dashboard.css";

/* ── Mock fallback (used when visiting /dashboard directly) ── */
const MOCK_USER = {
  name: "You",
  role: "Frontend Developer",
  company: "Startup",
  timeline: "3 months",
  readiness: 64,
  phase: "learning",
  tutorialHoursThisWeek: 4,
  lastBuildAction: 9,
  gaps: [
    { skill: "React Projects",  detail: "No shipped project in portfolio yet", weight: 14 },
    { skill: "DSA Basics",      detail: "Arrays & strings not practiced",       weight: 12 },
    { skill: "System Design",   detail: "Not started for your target role",     weight: 10 },
  ],
  nudgeActive: true,
};

/* ── Map onboarding answers → dashboard shape ─────────────── */
function buildUserFromContext(userData) {
  if (!userData || !userData.role) return null;

  const phaseMap = { learning: "learning", small: "building", shipped: "applying" };
  const phase = phaseMap[userData.buildLevel] || "learning";
  const nudgeActive = userData.learnStyle === "tutorials";

  const gapsByStruggle = {
    what_next:   [
      { skill: "Skill Clarity",    detail: "No clear roadmap for your target role",  weight: 14 },
      { skill: "Project Building", detail: "Not enough hands-on practice",           weight: 12 },
      { skill: "Portfolio",        detail: "Nothing to show recruiters yet",         weight: 10 },
    ],
    no_build:    [
      { skill: "Shipped Projects", detail: "Consuming tutorials without building",   weight: 16 },
      { skill: "GitHub Activity",  detail: "No public repos or contributions",       weight: 12 },
      { skill: "Consistency",      detail: "Learning streaks breaking too often",    weight: 8  },
    ],
    job_ready:   [
      { skill: "Readiness Signal", detail: "No benchmark to measure progress",      weight: 14 },
      { skill: "Interview Prep",   detail: "Not tested against real questions yet",  weight: 12 },
      { skill: "Portfolio Polish", detail: "Projects not presentation-ready",        weight: 10 },
    ],
    consistency: [
      { skill: "Study Schedule",   detail: "No consistent daily learning habit",    weight: 13 },
      { skill: "Project Finish",   detail: "Starting but not completing projects",  weight: 12 },
      { skill: "Accountability",   detail: "No external tracking or deadlines",     weight: 11 },
    ],
    interviews:  [
      { skill: "DSA Practice",     detail: "Arrays & strings not regularly drilled", weight: 15 },
      { skill: "Mock Interviews",  detail: "No practice under pressure",             weight: 13 },
      { skill: "System Design",    detail: "Not started for your target role",       weight: 8  },
    ],
  };

  const gaps = gapsByStruggle[userData.struggle] || MOCK_USER.gaps;
  const readiness = Math.max(30, 100 - gaps.reduce((sum, g) => sum + g.weight, 0));

  return {
    name: "You",
    role: userData.role,
    company: userData.companyType,
    timeline: userData.timeline,
    readiness,
    phase,
    tutorialHoursThisWeek: 4,
    lastBuildAction: 9,
    gaps,
    nudgeActive,
  };
}

/* ── Readiness Ring ───────────────────────────────────────── */
function ReadinessRing({ score }) {
  const [displayed, setDisplayed] = useState(0);
  const ref = useRef(null);

  useEffect(() => {
    setDisplayed(0);
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          let start = 0;
          const step = () => {
            start += 1;
            setDisplayed(start);
            if (start < score) requestAnimationFrame(step);
          };
          requestAnimationFrame(step);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [score]);

  const radius = 80;
  const circ = 2 * Math.PI * radius;
  const offset = circ - (displayed / 100) * circ;
  const color = displayed < 40 ? "#e05252" : displayed < 70 ? "#F5A623" : "#4caf82";

  return (
    <div className="ring" ref={ref}>
      <svg viewBox="0 0 200 200" width="200" height="200">
        <circle cx="100" cy="100" r={radius} className="ring__track" />
        <circle
          cx="100" cy="100" r={radius}
          className="ring__fill"
          style={{ strokeDasharray: circ, strokeDashoffset: offset, stroke: color }}
        />
        <text x="100" y="96" className="ring__score" textAnchor="middle">{displayed}%</text>
        <text x="100" y="118" className="ring__label" textAnchor="middle">Readiness</text>
      </svg>
    </div>
  );
}

/* ── Phase Pill ───────────────────────────────────────────── */
function PhasePill({ phase }) {
  const phases = ["learning", "building", "applying"];
  const labels = { learning: "Learning", building: "Building", applying: "Applying" };
  const icons  = { learning: "📚", building: "🔨", applying: "🚀" };

  return (
    <div className="phase">
      <p className="phase__label">Current Phase</p>
      <div className="phase__track">
        {phases.map((p) => (
          <div
            key={p}
            className={`phase__step
              ${p === phase ? "phase__step--active" : ""}
              ${phases.indexOf(p) < phases.indexOf(phase) ? "phase__step--done" : ""}
            `}
          >
            <span className="phase__icon">{icons[p]}</span>
            <span className="phase__name">{labels[p]}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Nudge Alert ──────────────────────────────────────────── */
function NudgeAlert({ hours, daysSinceBuild, onDismiss }) {
  return (
    <div className="nudge-alert">
      <div className="nudge-alert__icon">🚨</div>
      <div className="nudge-alert__body">
        <p className="nudge-alert__title">Tutorial Hell Detected</p>
        <p className="nudge-alert__text">
          You've logged <strong>{hours} hours</strong> of tutorials this week and haven't
          built anything in <strong>{daysSinceBuild} days</strong>. Stop consuming. Build something today.
        </p>
        <button className="nudge-alert__cta">Show me what to build →</button>
      </div>
      <button className="nudge-alert__dismiss" onClick={onDismiss} aria-label="Dismiss">✕</button>
    </div>
  );
}

/* ── Skill Gaps ───────────────────────────────────────────── */
function SkillGaps({ gaps }) {
  return (
    <div className="gaps">
      <h3 className="gaps__heading">What's pulling your score down</h3>
      <ul className="gaps__list">
        {gaps.map((g) => (
          <li key={g.skill} className="gap-item">
            <div className="gap-item__top">
              <span className="gap-item__skill">{g.skill}</span>
              <span className="gap-item__weight">−{g.weight}%</span>
            </div>
            <p className="gap-item__detail">{g.detail}</p>
            <div className="gap-item__bar">
              <div className="gap-item__bar-fill" style={{ width: `${(g.weight / 20) * 100}%` }} />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ── Dashboard ────────────────────────────────────────────── */
export default function Dashboard() {
  const navigate = useNavigate();
  const { userData } = useUser();
  const user = buildUserFromContext(userData) || MOCK_USER;
  const [nudgeDismissed, setNudgeDismissed] = useState(false);

  return (
    <div className="dash">
      <aside className="sidebar">
        <div className="sidebar__brand">Nudge</div>
        <nav className="sidebar__nav">
          {[
            { icon: "⊞", label: "Dashboard", active: true },
            { icon: "🗺", label: "Roadmap" },
            { icon: "✅", label: "Milestones" },
            { icon: "📊", label: "Progress" },
          ].map(({ icon, label, active }) => (
            <a key={label} href="#"
              className={`sidebar__link ${active ? "sidebar__link--active" : ""}`}>
              <span className="sidebar__link-icon">{icon}</span>
              {label}
            </a>
          ))}
        </nav>
        <div className="sidebar__goal">
          <p className="sidebar__goal-label">Your Goal</p>
          <p className="sidebar__goal-role">{user.role}</p>
          <p className="sidebar__goal-meta">{user.company} · {user.timeline}</p>
        </div>
      </aside>

      <main className="main">
        <header className="dash-header">
          <div>
            <h1 className="dash-header__title">Hey {user.name} 👋</h1>
            <p className="dash-header__sub">Here's your honest career snapshot for today.</p>
          </div>
          <div className="dash-header__badge">
            {user.readiness >= 80 ? "🟢 Greenlit" : "🟡 In Progress"}
          </div>
        </header>

        {user.nudgeActive && !nudgeDismissed && (
          <NudgeAlert
            hours={user.tutorialHoursThisWeek}
            daysSinceBuild={user.lastBuildAction}
            onDismiss={() => setNudgeDismissed(true)}
          />
        )}

        <div className="score-row">
          <div className="score-card">
  <ReadinessRing score={user.readiness} />

  <p className="score-card__desc">
    You're <strong>{user.readiness}% ready</strong> for a {user.role} role at a {user.company}.
  </p>

  <button
    className="roadmap-btn"
   onClick={() => navigate("/roadmap")}
  >
    View My Roadmap →
  </button>
</div>
          <PhasePill phase={user.phase} />
        </div>

        <SkillGaps gaps={user.gaps} />
      </main>
    </div>
  );
}