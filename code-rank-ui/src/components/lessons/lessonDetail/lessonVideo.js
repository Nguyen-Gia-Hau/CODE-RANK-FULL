
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';

// Styled components
const VideoListContainer = styled.div`
  padding: 20px;
  max-width: 1300px;
  margin: 0 auto;
`;

const VideoItem = styled.div`
  border: 1px solid #ddd;
  padding: 15px;
  margin: 10px 0;
  border-radius: 8px;
  background-color: #f9f9f9;
  display: flex;
  flex-direction: column;

  &:hover {
    background-color: #f1f1f1;
  }
`;

const VideoTitle = styled.h3`
  font-size: 18px;
  margin: 0 0 10px 0;
  color: #2c3e50;
`;

const VideoDuration = styled.p`
  font-size: 14px;
  color: #888;
  margin: 5px 0;
`;

const VideoPlayer = styled.video`
  width: 100%;
  height: auto;
  border-radius: 8px;
  margin-top: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const NoVideosMessage = styled.p`
  text-align: center;
  color: #555;
`;

// Main component
const LessonVideosList = () => {
  const { lessonId } = useParams();
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await fetch(`http://localhost:3000/lesson-videos/${lessonId}`);
        if (!response.ok) throw new Error('Network response was not ok');

        const data = await response.json();
        setVideos(data);
      } catch (error) {
        console.error('Error fetching videos:', error);
      }
    };

    fetchVideos();
  }, [lessonId]);

  return (
    <VideoListContainer>
      <h2>Lesson Videos</h2>
      {videos.length > 0 ? (
        videos.map((video) => (
          <VideoItem key={video.videoId}>
            <VideoTitle>{video.title || 'Untitled Video'}</VideoTitle>
            <VideoDuration>Duration: {video.duration ? `${video.duration} mins` : 'N/A'}</VideoDuration>
            <VideoPlayer controls>
              <source src={`http://localhost:3000/${video.videoUrl}`} type="video/mp4" />
              Your browser does not support the video tag.
            </VideoPlayer>
          </VideoItem>
        ))
      ) : (
        <NoVideosMessage>No videos found for this lesson.</NoVideosMessage>
      )}
    </VideoListContainer>
  );
};

export default LessonVideosList;

