
import React from 'react';
import { Link } from 'react-router-dom';

const SubmissionListModal = ({
  showModal,
  closeModal,
  submissions,
  languageFilter,
  setLanguageFilter,
  statusFilter,
  setStatusFilter,
  filteredSubmissions,
}) => {
  if (!showModal) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <h3>User Submissions</h3>

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

        <table className="submissions-table">
          <thead>
            <tr>
              <th>Problem name</th>
              <th>Status</th>
              <th>Submission Time</th>
              <th>Language</th>
            </tr>
          </thead>
          <tbody>
            {filteredSubmissions.length > 0 ? (
              filteredSubmissions.map((submission) => (
                <tr key={submission.submission_id} className={submission.status === 1 ? 'success-row' : 'failed-row'}>
                  <td>
                    <Link to={`/problems/${submission.problemID}`}>{submission.problemTitle}</Link>
                  </td>
                  <td>{submission.status === 1 ? 'Success' : 'Failed'}</td>
                  <td>{new Date(submission.submission_time).toLocaleString()}</td>
                  <td>{submission.language.name}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4">No submissions match the filter criteria.</td>
              </tr>
            )}
          </tbody>
        </table>
        <button className="close" onClick={closeModal}>Close</button>
      </div>
    </div>
  );
};

export default SubmissionListModal;
