import React, { useState } from 'react';
import axios from 'axios';

function AuthorDashboard({ currentUser }) {
    // State to hold form data
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [conferenceId, setConferenceId] = useState("");
    
    // State for feedback messages
    const [message, setMessage] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage(null);

        try {
            // POST request to create the article
            const res = await axios.post('http://localhost:3000/articles', {
                title: title,
                content: content,
                conferenceId: conferenceId,
                authorId: currentUser.id // Uses the logged-in user's ID
            });

            // If successful:
            setMessage({ type: "success", text: `Success! Article submitted. (ID: ${res.data.article.id})` });
            
            // Clear the form
            setTitle("");
            setContent("");
            setConferenceId("");

        } catch (error) {
            console.error(error);
            setMessage({ type: "error", text: "Error submitting article. Check console for details." });
        }
    };

    return (
        <div style={{ maxWidth: "600px", margin: "20px auto", padding: "20px", border: "1px solid #ddd", borderRadius: "8px" }}>
            <h2>✍️ Author Dashboard</h2>
            <p>Welcome, <strong>{currentUser.name}</strong>!</p>
            <hr />

            <h3>Submit New Article</h3>
            
            {message && (
                <div style={{ 
                    padding: "10px", 
                    marginBottom: "15px", 
                    backgroundColor: message.type === "success" ? "#d4edda" : "#f8d7da",
                    color: message.type === "success" ? "#155724" : "#721c24"
                }}>
                    {message.text}
                </div>
            )}

            <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: "15px" }}>
                    <label><strong>Article Title:</strong></label><br />
                    <input 
                        type="text" 
                        value={title} 
                        onChange={(e) => setTitle(e.target.value)} 
                        required 
                        style={{ width: "100%", padding: "8px", marginTop: "5px" }}
                        placeholder="e.g. The Future of AI"
                    />
                </div>

                <div style={{ marginBottom: "15px" }}>
                    <label><strong>Content / Abstract:</strong></label><br />
                    <textarea 
                        value={content} 
                        onChange={(e) => setContent(e.target.value)} 
                        required 
                        style={{ width: "100%", height: "100px", padding: "8px", marginTop: "5px" }}
                        placeholder="Paste your article text here..."
                    />
                </div>

                <div style={{ marginBottom: "15px" }}>
                    <label><strong>Conference ID:</strong></label><br />
                    <input 
                        type="number" 
                        value={conferenceId} 
                        onChange={(e) => setConferenceId(e.target.value)} 
                        required 
                        style={{ width: "100%", padding: "8px", marginTop: "5px" }}
                        placeholder="e.g. 1"
                    />
                    <small style={{ color: "gray" }}>Enter the ID of the conference you are applying to.</small>
                </div>

                <button 
                    type="submit" 
                    style={{ 
                        background: "blue", 
                        color: "white", 
                        padding: "10px 20px", 
                        border: "none", 
                        borderRadius: "5px", 
                        cursor: "pointer",
                        fontWeight: "bold"
                    }}
                >
                    Submit Article
                </button>
            </form>
        </div>
    );
}

export default AuthorDashboard;