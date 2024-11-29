
import React, { useState } from 'react';
import styled from 'styled-components';

// Styled components
const Container = styled.div`
  padding: 20px;
  font-family: Arial, sans-serif;
`;

const Button = styled.button`
  padding: 5px 15px;
  margin-bottom: 10px;
  border: none;
  border-radius: 4px;
  background-color: #007bff;
  color: white;
  cursor: pointer;
  font-size: 14px;

  &:hover {
    background-color: #0056b3;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 15px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #f9f9f9;
  position: relative;
`;

const Input = styled.input`
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const TextArea = styled.textarea`
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const SubmitButton = styled.button`
  padding: 8px;
  border: none;
  border-radius: 4px;
  background-color: #28a745;
  color: white;
  cursor: pointer;
  font-size: 14px;

  &:hover {
    background-color: #218838;
  }
`;

const CloseButton = styled.button`
  border: none;
  background: transparent;
  font-size: 16px;
  cursor: pointer;
  color: #333;

  &:hover {
    color: #000;
  }
`;


const Message = styled.div`
  margin-top: 10px;
  padding: 10px;
  border-radius: 4px;
  background-color: ${(props) => (props.$success ? '#d4edda' : '#f8d7da')};
  color: ${(props) => (props.$success ? '#155724' : '#721c24')};
  border: 1px solid ${(props) => (props.$success ? '#c3e6cb' : '#f5c6cb')};
`;


// Component CreateCourseForm
const CreateCourseForm = ({ onCreate, onClose }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    instructor_id: '',
  });
  const [imageFile, setImageFile] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    formDataToSend.append('title', formData.title);
    formDataToSend.append('description', formData.description);
    formDataToSend.append('instructor_id', formData.instructor_id);
    if (imageFile) {
      formDataToSend.append('image', imageFile);
    }

    onCreate(formDataToSend);
    setFormData({ title: '', description: '', instructor_id: '' });
    setImageFile(null);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Input
        type="text"
        name="title"
        placeholder="Title"
        value={formData.title}
        onChange={handleChange}
        required
      />
      <TextArea
        name="description"
        placeholder="Description"
        value={formData.description}
        onChange={handleChange}
      />
      <Input
        type="number"
        name="instructor_id"
        placeholder="Instructor ID"
        value={formData.instructor_id}
        onChange={handleChange}
      />
      <Input
        type="file"
        name="image"
        accept="image/*"
        onChange={handleFileChange}
      />
      <SubmitButton type="submit">Submit</SubmitButton>
      <CloseButton onClick={onClose}>&times;</CloseButton>
    </Form>
  );
};

// Component CreateCourse
const CreateCourse = () => {
  const [showForm, setShowForm] = useState(false);
  const [message, setMessage] = useState(null);

  const handleCreateCourse = (courseData) => {
    const token = localStorage.getItem('accessToken');
    fetch('http://localhost:3000/coures', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      body: courseData,
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          setMessage({ text: 'Course created successfully!', success: true });
        } else {
          setMessage({ text: 'Failed to create course. Please try again.', success: false });
        }
        setShowForm(false);
      })
      .catch((error) => {
        console.error('Error creating course:', error);
        setMessage({ text: 'Error occurred while creating course.', success: false });
      });
  };

  return (
    <Container>

      <CreateCourseForm
        onCreate={handleCreateCourse}
        onClose={() => setShowForm(false)}
      />

    </Container>
  );
};

export default CreateCourse;

