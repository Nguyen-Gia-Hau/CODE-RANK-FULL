
import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

// Styled Components
const TableContainer = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  overflow: hidden;
`;

const TableHeader = styled.th`
  background-color: #4CAF50;
  color: white;
  padding: 12px 15px;
  text-align: left;
`;

const TableRow = styled.tr`
  transition: background-color 0.3s ease;
  
  &:hover {
    background-color: #f1f1f1;
  }
`;

const TableData = styled.td`
  padding: 12px 15px;
  text-align: left;
  vertical-align: middle;
  border-bottom: 1px solid #ddd;
`;

const ActionButton = styled.button`
  background-color: #f44336;
  color: white;
  padding: 8px 16px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-right: 8px;
  font-size: 14px;
  transition: background-color 0.3s ease;
  
  &:hover {
    background-color: #d32f2f;
  }

  &:focus {
    outline: none;
  }
`;

const UpdateButton = styled(ActionButton)`
  background-color: #4CAF50;
  
  &:hover {
    background-color: #388E3C;
  }
`;

const ProblemTable = ({
  role,
  problems,
  problemTypes,
  handleShowSubmissions,
  handleDeleteProblem,
  handleUpdateProblem,
}) => {
  // Hàm xử lý xóa với xác nhận
  const confirmDelete = (problemId) => {
    if (window.confirm('Are you sure you want to delete this problem?')) {
      handleDeleteProblem(problemId);
    }
  };

  // Hàm xử lý cập nhật với xác nhận
  const confirmUpdate = (problemId) => {
    if (window.confirm('Are you sure you want to update this problem?')) {
      handleUpdateProblem(problemId);
    }
  };

  return (
    <TableContainer>
      <thead>
        <tr>
          <TableHeader>Title</TableHeader>
          <TableHeader>Difficulty</TableHeader>
          <TableHeader>Type</TableHeader>
          <TableHeader>Total Submissions</TableHeader>
          <TableHeader>Total Correct</TableHeader>
          <TableHeader>Points</TableHeader>
          {role === 'admin' && <TableHeader>Actions</TableHeader>}
        </tr>
      </thead>

      <tbody>
        {problems.map((problem) => (
          <TableRow key={problem.problem_id}>
            <TableData>
              <Link to={`/problems/${problem.problem_id}`}>{problem.title}</Link>
            </TableData>
            <TableData>{problem.difficulty}</TableData>
            <TableData>
              {problemTypes.find((type) => type.type_id === problem.type_id)?.name || 'Unknown'}
            </TableData>
            <TableData
              className="submissions"
              onClick={() => handleShowSubmissions(problem.problem_id)}
            >
              <a>{problem.total_submissions}</a>
            </TableData>
            <TableData>{problem.total_correct}</TableData>
            <TableData>{problem.point}</TableData>
            {role === 'admin' && (
              <TableData>
                <ActionButton onClick={() => confirmDelete(problem.problem_id)}>Delete</ActionButton>
                <UpdateButton onClick={() => confirmUpdate(problem.problem_id)}>Update</UpdateButton>
              </TableData>
            )}
          </TableRow>
        ))}
      </tbody>
    </TableContainer>
  );
};

export default ProblemTable;

