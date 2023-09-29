import React, { useState } from 'react';


const Comment = ({ author, text }) => (
  <div className="comment">
    <h5>{author}</h5>
    <p>{text}</p>
  </div>
);


const CommentsList = ({ comments }) => (
  <div className="comments-list">
    {comments.map((comment, index) => (
      <Comment key={index} {...comment} />
    ))}
  </div>
);


const Comments = () => {
  const [comments, setComments] = useState([
    { author: 'Alice', text: 'Love this room' },
    { author: 'Bob', text: 'Not sure I would choose this style but its an interesting room.' },
  ]);

  const [newComment, setNewComment] = useState({ author: '', text: '' });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewComment({ ...newComment, [name]: value });
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    setComments([...comments, newComment]);
    setNewComment({ author: '', text: '' });
  };

  return (
    <div className="comments-section">
      <CommentsList comments={comments} />
      <form onSubmit={handleCommentSubmit}>
        <input
          type="text"
          name="author"
          placeholder="Your name"
          value={newComment.author}
          onChange={handleInputChange}
        />
        <textarea
          name="text"
          placeholder="Your comment"
          value={newComment.text}
          onChange={handleInputChange}
        ></textarea>
        <button className='submit-comment-button' type="submit">Submit Comment</button>
      </form>
    </div>
  );
};

export default Comments;
