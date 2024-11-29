
import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom'; // Import useNavigate to handle navigation
import './Profile.css';
import { AuthContext } from '../../context/AuthContext';
import { BACKEND_URL } from '../../context/ServerStore';
import { Tooltip } from 'antd';
import dayjs from 'dayjs';
import RatingHistoryChart from '../RatingHistoryChart/RatingHistoryChart'
import SubmissionDetails from '../SubmissionDetails/SubmissionDetails';

const UserProfile = () => {
  const { username } = useParams(); // Extract the username from the URL
  const [profile, setProfile] = useState(null);
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editing, setEditing] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [about, setAbout] = useState('');
  const [submissionsLoading, setSubmissionsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false); // State to toggle modal
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const usernameFromLocalStorage = localStorage.getItem('username'); // Get username from localStorage
  const [languageFilter, setLanguageFilter] = useState(''); // State to track selected language
  const [statusFilter, setStatusFilter] = useState(''); // State to track selected status
  const [selectedSubmissionId, setSelectedSubmissionId] = useState(null); // State to track selected submission

  useEffect(() => {
    if (!username) {
      navigate(`/profile/${usernameFromLocalStorage}`);
      return;
    }

    const fetchProfile = async () => {
      try {
        const response = await fetch(`${BACKEND_URL}/users/${username}/profile`);
        if (!response.ok) {
          throw new Error('Failed to fetch profile data');
        }
        const data = await response.json(); setProfile(data);
        setFirstName(data.first_name);
        setLastName(data.last_name);
        setAbout(data.about);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    const fetchSubmissions = async () => {
      setSubmissionsLoading(true);
      try {
        const response = await fetch(`${BACKEND_URL}/submissions/${username}`);
        if (!response.ok) {
          throw new Error('Failed to fetch submissions');
        }
        const data = await response.json();
        console.log(data)
        setSubmissions(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setSubmissionsLoading(false);
      }
    };

    fetchProfile();
    fetchSubmissions(); // Fetch submissions within the effect itself

  }, [username, usernameFromLocalStorage, navigate]);

  const handleLogout = async () => {
    const token = localStorage.getItem('accessToken');
    await fetch(`${BACKEND_URL}/auth/logout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });
    await logout();
    navigate('/login');
  };

  const handleEditClick = () => {
    setEditing(true);
  };

  const handleSave = async () => {
    const updatedProfile = { first_name: firstName, last_name: lastName, about };

    try {
      const token = localStorage.getItem('accessToken');
      const response = await fetch(`${BACKEND_URL}/users/profile`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(updatedProfile),
      });

      if (!response.ok) {
        throw new Error('Failed to update profile');
      }

      const result = await response.json();
      setProfile(result);
      setEditing(false);
    } catch (err) {
      setError(err.message);
    }
  };

  const closeModal = () => {
    setShowModal(false);
  };


  // Helper to check if it's a leap year
  const isLeapYear = (year) => {
    return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
  };

  // Helper to generate the past year's dates
  const generateLastYearGrid = () => {
    const startDate = dayjs().subtract(1, 'year').startOf('day');
    const year = startDate.year();  // Get the starting year
    const daysInYear = isLeapYear(year) ? 366 : 365;  // Check if it's a leap year

    const days = [];
    for (let i = 0; i < daysInYear; i++) {
      days.push(startDate.add(i, 'day').format('YYYY-MM-DD'));
    }
    return days;
  };


  const dateGrid = generateLastYearGrid();

  const mapSubmissionsToGrid = () => {
    const submissionMap = {};
    submissions.forEach((submission) => {
      const date = dayjs(submission.submission_time).format('YYYY-MM-DD');
      if (submissionMap[date]) {
        submissionMap[date]++;
      } else {
        submissionMap[date] = 1;
      }
    });
    return submissionMap;
  };

  const submissionGrid = mapSubmissionsToGrid();

  const getSubmissionColor = (count) => {
    if (count >= 5) return '#005500'; // Dark green for heavy activity
    if (count >= 3) return '#00aa00'; // Medium green for moderate activity
    if (count >= 1) return '#00ff00'; // Light green for light activity
    return '#e0e0e0'; // Light gray for no activity
  };

  const dayLabels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']; // Weekday names

  // Helper to group dates into weeks
  const groupDatesByWeek = (dates) => {
    const weeks = [];
    let currentWeek = [];

    dates.forEach((date) => {
      const dayOfWeek = dayjs(date).day(); // 0 = Sunday, 6 = Saturday
      if (dayOfWeek === 1 && currentWeek.length > 0) {
        weeks.push(currentWeek);
        currentWeek = [];
      }
      currentWeek.push(date);
    });

    if (currentWeek.length > 0) {
      weeks.push(currentWeek);
    }

    return weeks;
  };

  const filteredSubmissions = submissions.filter(submission => {
    const matchesLanguage = languageFilter ? submission.language.name === languageFilter : true;
    const matchesStatus = statusFilter ? (statusFilter === 'Success' ? submission.status === 1 : submission.status !== 1) : true;
    return matchesLanguage && matchesStatus;
  });

  const weeks = groupDatesByWeek(dateGrid);
  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="user-profile">
      <div className="profile-container">
        {/* Profile Table */}
        <table className="profile-table">
          <tbody>
            {/* Non-editable fields */}
            <tr>
              <td><strong>Username:</strong></td>
              <td>{username}</td>
            </tr>
            <tr>
              <td><strong>Problems Solved:</strong></td>
              <td>{profile.problems_solved}</td>
            </tr>
            <tr>
              <td><strong>Rank Points:</strong></td>
              <td>{profile.rank_points}</td>
            </tr>
            <tr>
              <td><strong>Total Points:</strong></td>
              <td>{profile.total_points}</td>
            </tr>
            <tr>
              <td><strong>Total Submissions:</strong></td>
              <td>{profile.total_submission}</td>
            </tr>

            {/* Editable fields */}
            <tr>
              <td><strong>First Name:</strong></td>
              <td>
                {editing ? (
                  <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                ) : (
                  <span>{profile.first_name || "Not provided"}</span>
                )}
              </td>
            </tr>
            <tr>
              <td><strong>Last Name:</strong></td>
              <td>
                {editing ? (
                  <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                ) : (
                  <span>{profile.last_name || "Not provided"}</span>
                )}
              </td>
            </tr>
            <tr>
              <td><strong>About:</strong></td>
              <td>
                {editing ? (
                  <textarea
                    value={about}
                    onChange={(e) => setAbout(e.target.value)}
                  />
                ) : (
                  <span>{profile.about || "Not provided"}</span>
                )}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <button className='submissions-button' onClick={() => setShowModal(true)}>
        {submissionsLoading ? 'Loading Submissions...' : 'Submissions'}
      </button>
      {
        usernameFromLocalStorage === username && (
          <div>
            <div className="edit-section">
              {editing ? (
                <button className="save-button" onClick={handleSave}>
                  Save
                </button>
              ) : (
                <button className="edit-button" onClick={handleEditClick}>
                  Edit
                </button>
              )}
            </div>

            <button className='logout-button' onClick={handleLogout}>
              Logout
            </button>
          </div>
        )
      }


      {/* Modal for Submissions */}
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h3>User Submissions</h3>

            {/* Bộ lọc */}
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
                  <th>Actions</th>
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
                      <td>
                        <button onClick={() => setSelectedSubmissionId(submission.submission_id)}>
                          View Code
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4">No submissions match the filter criteria.</td>
                  </tr>
                )}
              </tbody>
            </table>
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
            <button className="close" onClick={closeModal}>Close</button>
          </div>
        </div>
      )}


      <div className="submission-container">
        {/* Grid with day names and submission boxes */}
        <div className="day-names-column">
          {dayLabels.map((label, index) => (
            <div className="day-label" key={index}>
              {label}
            </div>
          ))}
        </div>


        <div className="submission-grid">
          {/* Weekly grid */}
          {weeks.map((week, index) => (
            <div className="week-row" key={index}>
              {week.map((date) => {
                const count = submissionGrid[date] || 0;
                return (
                  <Tooltip title={`${count} submissions on ${dayjs(date).format('MMM D, YYYY')}`} key={date}>
                    <div
                      className="submission-box"
                      style={{ backgroundColor: getSubmissionColor(count) }}
                      data-count={count}
                      title={dayjs(date).format('MMM D, YYYY')} // Displays date on hover
                    >
                    </div>
                  </Tooltip>
                );
              })}
            </div>
          ))}
        </div>
      </div>
      <RatingHistoryChart />
    </div >
  );
};

export default UserProfile;

