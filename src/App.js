import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { auth } from "./firebase";
import Login from "./components/login";
import Signup from "./components/signup";
import Home from "./components/home";
import TimerApp from "./components/timer";

// Create a custom route for protected routes
function ProtectedRoute({ element }) {
  const user = auth.currentUser; // Check the user's authentication status
  return user ? element : <Navigate to="/login" />;
}

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        setUser(authUser);
      } else {
        setUser(null);
      }
    });
  }, []);

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/" element={<Home name={user?.displayName} />} />
          <Route path="/timer" element={<ProtectedRoute element={<TimerApp />} />} />
          {!user && <Route path="/*" element={<Login />} />}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
