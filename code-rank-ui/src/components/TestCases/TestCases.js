
import React, { useState, useEffect } from 'react';
import { BACKEND_URL } from '../../context/ServerStore';
import './TestCases.css';

function TestCases({ problemID }) {
  const [testCases, setTestCases] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedForDelete, setSelectedForDelete] = useState([]);
  const [updatedTestCases, setUpdatedTestCases] = useState([]);

  const fetchAllTestCases = async () => {
    try {
      const response = await fetch(`${BACKEND_URL}/testcases/${problemID}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        setTestCases(data);
        setUpdatedTestCases(data);  // Set initial state for updates
      } else {
        alert('Failed to fetch test cases');
      }
    } catch (error) {
      alert('An error occurred while fetching test cases');
    }
  };

  const openModal = () => {
    fetchAllTestCases();
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
    setSelectedForDelete([]);
  };

  const handleDeleteSelection = (testcaseId) => {
    setSelectedForDelete(prev =>
      prev.includes(testcaseId) ? prev.filter(id => id !== testcaseId) : [...prev, testcaseId]
    );
  };

  const handleUpdateChange = (testcaseId, field, value) => {
    setUpdatedTestCases(prev =>
      prev.map(tc => (tc.testcase_id === testcaseId ? { ...tc, [field]: value } : tc))
    );
  };

  const handleBatchDelete = async () => {
    if (selectedForDelete.length === 0) {
      alert('No test cases selected for deletion');
      return;
    }

    try {
      const response = await fetch(`${BACKEND_URL}/testcases`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(selectedForDelete.map(id => ({ testcase_id: id }))),
      });

      if (response.ok) {
        alert('Selected test cases deleted successfully!');
        setTestCases(testCases.filter(tc => !selectedForDelete.includes(tc.testcase_id)));
        setSelectedForDelete([]); // Clear selected items
      } else {
        alert('Failed to delete selected test cases');
      }
    } catch (error) {
      alert('An error occurred while deleting test cases');
    }
  };

  const handleBatchUpdate = async () => {
    try {
      const response = await fetch(`${BACKEND_URL}/testcases`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(
          updatedTestCases.filter(tc =>
            testCases.some(original =>
              original.testcase_id === tc.testcase_id &&
              (original.input !== tc.input || original.expected_output !== tc.expected_output)
            )
          )
        ),
      });

      if (response.ok) {
        alert('Selected test cases updated successfully!');
        fetchAllTestCases(); // Refresh test cases list
      } else {
        alert('Failed to update selected test cases');
      }
    } catch (error) {
      alert('An error occurred while updating test cases');
    }
  };

  return (
    <div className="test-cases-container">
      <button onClick={openModal}>
        Show Test Cases
      </button>

      {isModalVisible && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="close-modal" onClick={closeModal}>Close</button>
            <h3>Test Cases</h3>
            <table className="test-case-table">
              <thead>
                <tr>
                  <th>Select</th>
                  <th>Input</th>
                  <th>Expected Output</th>
                </tr>
              </thead>
              <tbody>
                {testCases.map((testCase) => (
                  <tr key={testCase.testcase_id}>
                    <td>
                      <input
                        type="checkbox"
                        checked={selectedForDelete.includes(testCase.testcase_id)}
                        onChange={() => handleDeleteSelection(testCase.testcase_id)}
                      />
                    </td>
                    <td>
                      <textarea
                        value={
                          updatedTestCases.find(tc => tc.testcase_id === testCase.testcase_id)?.input || ''
                        }
                        onChange={(e) =>
                          handleUpdateChange(testCase.testcase_id, 'input', e.target.value)
                        }
                      />
                    </td>
                    <td>
                      <textarea
                        value={
                          updatedTestCases.find(tc => tc.testcase_id === testCase.testcase_id)?.expected_output || ''
                        }
                        onChange={(e) =>
                          handleUpdateChange(testCase.testcase_id, 'expected_output', e.target.value)
                        }
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="batch-actions">
              <button onClick={handleBatchUpdate}>Update Selected Test Cases</button>
              <button onClick={handleBatchDelete}>Delete Selected Test Cases</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default TestCases;

