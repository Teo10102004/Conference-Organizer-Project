import React, { useState } from 'react';
import axios from "axios";
import './App.css';
import ReviewerDashboard from './ReviewerDashboard';
import AuthorDashboard from './AuthorDashboard';  
import OrganizerDashboard from "./OrganizerDashboard";

function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  const handleLogin = async () => {
    try {
      const res = await axios.post("http://localhost:3000/auth/login", {
        email,
        password,
      });
      setUser(res.data.user);
    } catch (err) {
      alert("Login failed");
    }
  };

  // Function to clear user state and "log out"
  const handleLogout = () => {
    setUser(null);
    setEmail("");
    setPassword("");
  };

  // Role-based routing logic
  if (user) {
    if (user.role === 'organizer') {
      return <OrganizerDashboard user={user} onLogout={handleLogout} />;
    } else if (user.role === 'author') {
      return <AuthorDashboard currentUser={user} onLogout={handleLogout} />;
    } else if (user.role === 'reviewer') {
      return <ReviewerDashboard currentUser={user} onLogout={handleLogout} />;
    }
  }
  
  return (
    <div style={{ padding: 40 }}>
      <h2>Login</h2>

      <input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <br /><br />

      <input
        placeholder="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <br /><br />

      <button onClick={handleLogin}>Login</button>
    </div>
  );
}

export default App;