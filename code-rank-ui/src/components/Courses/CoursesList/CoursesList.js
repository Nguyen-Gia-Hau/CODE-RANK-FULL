
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

// Styled components
const Container = styled.div`
  padding: 20px;
  font-family: Arial, sans-serif;
`;

const Title = styled.h2`
  text-align: center;
  color: #333;
`;

const CourseList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  padding: 0;
`;

const CourseItem = styled.div`
  padding: 15px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #f9f9f9;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  transition: background-color 0.3s, transform 0.3s;

  &:hover {
    background-color: #f1f1f1;
    transform: scale(1.05);
  }
`;

const CourseImage = styled.img`
  width: 100%;
  height: 150px;
  object-fit: cover;
  border-radius: 4px;
  margin-bottom: 10px;
  transition: transform 0.3s, filter 0.3s;

  ${CourseItem}:hover & {
    transform: scale(1.1);
    filter: brightness(0.9);
  }
`;

const CourseTitle = styled.h3`
  margin: 0;
  color: #2c3e50;
  cursor: pointer;
  transition: color 0.3s;

  &:hover {
    color: #1abc9c;
  }
`;

const CourseDescription = styled.p`
  margin: 10px 0;
  color: #555;
  transition: opacity 0.3s;

  ${CourseItem}:hover & {
    opacity: 0.85;
  }
`;

const CourseInstructor = styled.small`
  color: #888;
  transition: color 0.3s;

  &:hover {
    color: #555;
  }
`;

// Component hiển thị danh sách khóa học
const CoursesList = () => {
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate(); // Call useNavigate at the top of the component

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch('http://localhost:3000/coures'); // Thay đổi URL theo API của bạn
        const data = await response.json();
        console.log(data);
        setCourses(data);
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };

    fetchCourses();
  }, []);

  return (
    <Container>
      <Title>Danh sách khóa học</Title>
      {courses.length > 0 ? (
        <CourseList>
          {courses.map((course) => (
            <CourseItem key={course.course_id}>
              {course.image ? (
                <CourseImage src={`http://localhost:3000/${course.image}`} alt={course.title} />
              ) : (
                <CourseImage
                  src="https://via.placeholder.com/300x150"
                  alt="Placeholder"
                />
              )}
              <CourseTitle onClick={() => navigate(`/courses/${course.course_id}`)}>
                {course.title}
              </CourseTitle>
              <CourseDescription>{course.description}</CourseDescription>
              <CourseInstructor>Instructor ID: {course.instructor_id}</CourseInstructor>
            </CourseItem>
          ))}
        </CourseList>
      ) : (
        <p>Không có khóa học nào được tìm thấy.</p>
      )}
    </Container>
  );
};

export default CoursesList;

