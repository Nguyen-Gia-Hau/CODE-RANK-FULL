
import React, { useState } from 'react';
import styled from 'styled-components';

import LessonVideosList from "../components/lessons/lessonDetail/lessonVideo";
import LessonPdfList from "../components/lessons/lessonDetail/LessonPdfList";
import ExerciseList from "../components/lessons/lessonDetail/lessonExercie";
import CourseLessons from '../components/Courses/CouresDetail/CouresDetail'; // Danh sách bài giảng

import AddVideoForm from '../components/lessons/lessonDetail/addLessonVideoForm';
import NewPdfForm from '../components/lessons/lessonDetail/addLessonPdfList';
import Modal from '../components/common/Model';
import Button from '../components/common/Button'; // Import Button component
import Comments from '../components/comment/comment';

// Styled components
const PageContainer = styled.div`
  display: flex;
  padding: 20px;
  gap: 20px;
  background-color: #f7f7f7;
`;

const LeftContainer = styled.div`
  flex: 1;
  padding: 20px;
  background-color: #eef7ff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const RightContainer = styled.div`
  flex: 4;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const SectionTitle = styled.h2`
  font-size: 20px;
  color: #2c3e50;
  margin-bottom: 15px;
`;

const NavigationButton = styled(Button)`
  margin-top: 20px;
  width: 120px;
`;

const LessonDetailPage = () => {
  const [isAddVideoVisible, setAddVideoVisible] = useState(false);
  const [isAddPdfVisible, setAddPdfVisible] = useState(false);

  // Giả sử bạn có một mảng các bài học
  const lessons = [
    { id: 1, title: 'Lesson 1', order: 1 },
    { id: 2, title: 'Lesson 2', order: 2 },
    { id: 3, title: 'Lesson 3', order: 3 },
    // Thêm bài học vào đây
  ];

  const [currentLessonIndex, setCurrentLessonIndex] = useState(0); // Bài học hiện tại

  const userRole = localStorage.getItem('role');

  // Hàm chuyển đến bài học tiếp theo
  const goToNextLesson = () => {
    if (currentLessonIndex < lessons.length - 1) {
      setCurrentLessonIndex(currentLessonIndex + 1);
    }
  };

  // Hàm chuyển đến bài học trước
  const goToPreviousLesson = () => {
    if (currentLessonIndex > 0) {
      setCurrentLessonIndex(currentLessonIndex - 1);
    }
  };

  const currentLesson = lessons[currentLessonIndex];

  return (
    <PageContainer>
      {/* Left Section */}
      <LeftContainer>
        <CourseLessons description={false} title={true} />

      </LeftContainer>

      {/* Right Section */}
      <RightContainer>
        <div>
          <SectionTitle>Theory</SectionTitle>
          <LessonVideosList />
          {userRole === 'admin' && (
            <Button primary onClick={() => setAddVideoVisible(true)}>
              Add Video
            </Button>
          )}
          <LessonPdfList />
          {userRole === 'admin' && (
            <Button primary onClick={() => setAddPdfVisible(true)}>
              Add PDF
            </Button>
          )}
        </div>

        <div>
          <SectionTitle>Exercises</SectionTitle>
          <ExerciseList />
          <NavigationButton onClick={goToPreviousLesson} disabled={currentLessonIndex === 0}>
            Previous Lesson
          </NavigationButton>
          <NavigationButton onClick={goToNextLesson} disabled={currentLessonIndex === lessons.length - 1}>
            Next Lesson
          </NavigationButton>

          <Comments />
        </div>

        <div>
          {/* Previous and Next Buttons */}
        </div>
        {/* Modals */}
        <Modal isVisible={isAddVideoVisible} onClose={() => setAddVideoVisible(false)}>
          <AddVideoForm />
        </Modal>

        <Modal isVisible={isAddPdfVisible} onClose={() => setAddPdfVisible(false)}>
          <NewPdfForm />
        </Modal>
      </RightContainer>

    </PageContainer>
  );
};

export default LessonDetailPage;

