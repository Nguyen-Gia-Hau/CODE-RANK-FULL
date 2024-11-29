
import React from 'react';
import './SubmissionResults.css';

function SubmissionResults({ results }) {
  if (!results || results.length === 0) {
    return null; // If there are no results, don't render the component
  }

  return (
    <div className="submission-results-container">
      <h4>Test Case Results</h4>
      <table className="submission-results-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Input</th>
            <th>Output/Error</th>
            <th>Execution Time (ms)</th>
            <th>Memory Usage (MB)</th>
            <th>Correct</th>
          </tr>
        </thead>
        <tbody>
          {results.map((testcase, index) => (
            <tr key={testcase.testcase_id}>
              <td>{index + 1}</td>
              <td><pre>{testcase.input}</pre></td>
              <td>
                {testcase.isCorrect ? (
                  <pre>{testcase.actualOutput.output}</pre>
                ) : (
                  <span className="error">{testcase.actualOutput.output}</span>
                )}
              </td>
              <td>{testcase.isCorrect ? testcase.actualOutput.executionTime.toFixed(2) : 'N/A'}</td>
              <td>{testcase.isCorrect ? testcase.actualOutput.memoryUsage.toFixed(2) : 'N/A'}</td>
              <td>{testcase.isCorrect ? 'Yes' : 'No'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default SubmissionResults;

