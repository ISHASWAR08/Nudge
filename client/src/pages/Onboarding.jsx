function Onboarding() {
  return (
    <div>
      <h1>Goal Onboarding</h1>

      <p>Tell us your target goal</p>

      <div>
        <label>Target Role: </label>
        <input placeholder="Frontend Developer" />
      </div>

      <div>
        <label>Company Type: </label>
        <input placeholder="Startup / FAANG / Service" />
      </div>

      <div>
        <label>Timeline: </label>
        <input placeholder="3 months" />
      </div>

      <button>
        Continue
      </button>
    </div>
  );
}

export default Onboarding;