
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BACKEND_URL } from '../../context/ServerStore';
import SubmissionDetails from '../SubmissionDetails/SubmissionDetails';
import './UserSubmissions.css';

function UserSubmissions({ problemId }) {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedSubmissionId, setSelectedSubmissionId] = useState(null); // State to track selected submission
  const [languageFilter, setLanguageFilter] = useState(''); // State to track selected language
  const [statusFilter, setStatusFilter] = useState(''); // State to track selected status

  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        const response = await fetch(`${BACKEND_URL}/submissions/problem/${problemId}`);
        if (response.ok) {
          const data = await response.json();
          if (Array.isArray(data)) {
            const sortedSubmissions = data.sort((a, b) => new Date(b.submission_time) - new Date(a.submission_time));
            setSubmissions(sortedSubmissions);
          } else {
            setSubmissions([]);
          }
        } else {
          setError('Failed to fetch submissions.');
        }
      } catch (err) {
        setError('An error occurred while fetching submissions.');
      } finally {
        setLoading(false);
      }
    };

    fetchSubmissions();
  }, [problemId]);

  const filteredSubmissions = submissions.filter(submission => {
    const matchesLanguage = languageFilter ? submission.language.name === languageFilter : true;
    const matchesStatus = statusFilter ? (statusFilter === 'Success' ? submission.status === 1 : submission.status !== 1) : true;
    return matchesLanguage && matchesStatus;
  });

  if (loading) {
    return <div>Loading submissions...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="user-submissions-container">
      <h4>All Submissions for Problem ID: {problemId}</h4>

      {/* Filter section */}
      <div className="filter-section">
        <label htmlFor="language-filter">Filter by Language:</label>
        <select
          id="language-filter"
          value={languageFilter}
          onChange={(e) => setLanguageFilter(e.target.value)}
        >
          <option value="">All</option>
          <option value="Python">Python</option>
          <option value="Typescript">Typescript</option>
          <option value="C++">C++</option>
          <option value="Java">Java</option>
          {/* Add more language options as needed */}
        </select>

        <label htmlFor="status-filter">Filter by Status:</label>
        <select
          id="status-filter"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="">All</option>
          <option value="Success">Success</option>
          <option value="Failed">Failed</option>
        </select>
      </div>

      {filteredSubmissions.length === 0 ? (
        <p>No submissions found for this problem.</p>
      ) : (
        <table className="submissions-table">
          <thead>
            <tr>
              <th>Username</th>
              <th>Status</th>
              <th>Submission Time</th>
              <th>Language</th>
              <th>Memory</th>
              <th>Execution Time</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredSubmissions.map((submission) => (
              <tr key={submission.submission_id} className={submission.status === 1 ? 'success-row' : 'failed-row'}>
                <td>
                  <Link to={`/profile/${submission.username}`}>{submission.username}</Link>
                </td>
                <td>{submission.status === 1 ? 'Success' : 'Failed'}</td>
                <td>{new Date(submission.submission_time).toLocaleString()}</td>
                <td>{submission.language.name}</td>
                <td>{submission.memoryUsage}</td>
                <td>{submission.executionTime}</td>
                <td>
                  <button onClick={() => setSelectedSubmissionId(submission.submission_id)}>
                    View Code
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Conditionally render SubmissionDetails component */}
      {selectedSubmissionId && (
        <SubmissionDetails
          submissionId={selectedSubmissionId}
          onClose={() => setSelectedSubmissionId(null)}
        />
      )}
      {selectedSubmissionId && (
        <div className="modal">
          <div className="modal-content">
            <SubmissionDetails
              submissionId={selectedSubmissionId}
              onClose={() => setSelectedSubmissionId(null)}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default UserSubmissions;

