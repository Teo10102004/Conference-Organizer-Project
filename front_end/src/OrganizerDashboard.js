import { useEffect, useState } from "react";
import axios from "axios";

function OrganizerDashboard({ user, onLogout }) {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3000/articles")
      .then((res) => setArticles(res.data))
      .catch(() => console.log("No articles yet"));
  }, []);

  return (
    <div style={{ padding: 40 }}>
      <button onClick={onLogout} style={{ float: 'right', padding: '5px 10px' }}>Logout</button>
      <h2>Organizer Dashboard</h2>
      <p>Logged in as: {user.email}</p>

      <h3>Submitted Articles</h3>
      <ul>
        {articles.map((a) => (
          <li key={a.id} style={{ marginBottom: '10px' }}>
            <strong>{a.title}</strong> (ID: {a.id}) – Status: <span style={{ color: 'blue' }}>{a.status}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default OrganizerDashboard;