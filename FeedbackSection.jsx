import React, { useState, useEffect } from "react";
import "./FeedbackSection.css";

const FeedbackSection = () => {
  const [selectedTool, setSelectedTool] = useState("tool1");
  const [feedbackText, setFeedbackText] = useState("");
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [allFeedbacks, setAllFeedbacks] = useState([]);
  const [averageRatings, setAverageRatings] = useState({});

  const tools = [
    { id: "tool1", name: "Tool 1" },
    { id: "tool2", name: "Tool 2" },
    { id: "tool3", name: "Tool 3" },
  ];

  // Simulate loading existing feedbacks (in real app, this would be an API call)
  useEffect(() => {
    const mockFeedbacks = [
      { tool: "tool1", text: "Great tool!", rating: 5, id: 1 },
      { tool: "tool1", text: "Could be better", rating: 3, id: 2 },
      { tool: "tool2", text: "Very useful", rating: 4, id: 3 },
    ];
    setAllFeedbacks(mockFeedbacks);
    calculateAverageRatings(mockFeedbacks);
  }, []);

  const calculateAverageRatings = (feedbacks) => {
    const averages = {};
    tools.forEach((tool) => {
      const toolFeedbacks = feedbacks.filter((fb) => fb.tool === tool.id);
      const avg =
        toolFeedbacks.length > 0
          ? toolFeedbacks.reduce((sum, fb) => sum + fb.rating, 0) /
            toolFeedbacks.length
          : 0;
      averages[tool.id] = avg.toFixed(1);
    });
    setAverageRatings(averages);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!feedbackText || rating === 0) return;

    const newFeedback = {
      tool: selectedTool,
      text: feedbackText,
      rating: rating,
      id: Date.now(), // Temporary ID
    };

    // In a real app, you would send this to your backend API
    const updatedFeedbacks = [...allFeedbacks, newFeedback];
    setAllFeedbacks(updatedFeedbacks);
    calculateAverageRatings(updatedFeedbacks);

    // Reset form
    setFeedbackText("");
    setRating(0);
  };

  const filteredFeedbacks = allFeedbacks.filter(
    (fb) => fb.tool === selectedTool
  );

  return (
    <div className="feedback-section">
      <h3>Give Your Feedback</h3>

      <form onSubmit={handleSubmit} className="feedback-form">
        <div className="form-group">
          <label htmlFor="tool-select">Select Tool:</label>
          <select
            id="tool-select"
            value={selectedTool}
            onChange={(e) => setSelectedTool(e.target.value)}
            className="form-control"
          >
            {tools.map((tool) => (
              <option key={tool.id} value={tool.id}>
                {tool.name} (Avg: {averageRatings[tool.id] || "0.0"})
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="feedback-text">Your Feedback:</label>
          <textarea
            id="feedback-text"
            value={feedbackText}
            onChange={(e) => setFeedbackText(e.target.value)}
            className="form-control"
            rows="3"
            required
          />
        </div>

        <div className="rating">
          <span>Rating:</span>
          <div className="stars">
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                className={`star ${
                  star <= (hoverRating || rating) ? "active" : ""
                }`}
                onClick={() => setRating(star)}
                onMouseEnter={() => setHoverRating(star)}
                onMouseLeave={() => setHoverRating(0)}
              >
                ★
              </span>
            ))}
          </div>
        </div>

        <button type="submit" className="submit-btn">
          Submit Feedback
        </button>
      </form>

      <div className="feedback-list">
        <h4>
          Recent Feedback for {tools.find((t) => t.id === selectedTool)?.name}
        </h4>
        {filteredFeedbacks.length === 0 ? (
          <p>No feedback yet. Be the first to review!</p>
        ) : (
          <ul>
            {filteredFeedbacks.map((feedback) => (
              <li key={feedback.id} className="feedback-item">
                <div className="feedback-rating">
                  {"★".repeat(feedback.rating)}
                  {"☆".repeat(5 - feedback.rating)}
                </div>
                <p>{feedback.text}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default FeedbackSection;
