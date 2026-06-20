import { BrowserRouter, Routes, Route } from "react-router-dom";
import { UserProvider } from "./context/UserContext";
import Landing from "./pages/Landing";
import Onboarding from "./pages/Onboarding";
import Assessment from "./pages/Assessment";
import Dashboard from "./pages/Dashboard";
import Roadmap from "./pages/Roadmap";

function App() {
  return (
    <UserProvider>
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Landing />} />
        <Route path="/onboarding" element={<Onboarding />} />
        <Route path="/assessment" element={<Assessment />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/roadmap" element={<Roadmap />} />

      </Routes>
    </BrowserRouter>
    </UserProvider>
  );
}

export default App;