import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ReviewerDashboard = ({ currentUser }) => {
    const [myReviews, setMyReviews] = useState([]);
    const [feedback, setFeedback] = useState("");

    useEffect(() => {
        axios.get('http://localhost:3000/reviews')
            .then(res => {
                const filtered = res.data.filter(r => r.reviewerId === currentUser.id);
                setMyReviews(filtered);
            })
            .catch(err => console.error(err));
    }, [currentUser.id]);

    const submitFeedback = (reviewId) => {
        axios.put(`http://localhost:3000/reviews/${reviewId}`, {
            feedback: feedback,
            status: 'completed'
        })
            .then(() => {
                alert("Review submitted!");
                setMyReviews(myReviews.map(r => r.id === reviewId ? { ...r, status: 'completed' } : r));
            });
    };

    return (
        <div>
            <h1>Reviewer Dashboard</h1>
            {myReviews.map(review => (
                <div key={review.id} style={{ border: '1px solid black', margin: '10px', padding: '10px' }}>
                    <p>Article ID: {review.articleId} - Status {review.status}</p>
                    {review.status === 'pending' && (
                        <div>
                            <textarea
                                placeholder='Enter feedback...'
                                onChange={(e) => setFeedback(e.target.value)}
                            />
                            <button onClick={() => submitFeedback(review.id)}>Submit Feedback</button>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};

export default ReviewerDashboard;