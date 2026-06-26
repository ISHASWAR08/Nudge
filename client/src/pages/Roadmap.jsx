import { useContext } from 'react';
import { UserContext } from '../context/UserContext';
import { useState, useEffect } from 'react';
import '../styles/Roadmap.css';

export default function Roadmap() {
  const { userData } = useContext(UserContext);
  console.log("ROADMAP USERDATA:", userData);
  const [roadmapData, setRoadmapData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRoadmap = async () => {
      if (!userData.role) {
      return;
    }
      try {
       console.log("USER DATA:", userData);

const payload = {
  role: userData.role,
  timeline: userData.timeline,
  skills: {
    html: 4,
    css: 4,
    javascript: 3
  }
};

console.log("PAYLOAD:", payload);  

        

        const response = await fetch("http://localhost:5000/api/roadmap/generate", {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(payload)
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setRoadmapData({
  ...data.data,
  roadmap: data.data.roadmap || data.data.steps || [],
  projects: data.data.projects || []
});
        setError(null);
      } catch (err) {
        setError(err.message || 'Failed to fetch roadmap');
        setRoadmapData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchRoadmap();
  }, [userData]);

  if (loading) {
    return (
      <div className="roadmap-container">
        <div className="loading-screen">
          <div className="spinner"></div>
          <p>Generating your personalized roadmap...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="roadmap-container">
        <div className="error-screen">
          <h2>Oops! Something went wrong</h2>
          <p>{error}</p>
          <button onClick={() => window.location.reload()}>Try Again</button>
        </div>
      </div>
    );
  }

  if (!roadmapData) {
    return (
      <div className="roadmap-container">
        <div className="error-screen">
          <h2>No data available</h2>
          <p>Please try again.</p>
        </div>
      </div>
    );
  }

  const getPhaseIcon = (phase) => {
    const icons = {
      Learning: '📚',
      Building: '🔨',
      Applying: '🚀'
    };
    return icons[phase] || '→';
  };

  const getStatusIcon = (status) => {
    const icons = {
      completed: '✔',
      current: '●',
      locked: '🔒'
    };
    return icons[status] || '→';
  };

  return (
    <div className="roadmap-container">
      <header className="roadmap-header">
        <div className="header-content">
          <h1 className="logo-text">nudge</h1>
          <div className="header-text">
            <h2>Your Career Roadmap</h2>
            <p>Stop learning. Start doing. Get hired.</p>
          </div>
        </div>
      </header>

      <main className="roadmap-main">
        <section className="readiness-card">
          <h3>Readiness Score</h3>
          <div className="score-circle">
            <div className="score-value">{roadmapData.readinessScore}%</div>
            <div className="score-label">Internship Ready</div>
          </div>
          <p className="score-description">
            {roadmapData.readinessScore < 40
              ? "You're just getting started. Keep building skills!"
              : roadmapData.readinessScore < 70
              ? "Great progress! You're on the right track."
              : "Excellent! You're ready to apply for internships."}
          </p>
        </section>

        <section className="phase-card">
          <h3>Current Phase</h3>
          <div className="phase-content">
            <div className="phase-icon">{getPhaseIcon(roadmapData.phase)}</div>
            <div className="phase-details">
              <p className="phase-name">{roadmapData.phase}</p>
              <p className="phase-desc">
                {roadmapData.phase === 'Learning'
                  ? 'Master the fundamentals'
                  : roadmapData.phase === 'Building'
                  ? 'Create real projects'
                  : 'Land your first opportunity'}
              </p>
            </div>
          </div>
        </section>

        <section className="roadmap-section">
          <h3>Your Learning Path</h3>
          <div className="roadmap-timeline">
            {roadmapData.roadmap.map((step, index) => (
              <div key={index} className={`roadmap-item roadmap-${step.status}`}>
                <div className={`item-status status-${step.status}`}>
                  {getStatusIcon(step.status)}
                </div>
                <div className="item-content">
                  <p className="item-name">{step.item}</p>
                  <p className="item-status-text">
                    {step.status === 'completed'
                      ? 'Completed'
                      : step.status === 'current'
                      ? 'Current'
                      : 'Locked'}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="projects-section">
          <h3>Suggested Projects</h3>
          <div className="projects-grid">
            {roadmapData.projects.map((project, index) => (
              <div key={index} className="project-card">
                <div className="project-icon">📁</div>
                <h4>{project}</h4>
                <p>Start this project to level up</p>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}