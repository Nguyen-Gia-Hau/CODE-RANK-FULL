
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import CodeSubmission from '../CodeSubmission/CodeSubmission';
import { BACKEND_URL } from '../../context/ServerStore';
import './ProblemDetail.css';
import TestCases from '../TestCases/TestCases';
import Comments from '../comment/comment';

function ProblemDetail() {
  const { id } = useParams();
  const [problem, setProblem] = useState(null);
  const [error, setError] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({});
  const [testCases, setTestCases] = useState([{ input: '', expected_output: '' }]);

  useEffect(() => {

    const fetchProblem = async () => {
      try {
        const response = await fetch(`${BACKEND_URL}/problems/${id}`);
        if (response.ok) {
          const data = await response.json();
          setProblem(data);
          setEditData(data);  // Set default values for editing
        } else {
          setError('Failed to fetch problem details');
        }
      } catch (error) {
        setError('An error occurred. Please try again.');
      }
    };

    const userRole = localStorage.getItem('role');
    if (userRole === 'admin') {
      setIsAdmin(true);
    }

    fetchProblem();
  }, [id]);

  const handleEditToggle = () => setIsEditing(!isEditing);
  const showModal = () => setIsModalVisible(true);
  const handleCancel = () => setIsModalVisible(false);

  const handleInputChange = (field, value) => {
    setEditData({
      ...editData,
      [field]: value,
    });
  };

  const handleUpdateProblem = async () => {
    try {
      const response = await fetch(`${BACKEND_URL}/problems/${id}`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editData),
      });

      if (response.ok) {
        alert('Problem updated successfully!');
        setProblem(editData); // Update the displayed problem details
        setIsEditing(false);
      } else {
        alert('Failed to update the problem');
      }
    } catch (error) {
      alert('An error occurred. Please try again.');
    }
  };

  const handleCreateTestCases = async () => {
    try {
      const response = await fetch(`${BACKEND_URL}/testcases/${id}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(
          testCases.map(testCase => ({ ...testCase, problem_id: id }))
        ),
      });

      if (response.ok) {
        alert('Test cases created successfully!');
        setIsModalVisible(false);
      } else {
        alert('Failed to create test cases');
      }
    } catch (error) {
      alert('An error occurred. Please try again.');
    }
  };

  const addTestCase = () => {
    setTestCases([...testCases, { input: '', expected_output: '' }]);
  };

  const removeTestCase = (index) => {
    const newTestCases = [...testCases];
    newTestCases.splice(index, 1);
    setTestCases(newTestCases);
  };

  const handleTestCaseInputChange = (index, field, value) => {
    const newTestCases = [...testCases];
    newTestCases[index][field] = value;
    setTestCases(newTestCases);
  };

  if (error) {
    return <p className="error-message">{error}</p>;
  }

  if (!problem) {
    return <p>Loading...</p>;
  }



  return (
    <div className="problem-detail-container">
      {isEditing ? (
        <div className="edit-problem-form">
          <h2>Edit Problem</h2>
          <label>Title</label>
          <input
            type="text"
            value={editData.title}
            onChange={(e) => handleInputChange('title', e.target.value)}
          />
          <label>Description</label>
          <textarea
            value={editData.description}
            onChange={(e) => handleInputChange('description', e.target.value)}
          />
          <label>Input Format</label>
          <textarea
            type="text"
            value={editData.input_format}
            onChange={(e) => handleInputChange('input_format', e.target.value)}
          />
          <label>Output Format</label>
          <textarea
            type="text"
            value={editData.output_format}
            onChange={(e) => handleInputChange('output_format', e.target.value)}
          />
          <label>Time Limit (seconds)</label>
          <input
            type="number"
            value={editData.time_limit}
            onChange={(e) => handleInputChange('time_limit', e.target.value)}
          />
          <label>Memory Limit (MB)</label>
          <input
            type="number"
            value={editData.memory_limit}
            onChange={(e) => handleInputChange('memory_limit', e.target.value)}
          />
          {/* Add other fields as needed */}
          <div className='btns'>
            <div><button onClick={showModal}>Create Test Cases</button></div>
            <TestCases problemID={id} />
          </div>
          <div className='btns'>
            <button onClick={handleUpdateProblem}>Save Changes</button>
            <button onClick={handleEditToggle}>Cancel</button>

          </div>
        </div>
      ) : (
        <div className="problem-detail">
          {isAdmin && <button onClick={handleEditToggle}>{isEditing ? "Cancel Edit" : "Edit Problem"}</button>}
          <h2>{problem.title}</h2>
          <p>{problem.description}</p>
          <p><strong>Input Description:</strong> {problem.input_format}</p>
          <p><strong>Output Description:</strong> {problem.output_format}</p>
          <p><strong>Time Limit:</strong> {problem.time_limit} seconds</p>
          <p><strong>Memory Limit:</strong> {problem.memory_limit} MB</p>
          <p><strong>Example Input:</strong> <pre>{problem.example_input}</pre></p>
          <p><strong>Example Output:</strong> <pre>{problem.example_output}</pre></p>
          <p><strong>Notes:</strong> {problem.notes}</p>
          <div className='problems-comment'>
            <Comments />
          </div>
        </div>

      )}
      <div>
        <div className="code-submission-container">
          <CodeSubmission problemId={id} />
        </div>
        {isAdmin && (
          <>
            {isModalVisible && (
              <div className="modal">
                <div className="modal-content">
                  <h2>Create Test Cases</h2>
                  <table className="test-case-table">
                    <thead>
                      <tr>
                        <th>Orders</th>
                        <th>Input</th>
                        <th>Expected Output</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {testCases.map((testCase, index) => (
                        <tr key={index}>
                          <td>{index}</td>
                          <td>
                            <textarea
                              className="test-case-input"
                              value={testCase.input}
                              onChange={(e) => handleTestCaseInputChange(index, 'input', e.target.value)}
                              placeholder="Enter input"
                            />
                          </td>
                          <td>
                            <textarea
                              className="test-case-output"
                              value={testCase.expected_output}
                              onChange={(e) => handleTestCaseInputChange(index, 'expected_output', e.target.value)}
                              placeholder="Enter expected output"
                            />
                          </td>
                          <td>
                            <button
                              className="btn-remove"
                              type="button"
                              onClick={() => removeTestCase(index)}
                              disabled={testCases.length === 1}
                            >
                              Remove
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>

                  <button className="btn-add-testcase" type="button" onClick={addTestCase}>
                    Add
                  </button>

                  <button className="btn-create" type="button" onClick={handleCreateTestCases}>
                    Create
                  </button>
                  <button className="btn-cancel" type="button" onClick={handleCancel}>
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default ProblemDetail;

