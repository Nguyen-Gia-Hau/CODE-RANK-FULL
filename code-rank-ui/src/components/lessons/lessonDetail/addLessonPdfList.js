
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

// Styled components
const FormContainer = styled.div`
  padding: 30px;
  max-width: 600px;
  margin: 0 auto;
  border: 1px solid #ddd;
  border-radius: 12px;
  background-color: #ffffff;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
`;

const FormTitle = styled.h2`
  font-size: 24px;
  color: #333;
  text-align: center;
  margin-bottom: 20px;
`;

const FormField = styled.div`
  margin-bottom: 15px;
`;

const Label = styled.label`
  font-size: 14px;
  color: #333;
  margin-bottom: 5px;
  display: block;
`;

const Input = styled.input`
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
  color: #333;
`;

const FileInput = styled.input`
  padding: 8px 0;
`;

const SubmitButton = styled.button`
  width: 100%;
  padding: 10px;
  background-color: #3498db;
  color: #fff;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;

  &:hover {
    background-color: #2980b9;
  }
`;

const ErrorMessage = styled.p`
  color: red;
  text-align: center;
  margin-top: 10px;
`;

const SuccessMessage = styled.p`
  color: green;
  text-align: center;
  margin-top: 10px;
`;

const NewPdfForm = () => {
  const [title, setTitle] = useState('');
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');
  const { lessonId } = useParams();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    if (!file) {
      setMessage('Please upload a PDF file.');
      return;
    }

    const formData = new FormData();
    formData.append('title', title);
    formData.append('lessonId', lessonId);
    formData.append('file', file);
    try {
      const token = localStorage.getItem('accessToken');
      const response = await fetch(`http://localhost:3000/lesson-pdfs/`, {
        method: 'POST',
        body: formData,
        headers: {
          'Authorization': `Bearer ${token}`,
        }

      });

      if (response.ok) {
        setMessage('PDF uploaded successfully!');
        setTitle('');
        setFile(null);
      } else {
        setMessage('Failed to upload PDF.');
      }
    } catch (error) {
      setMessage('An error occurred. Please try again.');
      console.error('Error uploading PDF:', error);
    }
  };

  return (
    <FormContainer>
      <FormTitle>Upload New PDF</FormTitle>
      <form onSubmit={handleSubmit}>
        <FormField>
          <Label htmlFor="title">PDF Title</Label>
          <Input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter PDF title"
          />
        </FormField>
        <FormField>
          <Label htmlFor="file">Select PDF File</Label>
          <FileInput
            type="file"
            id="file"
            accept="application/pdf"
            onChange={(e) => setFile(e.target.files[0])}
          />
        </FormField>
        <SubmitButton type="submit">Upload PDF</SubmitButton>
      </form>
      {message && (
        <div>
          {message.startsWith('Failed') || message.startsWith('An error') ? (
            <ErrorMessage>{message}</ErrorMessage>
          ) : (
            <SuccessMessage>{message}</SuccessMessage>
          )}
        </div>
      )}
    </FormContainer>
  );
};

export default NewPdfForm;
