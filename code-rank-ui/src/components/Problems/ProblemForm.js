
import React from 'react';
import styled from 'styled-components';

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
  max-width: 600px;
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

const FormTitle = styled.h2`
  text-align: center;
  margin-bottom: 20px;
  font-size: 24px;
  color: #1976d2;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;

  label {
    font-weight: bold;
    color: #333;
  }

  input,
  textarea,
  select {
    padding: 10px;
    font-size: 16px;
    border: 1px solid #ddd;
    border-radius: 5px;
    transition: all 0.3s;

    &:hover {
      border-color: #1976d2;
      box-shadow: 0 0 5px rgba(25, 118, 210, 0.5);
    }

    &:focus {
      outline: none;
      border-color: #1976d2;
      box-shadow: 0 0 10px rgba(25, 118, 210, 0.7);
    }
  }

  textarea {
    resize: vertical;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
`;

const Button = styled.button`
  padding: 10px 20px;
  font-size: 16px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.3s;

  &.submit {
    background: #4caf50;
    color: #fff;

    &:hover {
      background: #388e3c;
    }
  }

  &.cancel {
    background: #f44336;
    color: #fff;

    &:hover {
      background: #d32f2f;
    }
  }
`;

const ProblemForm = ({
  formData,
  problemTypes,
  handleInputChange,
  handleCreateProblem,
  handleCancel,
  isEditMode,
}) => (
  <Modal>
    <ModalContent>
      <FormTitle>{isEditMode ? 'Update Problem' : 'Create New Problem'}</FormTitle>
      <Form onSubmit={handleCreateProblem}>
        <FormGroup>
          <label>Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            required
            maxLength={255}
          />
        </FormGroup>

        <FormGroup>
          <label>Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            required
          />
        </FormGroup>

        <FormGroup>
          <label>Difficulty</label>
          <select
            name="difficulty"
            value={formData.difficulty}
            onChange={handleInputChange}
            required
          >
            <option value="">Select Difficulty</option>
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>
        </FormGroup>

        {/* Add more FormGroup components for each input field */}
        {/* ... */}

        <FormGroup>
          <label>Problem Type</label>
          <select
            name="type_id"
            value={formData.type_id}
            onChange={handleInputChange}
            required
          >
            <option value="">Select Problem Type</option>
            {problemTypes.map((type) => (
              <option key={type.type_id} value={type.type_id}>
                {type.name}
              </option>
            ))}
          </select>
        </FormGroup>

        <ButtonGroup>
          <Button type="submit" className="submit">
            {isEditMode ? 'Update' : 'Create'}
          </Button>
          <Button type="button" className="cancel" onClick={handleCancel}>
            Cancel
          </Button>
        </ButtonGroup>
      </Form>
    </ModalContent>
  </Modal>
);

export default ProblemForm;

