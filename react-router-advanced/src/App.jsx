import { Routes, Route } from "react-router-dom";
import Home from "./pages//";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route
        path="/profile/*"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />
      <Route path="/user/:userId" element={<UserProfile />} />
      <Route path="/blog/:id" element={<BlogPost />} />

    </Routes>
  );
}

export default App;
