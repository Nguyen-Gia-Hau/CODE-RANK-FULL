
import React, { useState } from "react";
import styled from "styled-components";

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

const AddLessonForm = ({ onLessonAdded }) => {
  const [courseId, setCourseId] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [order, setOrder] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const lessonData = {
      courseId: courseId ? parseInt(courseId) : undefined,
      title,
      description: description || undefined,
      order: order ? parseInt(order) : undefined,
    };

    try {
      const token = localStorage.getItem("accessToken"); // Assumes access token is stored
      const response = await fetch("http://localhost:3000/lessons", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(lessonData),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Lesson added successfully:", data);
        onLessonAdded(); // Callback to refresh or update UI
        setCourseId("");
        setTitle("");
        setDescription("");
        setOrder("");
      } else {
        const errorData = await response.json();
        console.error("Failed to add lesson:", errorData.message || "Unknown error");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <FormContainer>
      <Title>Add New Lesson</Title>
      <form onSubmit={handleSubmit}>
        <FormField>
          <Label>Title</Label>
          <Input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter lesson title"
            required
          />
        </FormField>
        <FormField>
          <Label>Description</Label>
          <Input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter lesson description (optional)"
          />
        </FormField>
        <FormField>
          <Label>Order</Label>
          <Input
            type="number"
            value={order}
            onChange={(e) => setOrder(e.target.value)}
            placeholder="Enter lesson order (optional)"
          />
        </FormField>
        <SubmitButton type="submit">Create Lesson</SubmitButton>
        <CancelButton
          type="button"
          onClick={() => {
            setCourseId("");
            setTitle("");
            setDescription("");
            setOrder("");
          }}
        >
          Cancel
        </CancelButton>
      </form>
    </FormContainer>
  );
};

export default AddLessonForm;
