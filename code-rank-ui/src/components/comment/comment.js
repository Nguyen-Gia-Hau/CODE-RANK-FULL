import React, { useState } from 'react';
import styled from 'styled-components';

// Styled components

const CommentsContainer = styled.div`
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
  background-color: #f9f9f9;
  border-radius: 8px;
  border: 1px solid #ddd;
  text-align: left; /* Đảm bảo nội dung luôn căn trái */
`;
const CommentList = styled.div`
  margin-top: 20px;
`;

const CommentItem = styled.div`
  padding: 15px;
  margin-bottom: 10px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const CommentAuthor = styled.h4`
  font-size: 16px;
  color: #333;
  margin: 0 0 5px 0;
`;

const CommentText = styled.p`
  font-size: 14px;
  color: #555;
  margin: 0;
`;

const CommentDate = styled.p`
  font-size: 12px;
  color: #888;
  margin-top: 5px;
`;

const NewCommentForm = styled.form`
  margin-top: 20px;
  display: flex;
  flex-direction: column;
`;

const CommentInput = styled.textarea`
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  resize: none;
  font-size: 14px;
  margin-bottom: 10px;
`;

const SubmitButton = styled.button`
  padding: 10px 15px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;

  &:hover {
    background-color: #45a049;
  }
`;

const DeleteButton = styled.button`
  padding: 5px 10px;
  background-color: #f44336;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 12px;
  cursor: pointer;

  &:hover {
    background-color: #d32f2f;
  }
`;

const EditButton = styled.button`
  padding: 5px 10px;
  background-color: #2196f3;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 12px;
  cursor: pointer;

  &:hover {
    background-color: #1976d2;
  }
`;

const Comments = () => {
  const userRole = localStorage.getItem('role')
  const [comments, setComments] = useState([
    { id: 1, author: 'John Doe', text: 'This is a great lesson!', date: new Date() },
    { id: 2, author: 'Jane Smith', text: 'Thanks for the helpful content.', date: new Date() },
  ]);
  const [newComment, setNewComment] = useState('');
  const [editingComment, setEditingComment] = useState(null);
  const [editingText, setEditingText] = useState('');

  // Create
  const handleAddComment = (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    const newCommentObj = {
      id: Date.now(),
      author: 'Anonymous', // Replace with logged-in user info if available
      text: newComment,
      date: new Date(),
    };
    setComments([...comments, newCommentObj]);
    setNewComment('');
  };

  // Delete
  const handleDeleteComment = (id) => {
    setComments(comments.filter((comment) => comment.id !== id));
  };

  // Update
  const handleEditComment = (id) => {
    setEditingComment(id);
    const comment = comments.find((comment) => comment.id === id);
    setEditingText(comment.text);
  };

  const handleUpdateComment = (e) => {
    e.preventDefault();
    setComments(
      comments.map((comment) =>
        comment.id === editingComment ? { ...comment, text: editingText } : comment
      )
    );
    setEditingComment(null);
    setEditingText('');
  };

  return (
    <CommentsContainer>
      <h3>Comments</h3>
      <CommentList>
        {comments.length > 0 ? (
          comments.map((comment) => (
            <CommentItem key={comment.id}>
              <CommentAuthor>{comment.author}</CommentAuthor>
              {editingComment === comment.id ? (
                <form onSubmit={handleUpdateComment}>
                  <CommentInput
                    value={editingText}
                    onChange={(e) => setEditingText(e.target.value)}
                  />
                  <SubmitButton type="submit">Update</SubmitButton>
                </form>
              ) : (
                <>
                  <CommentText>{comment.text}</CommentText>
                  <CommentDate>{comment.date.toLocaleString()}</CommentDate>
                  {userRole == 'admin' && <DeleteButton onClick={() => handleDeleteComment(comment.id)}>Delete</DeleteButton>}
                </>
              )}
            </CommentItem>
          ))
        ) : (
          <p>No comments yet. Be the first to comment!</p>
        )}
      </CommentList>
      <NewCommentForm onSubmit={handleAddComment}>
        <CommentInput
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Write your comment here..."
          rows="4"
        />
        <SubmitButton type="submit">Add Comment</SubmitButton>
      </NewCommentForm>
    </CommentsContainer>
  );
};

export default Comments;

