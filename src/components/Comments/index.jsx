import React, { useState } from 'react';

const Comments = () => {
  const [comments, setComments] = useState([
    'I love this room it seems like such a relaxing place to be',
    'Hmmmm not sure about this room at all tbh',
  ]);

  const [newComment, setNewComment] = useState('');

  const handleCommentChange = (event) => {
    setNewComment(event.target.value);
  };

  const handleCommentSubmit = (event) => {
    event.preventDefault();
    if (newComment) {
      setComments(prevComments => [...prevComments, newComment]);
      setNewComment('');
    }
  };

  return (
    <div className="comments-section">
      <form onSubmit={handleCommentSubmit}>
        <input
          type="text"
          value={newComment}
          onChange={handleCommentChange}
          placeholder="Enter your comment"
        />
        <button type="submit">Submit</button>
      </form>
      <div className="comments-list">
        {comments.map((comment, index) => (
          <div className="comment" key={index}>{comment}</div>
        ))}
      </div>
    </div>
  );
};

export default Comments;
