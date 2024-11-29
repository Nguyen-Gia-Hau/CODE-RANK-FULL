
import React, { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';

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
const RecommendationsWrapper = styled.div`
  padding: 20px;
  margin-top: 40px;
  margin: 0 auto;
  font-family: 'Arial', sans-serif;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
`;

const SectionTitle = styled.h2`
  font-size: 24px;
  color: #1976d2;
  margin-bottom: 20px;
  text-align: center;
`;

const CourseGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
`;

const CourseCard = styled.div`
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: white;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  animation: ${fadeIn} 0.5s ease-out;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  }
`;

const CourseImage = styled.img`
  width: 100%;
  height: 150px;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 15px;
`;

const CourseTitle = styled.h3`
  font-size: 20px;
  color: #333;
  margin-bottom: 10px;

  &:hover {
    color: #1976d2;
  }
`;

const CourseDescription = styled.p`
  font-size: 16px;
  color: #666;
`;

const NoCoursesMessage = styled.p`
  font-size: 16px;
  color: #999;
  text-align: center;
`;

// Recommendations Component
function CourseRecommendations() {
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch('http://localhost:3000/coures'); // Corrected endpoint
        if (!response.ok) throw new Error('Failed to fetch courses');

        const data = await response.json();

        // Debug log to inspect data
        console.log('Fetched courses:', data);

        setCourses(data);

        // Filter logic: Ensure the field used for filtering exists
        const recommendedCourses = data.filter(
          (course) => course.popularity && course.popularity > 80
        );
        setFilteredCourses(data);
      } catch (error) {
        console.error('Error fetching courses:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  return (
    <RecommendationsWrapper>
      <SectionTitle>Recommended Courses for You</SectionTitle>
      {loading ? (
        <NoCoursesMessage>Loading recommendations...</NoCoursesMessage>
      ) : filteredCourses.length > 0 ? (
        <CourseGrid>
          {filteredCourses.map((course) => (
            <CourseCard key={course.id}>
              {course.image ? (
                <CourseImage
                  src={`http://localhost:3000/${course.image}`}
                  alt={course.title} />
              ) : (
                <CourseImage
                  src="https://via.placeholder.com/300x150"
                  alt="Placeholder"
                />
              )}                        <CourseTitle>{course.title || 'Untitled Course'}</CourseTitle>
              <CourseDescription>
                {course.description || 'No description available.'}
              </CourseDescription>
            </CourseCard>
          ))}
        </CourseGrid>
      ) : (
        <NoCoursesMessage>No recommended courses at the moment. Check back later!</NoCoursesMessage>
      )}
    </RecommendationsWrapper>
  );
}

export default CourseRecommendations;

