
import React, { useState, useEffect } from 'react';
import { BACKEND_URL } from '../../context/ServerStore';
import ProblemFilters from './ProblemFilters';
import ProblemTable from './ProblemTable';
import ProblemForm from './ProblemForm';
import ProblemSubmissionsModal from './ProblemSubmissionsModal';
import { useAuth } from '../../context/AuthContext';
import moment from 'moment';
import './Problems.css';
import SuggestedProblem from './SuggestedProblem';

function Problems() {
  const [problems, setProblems] = useState([]);
  const [error, setError] = useState('');
  const [selectedProblemId, setSelectedProblemId] = useState(null);
  const [problemTypes, setProblemTypes] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false); // To track if we're editing
  const [isSubmissionsModalVisible, setIsSubmissionsModalVisible] = useState(false); // Control submission modal visibility
  const [isAdmin, setIsAdmin] = useState(false);
  const { auth } = useAuth();
  const accessToken = auth.accessToken;
  const [selectedType, setSelectedType] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState('');
  const [minPoints, setMinPoints] = useState(0);
  const [maxPoints, setMaxPoints] = useState(100);
  const userRole = localStorage.getItem('role');
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    difficulty: '',
    input_format: '',
    output_format: '',
    example_input: '',
    example_output: '',
    notes: '',
    time_limit: 2,
    memory_limit: 128,
    point: 5,
    rank_point: 0,
    public_time: moment().format('YYYY-MM-DD'),
    type_id: ''
  });

  useEffect(() => {
    if (userRole === 'admin') {
      setIsAdmin(true);
    }

    const fetchProblems = async () => {
      try {
        const response = await fetch(`${BACKEND_URL}/problems`);
        if (response.ok) {
          const data = await response.json();
          setProblems(data);
        } else {
          setError('Failed to fetch problems');
        }
      } catch (error) {
        setError('An error occurred. Please try again.');
      }
    };

    const fetchProblemTypes = async () => {
      try {
        const response = await fetch(`${BACKEND_URL}/problem-types`);
        if (response.ok) {
          const data = await response.json();
          setProblemTypes(data);
        } else {
          setError('Failed to fetch problem types');
        }
      } catch (error) {
        setError('An error occurred. Please try again.');
      }
    };

    fetchProblems();
    fetchProblemTypes();
  }, []);

  const handleShowSubmissions = (problemId) => {
    setSelectedProblemId(problemId);
    setIsSubmissionsModalVisible(true); // Show submissions modal
  };

  const handleCloseSubmissionsModal = () => {
    setSelectedProblemId(null);
    setIsSubmissionsModalVisible(false); // Close submissions modal
  };

  // Open modal for creating a new problem
  const showModal = () => {
    setIsEditMode(false); // Not editing
    setFormData({
      title: '',
      description: '',
      difficulty: '',
      input_format: '',
      output_format: '',
      example_input: '',
      example_output: '',
      notes: '',
      time_limit: 2,
      memory_limit: 128,
      point: 5,
      rank_point: 0,
      public_time: moment().format('YYYY-MM-DD'),
      type_id: ''
    });
    setIsModalVisible(true);
  };

  // Open modal for editing a problem
  const handleEditProblem = (problemId) => {
    const problemToEdit = problems.find((problem) => problem.problem_id === problemId);
    if (problemToEdit) {
      setFormData({
        title: problemToEdit.title,
        description: problemToEdit.description,
        difficulty: problemToEdit.difficulty,
        input_format: problemToEdit.input_format,
        output_format: problemToEdit.output_format,
        example_input: problemToEdit.example_input,
        example_output: problemToEdit.example_output,
        notes: problemToEdit.notes,
        time_limit: problemToEdit.time_limit,
        memory_limit: problemToEdit.memory_limit,
        point: problemToEdit.point,
        rank_point: problemToEdit.rank_point,
        public_time: moment(problemToEdit.public_time).format('YYYY-MM-DD'),
        type_id: problemToEdit.type_id
      });
      setSelectedProblemId(problemId);
      setIsEditMode(true); // Editing mode
      setIsModalVisible(true); // Show modal
    }
  };

  const handleCancel = () => setIsModalVisible(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // CREATE problem
  const handleCreateProblem = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${BACKEND_URL}/problems`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const newProblem = await response.json();
        alert('Problem created successfully!');
        setProblems([...problems, newProblem]); // Add the new problem to the list
        handleCancel(); // Close the modal
      } else {
        alert('Failed to create problem');
      }
    } catch (error) {
      console.error('Fetch error:', error);
      alert('An error occurred. Please try again.');
    }
  };

  // DELETE problem
  const handleDeleteProblem = async (problemId) => {
    try {
      const response = await fetch(`${BACKEND_URL}/problems/${problemId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (response.ok) {
        alert('Problem deleted successfully!');
        setProblems(problems.filter((problem) => problem.problem_id !== problemId)); // Remove from list
      } else {
        alert('Failed to delete problem');
      }
    } catch (error) {
      console.error('Fetch error:', error);
      alert('An error occurred. Please try again.');
    }
  };

  // UPDATE problem
  const handleUpdateProblem = async (e) => {
    e.preventDefault();
    try {
      const updatedProblem = {
        ...formData,
        public_time: new Date(formData.public_time), // Convert to Date object
      };

      const response = await fetch(`${BACKEND_URL}/problems/${selectedProblemId}`, {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedProblem),
      });

      if (response.ok) {
        const result = await response.json();
        alert('Problem updated successfully!');
        setProblems(
          problems.map((problem) =>
            problem.problem_id === selectedProblemId ? result : problem
          )
        );
        setIsModalVisible(false); // Close modal
      } else {
        alert('Failed to update problem');
      }
    } catch (error) {
      console.error('Fetch error:', error);
      alert('An error occurred. Please try again.');
    }
  };

  const filteredProblems = problems.filter((problem) => {
    const matchesType = selectedType ? problem.type_id == selectedType : true;
    const matchesDifficulty = selectedDifficulty ? problem.difficulty === selectedDifficulty : true;
    const matchesPoints = problem.point >= minPoints && problem.point <= maxPoints;
    return matchesType && matchesDifficulty && matchesPoints;
  });

  return (
    <div className="problems">
      <div className="problems-container">
        <div className="problems-table">
          {isAdmin && <button onClick={showModal}>Create Problem</button>}

          <ProblemTable
            role={userRole}
            problems={filteredProblems}
            problemTypes={problemTypes}
            handleShowSubmissions={handleShowSubmissions}
            handleDeleteProblem={handleDeleteProblem}
            handleUpdateProblem={handleEditProblem} // Change to handleEditProblem
          />
        </div>

        <div className="filters-container">
          <h2>Filters</h2>
          <ProblemFilters
            problemTypes={problemTypes}
            selectedType={selectedType}
            selectedDifficulty={selectedDifficulty}
            minPoints={minPoints}
            maxPoints={maxPoints}
            setSelectedType={setSelectedType}
            setSelectedDifficulty={setSelectedDifficulty}
            setMinPoints={setMinPoints}
            setMaxPoints={setMaxPoints}
          />
          {/* Add SuggestedProblem Component */}
          <div className="suggested-problem-container">
            <SuggestedProblem problems={problems} />
          </div>
        </div>
      </div>



      {isModalVisible && (
        <ProblemForm
          formData={formData}
          problemTypes={problemTypes}
          handleInputChange={handleInputChange}
          handleCreateProblem={isEditMode ? handleUpdateProblem : handleCreateProblem} // Dynamic form action
          handleCancel={handleCancel}
          isEditMode={isEditMode} // Pass edit mode prop
        />
      )}

      {isSubmissionsModalVisible && (
        <ProblemSubmissionsModal
          selectedProblemId={selectedProblemId}
          setSelectedProblemId={handleCloseSubmissionsModal} // Close submissions modal
        />
      )}
    </div>
  );
}

export default Problems;

