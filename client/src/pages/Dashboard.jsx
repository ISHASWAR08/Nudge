import { useContext } from "react";
import { UserContext } from "../context/UserContext";
function Dashboard() {
  const { userData } = useContext(UserContext);
  return (
    <div>
      <h1>Nudge Dashboard</h1>

      <h2>Readiness Score: 65%</h2>

      <p>
        Current Phase: Building
      </p>

      <div>
        <h3>Your Nudge</h3>
        <p>
          You've been learning enough. Time to build a project.
        </p>
      </div>
    </div>
  );
}

export default Dashboard;