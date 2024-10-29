import React, { useState, useEffect } from "react";
import axios from "axios";

const Comments = ({ blogId }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const { data } = await axios.get(`http://localhost:4000/api/v1/comments/${blogId}`, {
          withCredentials: true,
        });
        setComments(data.comments);
      } catch (error) {
        console.error("Error fetching comments:", error.response ? error.response.data : error);
        setError("Failed to load comments.");
      } finally {
        setLoading(false);
      }
    };
    
    fetchComments();
  }, [blogId]);

  const handleAddComment = async () => {
    if (!newComment.trim()) {
      alert("Comment cannot be empty.");
      return;
    }

    try {
      setError(null);
      const { data } = await axios.post(
        "http://localhost:4000/api/v1/comments/add",
        {
          blogId,
          content: newComment,
        },
        { withCredentials: true }
      );

      setComments((prev) => [data.comment, ...prev]);
      setNewComment("");
    } catch (error) {
      console.error("Error adding comment:", error);
      setError("Failed to add comment.");
    }
  };

  if (loading) {
    return <div>Loading comments...</div>;
  }

  return (
    <div className="comments-container">
      <h3>Comments</h3>
      {error && <p className="error-message">{error}</p>}
      <div>
        {comments.length > 0 ? (
          comments.map((comment) => (
            <div key={comment._id} className="comment">
              <p>
                <strong>{comment.user.name}</strong>
              </p>
              <p>{comment.content}</p>
            </div>
          ))
        ) : (
          <p>No comments yet</p>
        )}
      </div>
      <div className="comment-input">
        <input
          type="text"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Add a comment"
        />
        <button onClick={handleAddComment}>Submit</button>
      </div>
    </div>
  );
};

export default Comments;
