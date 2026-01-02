import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ReviewerDashboard = ({ currentUser }) => {
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
        setFeedbackMap({...feedbackMap, [reviewId]: value});
    };

    const submitFeedback = (reviewId) => {
        const textToSubmit = feedbackMap[reviewId] || "";

        axios.put(`http://localhost:3000/reviews/${reviewId}`, {
            feedback: textToSubmit,
            status: 'completed'
        })
            .then(() => {
                alert("Review sucessfully submitted!");
                setMyReviews(myReviews.map(r => r.id === reviewId ? { ...r, status: 'completed', 
                    feedback: textToSubmit } : r));
            });
    };

    return (
        <div style={{ padding: '20px', fontFamily: 'Arial' }}>
            <h1>Reviewer Dashboard</h1>
            <p>Welcome, Reviewer #{currentUser.id}</p>

            <h2>Pending Reviews</h2>
            {myReviews.filter(r => r.status === 'pending').map(review => (
                <div key={review.id} style={{ border: '1px solid #ccc', borderRadius: '8px', margin: '10px 0', padding: '15px' }}>
                    <strong>Article ID: {review.articleId}</strong>
                    <div style={{ marginTop: '10px' }}>
                        <textarea
                            style={{ width: '100%', minHeight: '80px' }}
                            placeholder='Enter constructive feedback...'
                            value={feedbackMap[review.id] || ""}
                            onChange={(e) => handleTextChange(review.id, e.target.value)}
                        />
                        <button 
                            onClick={() => submitFeedback(review.id)}
                            style={{ marginTop: '10px', backgroundColor: '#007bff', color: 'white', border: 'none', padding: '8px 16px', borderRadius: '4px', cursor: 'pointer' }}
                        >
                            Submit Final Review
                        </button>
                    </div>
                </div>
            ))}

            <h2 style={{ marginTop: '40px' }}>Completed History</h2>
            {myReviews.filter(r => r.status === 'completed').map(review => (
                <div key={review.id} style={{ border: '1px solid #eee', backgroundColor: '#f9f9f9', margin: '10px 0', padding: '15px', borderRadius: '8px' }}>
                    <p><strong>Article ID:</strong> {review.articleId}</p>
                    <p><strong>Your Feedback:</strong> {review.feedback}</p>
                    <span style={{ color: 'green', fontWeight: 'bold' }}>✓ Completed</span>
                </div>
            ))}
        </div>
    );
};

export default ReviewerDashboard;