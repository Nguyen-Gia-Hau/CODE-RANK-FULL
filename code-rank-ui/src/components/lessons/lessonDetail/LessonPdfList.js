
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';

// Styled components
const PdfListContainer = styled.div`
  padding: 20px;
  max-width: 1300px;
  margin: 0 auto;
  background-color: #f9f9f9;
  border-radius: 8px;
  border: 1px solid #ddd;
`;

const PdfItem = styled.div`
  display: flex;
  flex-direction: column;
  padding: 15px;
  margin: 10px 0;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  position: relative;
`;

const PdfTitle = styled.h3`
  font-size: 18px;
  color: #333;
  margin: 0 0 5px 0;
`;

const PdfUploadedAt = styled.p`
  font-size: 14px;
  color: #888;
  margin: 5px 0;
`;

const PdfViewer = styled.iframe`
  width: 100%;
  height: 100vh;
  border: none;
  margin-top: 10px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const DeleteButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: #ff4d4f;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 5px 10px;
  cursor: pointer;
  font-size: 14px;

  &:hover {
    background-color: #d9363e;
  }
`;

const NoPdfsMessage = styled.p`
  text-align: center;
  color: #555;
`;

const LessonPdfList = () => {
  const { lessonId } = useParams(); // Assuming you're using react-router-dom
  const [pdfs, setPdfs] = useState([]);
  const userRole = localStorage.getItem('role');

  useEffect(() => {
    const fetchPdfs = async () => {
      try {
        const response = await fetch(`http://localhost:3000/lesson-pdfs/${lessonId}`);
        if (!response.ok) throw new Error('Failed to fetch PDFs');
        const data = await response.json();
        setPdfs(data);
      } catch (error) {
        console.error('Error fetching PDFs:', error);
      }
    };

    fetchPdfs();
  }, [lessonId]);

  async function deletePdf(lessonPdfID) {
    try {
      const token = localStorage.getItem('accessToken');
      const response = await fetch(`http://localhost:3000/lesson-pdfs/${lessonPdfID}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });
      if (!response.ok) throw new Error('Failed to delete PDF');
      console.log(response.json())
      // Remove the deleted PDF from the list
      setPdfs(pdfs.filter((pdf) => pdf.pdfId !== lessonPdfID));
    } catch (error) {
      console.error('Error deleting PDF:', error);
    }
  }

  return (
    <PdfListContainer>
      <h2>Lesson PDFs</h2>
      {pdfs.length > 0 ? (
        pdfs.map((pdf) => (
          <PdfItem key={pdf.pdfId}>
            <PdfTitle>{pdf.title || 'Untitled PDF'}</PdfTitle>
            <PdfUploadedAt>Uploaded on: {new Date(pdf.uploadedAt).toLocaleDateString()}</PdfUploadedAt>
            <PdfViewer src={`http://localhost:3000/${pdf.pdfUrl}`} />
            {userRole === 'admin' && (
              <DeleteButton onClick={async () => deletePdf(pdf.pdfId)}>Delete</DeleteButton>
            )}
          </PdfItem>
        ))
      ) : (
        <NoPdfsMessage>No PDFs found for this lesson.</NoPdfsMessage>
      )}
    </PdfListContainer>
  );
};

export default LessonPdfList;

