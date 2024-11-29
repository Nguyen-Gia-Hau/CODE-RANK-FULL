
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import SubmissionResults from '../SubmissionResults/SubmissionResults';
import './CodeSubmission.css';
import { BACKEND_URL } from '../../context/ServerStore'

function CodeSubmission({ problemId }) {
  const [code, setCode] = useState('');
  const [file, setFile] = useState(null);
  const [language, setLanguage] = useState('cpp');
  const [languages, setLanguages] = useState([]);
  const [message, setMessage] = useState({ text: '', type: '' });
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const navigate = useNavigate();
  const { auth } = useAuth();
  const accessToken = auth.accessToken;

  useEffect(() => {
    const fetchLanguages = async () => {
      try {
        const response = await fetch(`${BACKEND_URL}/languages`, {
          headers: {
            'Authorization': `Bearer ${accessToken}`,
          },
        });
        if (response.ok) {
          const result = await response.json();
          setLanguages(result);
          setLanguage(result.length > 0 ? result[0]?.file_extension : 'cpp'); // Set default language from server
        } else {
          console.error('Failed to fetch languages');
        }
      } catch (error) {
        console.error('Error fetching languages:', error);
      }
    };

    fetchLanguages();
  }, [accessToken]);

  const handleCodeChange = (e) => {
    setCode(e.target.value);
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleLanguageChange = (e) => {
    setLanguage(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ text: '', type: '' });
    setResults([]);
    setShowResults(false);

    if (!auth.isAuthenticated) {
      navigate('/login');
      return;
    }

    const formData = new FormData();
    formData.append('code', code);
    formData.append('language_file_extension', language);
    if (file) {
      formData.append('file', file);
    }

    try {
      const response = await fetch(`${BACKEND_URL}/submissions/${problemId}`, {
        method: 'POST',
        body: formData,
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        },
      });

      if (response.ok) {
        const result = await response.json();
        const correct = result.results.filter((testcase) => testcase.isCorrect).length;
        const total = result.results.length;
        const messageType = correct === total ? 'success' : 'error';
        setMessage({ text: `Submission successful! Correct: ${correct}/${total}`, type: messageType });
        setResults(result.results);
      } else {
        setMessage({ text: 'Submission failed.', type: 'error' });
      }
    } catch (error) {
      setMessage({ text: 'An error occurred during submission.', type: 'error' });
    }

    setLoading(false);
    resetForm();
  };

  const resetForm = () => {
    setCode('');
    setFile(null);
    setLanguage(languages.length > 0 ? languages[0]?.file_extension : 'cpp'); // Reset language to default from server
  };

  const getFileAccept = () => {
    const selectedLang = languages.find((lang) => lang.file_extension === language);
    return selectedLang ? selectedLang.file_extension : '';
  };

  const toggleResultsVisibility = () => {
    setShowResults((prevState) => !prevState);
  };

  return (
    <div className="code-submission-container">
      <h3>Submit Your Solution</h3>
      <form onSubmit={handleSubmit}>
        <textarea
          value={code}
          onChange={handleCodeChange}
          placeholder="Enter your code here"
          rows="10"
          cols="50"
        />
        <select required value={language} onChange={handleLanguageChange}>
          {languages.length > 0
            ? languages.map((lang) => (
              <option key={lang.id} value={lang.file_extension}>
                {lang.name}
              </option>
            ))
            : <option value="cpp">C++</option>}
        </select>
        <input type="file" onChange={handleFileChange} accept={getFileAccept()} />
        <button type="submit">Submit</button>
      </form>
      {loading && <div className="loading-spinner"></div>}
      {message.text && <p className={`message ${message.type}`}>{message.text}</p>}

      {results.length > 0 && (
        <button onClick={toggleResultsVisibility}>
          {showResults ? 'Hide Results' : 'Show Results'}
        </button>
      )}

      {showResults && (
        <div className="modal">
          <div className="modal-content">
            <SubmissionResults results={results} />
            <button onClick={toggleResultsVisibility}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default CodeSubmission;

