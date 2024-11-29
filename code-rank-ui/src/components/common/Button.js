
// src/components/common/Button.js
import React from 'react';
import styled from 'styled-components';

const StyledButton = styled.button`
  padding: ${(props) => props.padding || '10px 20px'};
  background: ${(props) => (props.primary ? '#007bff' : '#f0f0f0')};
  color: ${(props) => (props.primary ? 'white' : '#333')};
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background 0.3s ease;
  width: ${(props) => props.width || 'auto'};  /* Độ rộng */
  height: ${(props) => props.height || '40px'};  /* Chiều cao */

  &:hover {
    background: ${(props) => (props.primary ? '#0056b3' : '#e0e0e0')};
  }

  &:disabled {
    cursor: not-allowed;
    background: #ccc;
  }
`;

const Button = ({ onClick, children, primary = false, disabled = false, width, height, padding }) => {
  return (
    <StyledButton
      onClick={onClick}
      primary={primary}
      disabled={disabled}
      width={width}
      height={height}
      padding={padding}
    >
      {children}
    </StyledButton>
  );
};

export default Button;
