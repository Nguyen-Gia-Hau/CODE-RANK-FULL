
// src/components/ExerciseList.js
import React, { useState } from 'react';
import styled from 'styled-components';

// Styled components for layout
const ExerciseItem = styled.div`
  background-color: #fff;
  padding: 15px;
  margin-bottom: 10px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const ExerciseTitle = styled.h3`
  font-size: 18px;
  color: #333;
  margin: 0 0 10px;
`;

const ExerciseDescription = styled.p`
  font-size: 14px;
  color: #666;
`;

const DueDate = styled.span`
  font-size: 14px;
  color: #d9534f;
  display: block;
  margin-top: 5px;
`;

const FileInput = styled.input`
  margin-top: 10px;
`;

const SubmitButton = styled.button`
  margin-top: 5px;
  padding: 8px;
  background-color: #4CAF50;
  color: white;
  border: none;
  cursor: pointer;

  &:hover {
    background-color: #45a049;
  }
`;

const exercises = [
  {
    exerciseId: 1,
    title: "Exercise 1: Basics of React",
    description: "Complete the given code and create a functional component in React.",
    dueDate: "2024-11-20",
  },
  {
    exerciseId: 2,
    title: "Exercise 2: API Integration",
    description: "Fetch data from an API and display it in a component.",
    dueDate: "2024-11-22",
  },
];

const ExerciseList = () => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleSubmitFile = (exerciseId) => {
    if (!selectedFile) {
      alert('Please select a file to submit.');
      return;
    }
    // Handle the file submission logic (e.g., sending it to the server)
    console.log(`Submitting file for Exercise ${exerciseId}:`, selectedFile.name);
    // Reset file input after submission
    setSelectedFile(null);
  };

  return (
    <>
      {exercises.map((exercise) => (
        <ExerciseItem key={exercise.exerciseId}>
          <ExerciseTitle>{exercise.title}</ExerciseTitle>
          <ExerciseDescription>{exercise.description}</ExerciseDescription>
          <DueDate>Due Date: {exercise.dueDate}</DueDate>
          <FileInput
            type="file"
            onChange={handleFileChange}
          />
          <SubmitButton onClick={() => handleSubmitFile(exercise.exerciseId)}>
            Submit Exercise
          </SubmitButton>
        </ExerciseItem>
      ))}
    </>
  );
};

export default ExerciseList;
