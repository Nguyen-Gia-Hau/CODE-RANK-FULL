
import React from 'react';
import styled from 'styled-components';
import CourseLessons from "../components/Courses/CouresDetail/CouresDetail";
import CourseRecommendations from "../components/Courses/CoursesList/CourseRecommendations";
import Comments from '../components/comment/comment';

// Styled components
const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

const CommentsContainer = styled.div`
  align-self: flex-start;
  width: 100%;
  max-width: 800px;
  background-color: #f9f9f9;
  border-radius: 8px;
  border: 1px solid #ddd;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const CoursesDetailPage = () => {
  return (
    <PageContainer>
      <CourseLessons />
      <CourseRecommendations />
      <CommentsContainer>
        <Comments />
      </CommentsContainer>
    </PageContainer>
  );
};

export default CoursesDetailPage;


