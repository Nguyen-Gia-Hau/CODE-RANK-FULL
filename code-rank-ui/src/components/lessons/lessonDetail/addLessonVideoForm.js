
// AddVideoForm.js
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

// Styled components for form
const FormContainer = styled.div`
  padding: 30px;
  max-width: 600px;
  margin: 0 auto;
  border: 1px solid #ddd;
  border-radius: 12px;
  background-color: #ffffff;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h3`
  font-size: 26px;
  text-align: center;
  color: #333;
  margin-bottom: 20px;
`;

const FormField = styled.div`
  margin-bottom: 20px;
`;

const Label = styled.label`
  display: block;
  font-weight: bold;
  color: #555;
  margin-bottom: 5px;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px;
  font-size: 16px;
  border: 1px solid #ddd;
  border-radius: 6px;
  background-color: #f5f5f5;
  color: #333;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: #3498db;
    background-color: #fff;
  }
`;

const SubmitButton = styled.button`
  padding: 12px 20px;
  color: #fff;
  background-color: #3498db;
  border: none;
  border-radius: 6px;
  font-size: 16px;
  cursor: pointer;
  width: 100%;
  transition: background-color 0.3s;

  &:hover {
    background-color: #2980b9;
  }
`;

const CancelButton = styled.button`
  padding: 12px 20px;
  color: #fff;
  background-color: #e74c3c;
  border: none;
  border-radius: 6px;
  font-size: 16px;
  cursor: pointer;
  width: 100%;
  margin-top: 10px;
  transition: background-color 0.3s;

  &:hover {
    background-color: #c0392b;
  }
`;


const AddVideoForm = ({ onVideoAdded }) => {
  const { lessonId } = useParams(); // Correct way to extract lessonId from params
  const [title, setTitle] = useState('');
  const [duration, setDuration] = useState('');
  const [videoFile, setVideoFile] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!videoFile) {
      console.error('No video file selected.');
      return;
    }

    // Optional: Validate file type
    const allowedTypes = ['video/mp4', 'video/webm', 'video/ogg', 'video/mkv'];
    if (!allowedTypes.includes(videoFile.type)) {
      console.error('Invalid file type. Please upload a video file.');
      return;
    }

    const formData = new FormData();
    formData.append('lessonId', lessonId);
    formData.append('title', title);
    formData.append('duration', duration);
    formData.append('file', videoFile);

    try {
      const token = localStorage.getItem('accessToken');
      const response = await fetch('http://localhost:3000/lesson-videos', {
        method: 'POST',
        body: formData,
        headers: {
          'Authorization': `Bearer ${token}`, // Assumes an access token is stored
        },
      });

      if (response.ok) {
        console.log('Video uploaded successfully.');
        onVideoAdded();
        setTitle('');
        setDuration('');
        setVideoFile(null);
      } else {
        const errorData = await response.json();
        console.error('Failed to upload video:', errorData.message || 'Unknown error');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <FormContainer>
      <Title>Add New Video</Title>
      <form onSubmit={handleSubmit}>
        <FormField>
          <Label>Title</Label>
          <Input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
        </FormField>
        <FormField>
          <Label>Duration (minutes)</Label>
          <Input type="number" value={duration} onChange={(e) => setDuration(e.target.value)} />
        </FormField>
        <FormField>
          <Label>Video File</Label>
          <Input type="file" onChange={(e) => setVideoFile(e.target.files[0])} required />
        </FormField>
        <SubmitButton type="submit">Upload Video</SubmitButton>
        <CancelButton type="button" onClick={() => {
          setTitle('');
          setDuration('');
          setVideoFile(null);
        }}>Cancel</CancelButton>
      </form>
    </FormContainer>
  );
};

export default AddVideoForm;
