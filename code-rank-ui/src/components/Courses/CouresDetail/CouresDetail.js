
import React, { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import AddLessonForm from "../../lessons/lessonDetail/addNewLesson";
// Keyframes for animations
const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

// Styled components
const LayoutWrapper = styled.div`
  display: flex;
  gap: 20px;
  padding: 20px;
  font-family: 'Arial', sans-serif;
  background-color: #f9f9f9;
`;

const LessonListContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
`;

const CourseDetailContainer = styled.div`
  flex: 2;
  padding: 20px;
  background-color: #e3f2fd;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  animation: ${fadeIn} 0.6s ease-out;
`;

const LessonItem = styled.div`
  border: 1px solid #ddd;
  padding: 15px;
  border-radius: 8px;
  background-color: #fff;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s, box-shadow 0.3s;
  animation: ${fadeIn} 0.5s ease-out;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  }
`;

const AddButton = styled.button`
  padding: 10px 15px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #45a049;
  }
`;

const Title = styled.h2`
  font-size: 22px;
  margin: 0;
  cursor: pointer;
  color: #333;

  &:hover {
    color: #1976d2;
  }
`;

const Description = styled.p`
  font-size: 16px;
  color: #666;
`;

const CourseTitle = styled.h1`
  font-size: 28px;
  margin-bottom: 15px;
  color: #1976d2;
`;

const CourseDescription = styled.p`
  font-size: 18px;
  color: #555;
`;

const CourseImage = styled.img`
  max-width: 100%;
  height: auto;
  margin-top: 15px;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
`;

// Main Component
function CourseLessons({ description = true, title = true }) {
  const navigate = useNavigate();
  const { courseID } = useParams();
  const [lessons, setLessons] = useState([]);
  const [course, setCourse] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false); // State để hiển thị form

  useEffect(() => {
    const fetchLessons = async () => {
      try {
        const response = await fetch(`http://localhost:3000/lessons/${courseID}`);
        const data = await response.json();
        setLessons(data);
      } catch (error) {
        console.error("Error fetching lessons:", error);
      }
    };

    const fetchCourse = async () => {
      try {
        const response = await fetch(`http://localhost:3000/coures/${courseID}`);
        const data = await response.json();
        setCourse(data);
      } catch (error) {
        console.error("Error fetching course:", error);
      }
    };

    fetchLessons();
    fetchCourse();
  }, [courseID]);

  const handleLessonAdded = () => {
    setShowAddForm(false); // Đóng form sau khi thêm thành công
    // Làm mới danh sách bài học
    fetch(`http://localhost:3000/lessons/${courseID}`)
      .then((res) => res.json())
      .then((data) => setLessons(data))
      .catch((err) => console.error(err));
  };

  return (
    <LayoutWrapper>
      <LessonListContainer>
        <h1>Course Lessons</h1>
        <AddButton onClick={() => setShowAddForm(true)}>Add Lesson</AddButton>
        {lessons.map((lesson) => (
          <LessonItem key={lesson.lessonId}>
            <Title onClick={() => navigate(`/courses/${courseID}/lessons/${lesson.lessonId}`)}>
              {`Lesson ${lesson.order}: ${lesson.title}`}
            </Title>
            {lesson.description && description && (
              <Description>{lesson.description}</Description>
            )}
          </LessonItem>
        ))}
      </LessonListContainer>

      {showAddForm && (
        <AddLessonForm
          onLessonAdded={handleLessonAdded} // Truyền callback
        />
      )}

      {description && (
        <CourseDetailContainer>
          {course && (
            <>
              <CourseTitle>{course.title}</CourseTitle>
              <CourseDescription>{course.description}</CourseDescription>
              {course.image ? (
                <CourseImage
                  src={`http://localhost:3000/${course.image}`}
                  alt={course.title}
                />
              ) : (
                <CourseImage
                  src="https://via.placeholder.com/300x150"
                  alt="Placeholder"
                />
              )}
            </>
          )}
        </CourseDetailContainer>
      )}
    </LayoutWrapper>
  );
}

export default CourseLessons;

