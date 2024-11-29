
import React from 'react';
import styled from 'styled-components';
import UserSubmissions from '../UserSubmissions/UserSubmissions';

// Styled Components
const Modal = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: #ffffff;
  border-radius: 10px;
  padding: 30px;
  width: 80%;
  max-width: 800px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  animation: fadeIn 0.3s ease-out;

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const CloseButton = styled.button`
  background-color: #f44336;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  margin-top: 20px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #d32f2f;
  }

  &:focus {
    outline: none;
  }
`;

const ProblemSubmissionsModal = ({ selectedProblemId, setSelectedProblemId }) => (
  <Modal>
    <ModalContent>
      <UserSubmissions problemId={selectedProblemId} />
      <CloseButton onClick={() => setSelectedProblemId(null)}>
        Close
      </CloseButton>
    </ModalContent>
  </Modal>
);

export default ProblemSubmissionsModal;

