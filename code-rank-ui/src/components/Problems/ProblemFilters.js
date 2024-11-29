
import React from 'react';
import styled, { keyframes } from 'styled-components';

// Keyframes cho hiệu ứng
const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const FiltersContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px;
  background-color: #f7f9fc;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  animation: ${fadeIn} 0.5s ease-out;
`;

const FilterGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;

  label {
    font-weight: bold;
    color: #333;
  }

  select {
    padding: 10px;
    font-size: 16px;
    border: 1px solid #ddd;
    border-radius: 5px;
    background-color: #fff;
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
`;

const RangeGroup = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;

  input[type="range"] {
    width: 100%;
    appearance: none;
    height: 8px;
    background: #ddd;
    border-radius: 5px;
    outline: none;
    transition: background 0.3s;

    &:hover {
      background: #1976d2;
    }

    &::-webkit-slider-thumb {
      appearance: none;
      width: 20px;
      height: 20px;
      background: #4caf50;
      border-radius: 50%;
      cursor: pointer;
      box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
      transition: background 0.3s;
    }

    &::-webkit-slider-thumb:hover {
      background: #388e3c;
    }
  }

  span {
    font-size: 14px;
    color: #555;
  }
`;

const ProblemFilters = ({
  problemTypes,
  selectedType,
  selectedDifficulty,
  minPoints,
  maxPoints,
  setSelectedType,
  setSelectedDifficulty,
  setMinPoints,
  setMaxPoints,
}) => (
  <FiltersContainer>
    <FilterGroup>
      <label>Filter by Type</label>
      <select value={selectedType} onChange={(e) => setSelectedType(e.target.value)}>
        <option value="">All</option>
        {problemTypes.map((type) => (
          <option key={type.type_id} value={type.type_id}>
            {type.name}
          </option>
        ))}
      </select>
    </FilterGroup>

    <FilterGroup>
      <label>Filter by Difficulty</label>
      <select value={selectedDifficulty} onChange={(e) => setSelectedDifficulty(e.target.value)}>
        <option value="">All</option>
        <option value="Easy">Easy</option>
        <option value="Medium">Medium</option>
        <option value="Hard">Hard</option>
      </select>
    </FilterGroup>

    <FilterGroup>
      <RangeGroup>
        <input type="range" min="0" max="100" value={minPoints} onChange={(e) => setMinPoints(e.target.value)} />
        <span>Min: {minPoints} Points</span>
      </RangeGroup>

      <RangeGroup>
        <input type="range" min="0" max="100" value={maxPoints} onChange={(e) => setMaxPoints(e.target.value)} />
        <span>Max: {maxPoints} Points</span>
      </RangeGroup>
    </FilterGroup>
  </FiltersContainer>
);

export default ProblemFilters;

