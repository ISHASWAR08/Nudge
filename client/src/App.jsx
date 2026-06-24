import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import { UserProvider } from "./context/UserContext";
import Landing from "./pages/Landing";
import Onboarding from "./pages/Onboarding";
import Assessment from "./pages/Assessment";
import Dashboard from "./pages/Dashboard";
import Roadmap from "./pages/Roadmap";

function AppRoutes() {
  const navigate = useNavigate();
  return (
    <Routes>
      <Route path="/" element={<Landing onGetStarted={() => navigate("/onboarding")} />} />
      <Route path="/onboarding" element={<Onboarding />} />
      <Route path="/assessment" element={<Assessment />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/roadmap" element={<Roadmap />} />
    </Routes>
  );
}

function App() {
  return (
    <BrowserRouter>
      <UserProvider>
        <AppRoutes />
      </UserProvider>
    </BrowserRouter>
  );
}

export default App;