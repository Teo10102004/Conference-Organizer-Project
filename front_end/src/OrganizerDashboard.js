import { useEffect, useState } from "react";
import axios from "axios";

function OrganizerDashboard({ user }) {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/articles")
      .then((res) => setArticles(res.data))
      .catch(() => console.log("No articles yet"));
  }, []);

  return (
    <div style={{ padding: 40 }}>
      <h2>Organizer Dashboard</h2>
      <p>Logged in as: {user.email}</p>

      <h3>Submitted Articles</h3>
      <ul>
        {articles.map((a) => (
          <li key={a.id}>
            Article #{a.id} – Status: {a.status}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default OrganizerDashboard;
