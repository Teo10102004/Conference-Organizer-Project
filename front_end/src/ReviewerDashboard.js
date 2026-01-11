import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ReviewerDashboard = ({ currentUser, onLogout }) => {
    const [myReviews, setMyReviews] = useState([]);
    const [feedbackMap, setFeedbackMap] = useState({});

    useEffect(() => {
        axios.get('http://localhost:3000/reviews')
            .then(res => {
                const filtered = res.data.filter(r => r.reviewerId === currentUser.id);
                setMyReviews(filtered);
            })
            .catch(err => console.error(err));
    }, [currentUser.id]);

    const handleTextChange = (reviewId, value) => {
        setFeedbackMap({ ...feedbackMap, [reviewId]: value });
    };

    const submitFeedback = (reviewId) => {
    const textToSubmit = feedbackMap[reviewId] || "";

    axios.put(`http://localhost:3000/reviews/${reviewId}`, {
        feedback: textToSubmit,
        status: 'completed' 
    })
    .then(() => {
        alert("Review successfully submitted!");
        setMyReviews(myReviews.map(r => r.id === reviewId ? { 
            ...r, 
            status: 'completed', 
            feedback: textToSubmit 
        } : r));
    })
    .catch(err => console.error("Update failed:", err));
};

    return (
        <div style={{ padding: '20px', fontFamily: 'Arial' }}>
            <button onClick={onLogout} style={{ float: 'right', padding: '5px 10px' }}>Logout</button>
            <h1>Reviewer Dashboard</h1>
            <p>Welcome, {currentUser.name}</p>

            <h2>Pending Reviews</h2>
            {myReviews.filter(r => r.status === 'pending').map(review => (
                <div key={review.id} style={{ border: '1px solid #ccc', borderRadius: '8px', margin: '10px 0', padding: '15px' }}>
                    <h3>{review.Article?.title}</h3>
                    <p style={{ backgroundColor: '#f4f4f4', padding: '10px' }}>{review.Article?.content}</p>
                    <textarea
                        style={{ width: '100%', minHeight: '80px' }}
                        placeholder='Enter feedback...'
                        value={feedbackMap[review.id] || ""}
                        onChange={(e) => handleTextChange(review.id, e.target.value)}
                    />
                    <button onClick={() => submitFeedback(review.id)} style={{ marginTop: '10px', backgroundColor: '#007bff', color: 'white', padding: '8px 16px' }}>
                        Submit Final Review
                    </button>
                </div>
            ))}

            <h2 style={{ marginTop: '40px' }}>Completed History</h2>
            {myReviews.filter(r => r.status === 'completed').map(review => (
                <div key={review.id} style={{ border: '1px solid #eee', backgroundColor: '#f9f9f9', margin: '10px 0', padding: '15px' }}>
                    <p><strong>Article:</strong> {review.Article?.title}</p>
                    <p><strong>Your Feedback:</strong> {review.feedback}</p>
                </div>
            ))}
        </div>
    );
};

export default ReviewerDashboard;