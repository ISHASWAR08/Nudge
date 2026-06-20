function Assessment() {
  return (
    <div>
      <h1>Skill Assessment</h1>

      <p>Rate your current skills</p>

      <div>
        <label>React: </label>
        <input type="number" min="1" max="5" />
      </div>

      <div>
        <label>JavaScript: </label>
        <input type="number" min="1" max="5" />
      </div>

      <div>
        <label>Projects: </label>
        <input type="number" min="1" max="5" />
      </div>

      <div>
        <label>DSA: </label>
        <input type="number" min="1" max="5" />
      </div>

      <button>
        Generate My Readiness Score
      </button>
    </div>
  );
}

export default Assessment;