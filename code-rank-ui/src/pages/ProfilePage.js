
import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { BACKEND_URL } from '../context/ServerStore';
import dayjs from 'dayjs';
import SubmissionsModal from '../components/Profile/SubmissionsModal';
import EditProfile from '../components/Profile/EditProfile';
import ProfileTable from '../components/Profile/ProfileTable';
import SubmissionGrid from '../components/Profile/SubmissionGrid';

const ProfilePage = () => {
  const { username } = useParams();
  const [profile, setProfile] = useState(null);
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submissionsLoading, setSubmissionsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState(false);
  const [languageFilter, setLanguageFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch user profile
    const fetchProfile = async () => {
      try {
        const response = await fetch(`${BACKEND_URL}/users/${username}/profile`);
        if (!response.ok) throw new Error('Failed to fetch profile');
        const data = await response.json();
        setProfile(data);
      } catch (error) {
        console.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    // Fetch user submissions
    const fetchSubmissions = async () => {
      setSubmissionsLoading(true);
      try {
        const response = await fetch(`${BACKEND_URL}/submissions/${username}`);
        if (!response.ok) throw new Error('Failed to fetch submissions');
        const data = await response.json();
        setSubmissions(data);
      } catch (error) {
        console.error(error.message);
      } finally {
        setSubmissionsLoading(false);
      }
    };

    fetchProfile();
    fetchSubmissions();
  }, [username]);

  // Handle saving profile changes
  const handleSave = async (updatedProfile) => {
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
      if (!response.ok) throw new Error('Failed to update profile');
      const result = await response.json();
      setProfile(result);
      setEditing(false);
    } catch (error) {
      console.error(error.message);
    }
  };

  // Helper functions for the submission grid
  const isLeapYear = (year) => (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
  const generateLastYearGrid = () => {
    const startDate = dayjs().subtract(1, 'year').startOf('day');
    const year = startDate.year();
    const daysInYear = isLeapYear(year) ? 366 : 365;
    return Array.from({ length: daysInYear }, (_, i) => startDate.add(i, 'day').format('YYYY-MM-DD'));
  };
  const dateGrid = generateLastYearGrid();

  const mapSubmissionsToGrid = () => {
    const submissionMap = {};
    submissions.forEach((submission) => {
      const date = dayjs(submission.submission_time).format('YYYY-MM-DD');
      submissionMap[date] = (submissionMap[date] || 0) + 1;
    });
    return submissionMap;
  };
  const submissionGrid = mapSubmissionsToGrid();

  const getSubmissionColor = (count) => {
    if (count >= 5) return '#005500'; // Dark green
    if (count >= 3) return '#00aa00'; // Medium green
    if (count >= 1) return '#00ff00'; // Light green
    return '#e0e0e0'; // Light gray
  };

  const filteredSubmissions = submissions.filter(submission => {
    const matchesLanguage = languageFilter ? submission.language.name === languageFilter : true;
    const matchesStatus = statusFilter ? (statusFilter === 'Success' ? submission.status === 1 : submission.status !== 1) : true;
    return matchesLanguage && matchesStatus;
  });

  const dayLabels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  const weeks = Array.from({ length: Math.ceil(dateGrid.length / 7) }, (_, i) =>
    dateGrid.slice(i * 7, i * 7 + 7)
  );

  if (loading) return <div className="loading">Loading...</div>;

  return (
    <div className="profile-page">
      {editing ? (
        <EditProfile profile={profile} handleSave={handleSave} setEditing={setEditing} />
      ) : (
        <>
          <ProfileTable
            profile={profile}
            username={username}
            editing={editing}
            setEditing={setEditing}
          />

          <button className="submissions-button" onClick={() => setShowModal(true)}>
            {submissionsLoading ? 'Loading Submissions...' : 'Submissions'}
          </button>

          {showModal && (
            <SubmissionsModal
              showModal={showModal}
              closeModal={() => setShowModal(false)}
              filteredSubmissions={filteredSubmissions}
              languageFilter={languageFilter}
              setLanguageFilter={setLanguageFilter}
              statusFilter={statusFilter}
              setStatusFilter={setStatusFilter}
            />
          )}

          <SubmissionGrid
            weeks={weeks}
            submissionGrid={submissionGrid}
            getSubmissionColor={getSubmissionColor}
            dayLabels={dayLabels}
          />
        </>
      )}
    </div>
  );
};

export default ProfilePage;
