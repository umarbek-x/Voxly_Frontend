import { BrowserRouter, Routes, Route } from "react-router-dom";
import GroupDetails from "./pages/GroupDetails";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/groups/:id" element={<GroupDetails />}/>
        <Route path="/" element={<Auth />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;