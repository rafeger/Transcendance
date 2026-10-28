import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Quiz from "./pages/Quiz";
import Auth from "./pages/Auth";
import Lobby from "./pages/Lobby";
import MainLayout from "./layout/Layout";
import Profile from "./pages/Profile";
import Friends from "./pages/Friends";
import Privacy from "./pages/Privacy";
import CGU from "./pages/CGU";
import Error404 from "./pages/Error404";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/lobby" element={<Lobby />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/friends" element={<Friends />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<CGU />} />
          <Route path="*" element={<Error404 />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
