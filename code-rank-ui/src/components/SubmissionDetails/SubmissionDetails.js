
import React, { useState, useEffect } from 'react';
import Prism from 'prismjs';
import 'prismjs/themes/prism.css'; // Import theme của Prism.js, có thể chọn theme khác nếu muốn
import 'prismjs/components/prism-javascript'; // Import ngôn ngữ JavaScript cho Prism
import { BACKEND_URL } from '../../context/ServerStore';

function SubmissionDetails({ submissionId, onClose }) {
  const [submission, setSubmission] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSubmissionDetails = async () => {
      try {
        const response = await fetch(`${BACKEND_URL}/submissions/detail/${submissionId}`);
        if (response.ok) {
          const data = await response.json();
          setSubmission(data);
        } else {
          setError('Failed to fetch submission details.');
        }
      } catch (err) {
        setError('An error occurred while fetching the submission.');
      } finally {
        setLoading(false);
      }
    };

    fetchSubmissionDetails();
  }, [submissionId]);

  useEffect(() => {
    // Sau khi component được render, highlight mã nguồn
    if (submission) {
      Prism.highlightAll();
    }
  }, [submission]);

  if (loading) {
    return <div>Loading submission details...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="submission-details-modal">
      <h4>Submission ID: {submission.submission_id}</h4>
      <p>Status: {submission.status === 1 ? 'Success' : 'Failed'}</p>
      {/* Sử dụng Prism.js để tô màu mã nguồn */}
      <pre className="source-code language-js">
        <code>{submission.source_code}</code>
      </pre>
      <button onClick={onClose}>Close</button>
    </div>
  );
}

export default SubmissionDetails;

