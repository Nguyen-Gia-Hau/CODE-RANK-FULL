
import React, { useState } from "react";
import CreateCourse from "../components/Courses/CoursesList/CoursesCreate";
import CoursesList from "../components/Courses/CoursesList/CoursesList";
import styled from "styled-components";

const Container = styled.div`
  padding: 20px;
`;

const Button = styled.button`
  background-color: #4CAF50;
  color: white;
  padding: 10px 20px;
  border: none;
  cursor: pointer;
  &:hover {
    background-color: #45a049;
  }
`;

const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  background-color: white;
  padding: 20px;
  max-width: 600px;
  width: 100%;
`;

const CoursesPage = () => {
  const userRole = localStorage.getItem('role');
  const [isModalVisible, setIsModalVisible] = useState(false);

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  return (
    <Container>
      <CoursesList />
      {userRole === 'admin' && (
        <>
          <Button onClick={toggleModal}>Create Course</Button>
          {isModalVisible && (
            <Modal>
              <ModalContent>
                <h2>Create Course</h2>
                <CreateCourse />
                <Button onClick={toggleModal}>Close</Button>
              </ModalContent>
            </Modal>
          )}
        </>
      )}
    </Container>
  );
};

export default CoursesPage;

