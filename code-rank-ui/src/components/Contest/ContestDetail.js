
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, Typography, Spin, Alert, Button, message } from 'antd';
import UserSubmissions from '../UserSubmissions/UserSubmissions';
import { useParams } from 'react-router-dom';
import { BACKEND_URL } from '../../context/ServerStore';
import { useAuth } from '../../context/AuthContext';

const { Title, Paragraph, Text } = Typography;

const ContestDetail = () => {
  const [contest, setContest] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [timeRemaining, setTimeRemaining] = useState(null); // To track the time remaining
  const { id } = useParams();
  const [problems, setProblems] = useState([]);
  const [selectedProblemId, setSelectedProblemId] = useState(null); // For modal
  const { auth } = useAuth();
  const accessToken = auth.accessToken;
  const [problemsForm, setProblemsForm] = useState(null)

  // Fetch contest details from API
  useEffect(() => {
    const fetchContestDetail = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${BACKEND_URL}/contests/${id}`);
        if (response.ok) {
          const data = await response.json();
          setContest(data.contest);
          setProblems(data.problems);
          console.log(problems)
        } else {
          setError('Failed to load contest details.');
        }
      } catch (err) {
        setError('An error occurred. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    fetchContestDetail();
  }, [id]);

  // Calculate the remaining time
  useEffect(() => {
    if (contest && contest.start_time && contest.total_time) {
      const startTime = new Date(contest.start_time);
      const endTime = new Date(startTime.getTime() + contest.total_time * 60000); // Add total_time in minutes
      const calculateTimeRemaining = () => {
        const now = new Date();
        const remainingTime = endTime - now;

        if (remainingTime <= 0) {
          setTimeRemaining('Contest has ended');
        } else {
          const minutes = Math.floor((remainingTime / 1000 / 60) % 60);
          const hours = Math.floor((remainingTime / 1000 / 60 / 60) % 24);
          const days = Math.floor(remainingTime / 1000 / 60 / 60 / 24);
          setTimeRemaining(`${days > 0 ? `${days}d ` : ''}${hours}h ${minutes}m`);
        }
      };

      // Calculate time remaining every second
      const timer = setInterval(calculateTimeRemaining, 1000);

      // Cleanup the interval on component unmount
      return () => clearInterval(timer);
    }
  }, [contest]);

  const handleShowSubmissions = (problemId) => {
    setSelectedProblemId(problemId); // Open modal for selected problem
  };

  if (error) {
    return <Alert message={error} type="error" />;
  }

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '20px' }}>
        <Spin tip="Loading contest details..." />
      </div>
    );
  }

  function isAdmin() {
    return localStorage.getItem('role') == 'admin'
  }

  async function showProblem() {
    try {
      const response = await fetch(BACKEND_URL + "/problems/admin", {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        }
      })

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Something went wrong');
      }

      const data = await response.json();
      setProblemsForm(data)
    } catch (error) {
      console.error('Error registering for contest:', error);
      message.error(error.message || 'Registration failed.');
    }
  }

  async function handleAddProblemForContest(problemID) {
    try {
      const response = await fetch(BACKEND_URL + "/contests/problems", {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contest_id: id,
          problem_id: problemID
        })
      })

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Something went wrong');
      }
      const data = await response.json()
      message.success(data.message)
    } catch (error) {
      console.error('Error registering for contest:', error);
      message.error(error.message || 'Registration failed.');
    }
  }



  async function handleDeleteProblem(contestProblemID) {
    const userConfirmed = window.confirm("Are you sure you want to delete this problem?");

    if (!userConfirmed) {
      message.info("Deletion canceled.");
      return; // Exit the function if the user cancels
    }

    try {
      const response = await fetch(BACKEND_URL + `/contests/${contestProblemID}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Something went wrong');
      }

      const data = await response.json();
      message.success(data.message);
    } catch (error) {
      console.error('Error deleting problem:', error);
      message.error(error.message || 'Deletion failed.');
    }
  }


  return (
    <Card title={<Title level={2}>{contest?.title || 'Contest Title Not Available'}</Title>} bordered={false}>
      <Title level={1} style={{ textAlign: 'center', color: 'red' }}>
        {timeRemaining || 'Calculating...'} {/* Show the remaining time */}
      </Title>
      <Paragraph>
        <Text strong>Start Time:</Text> {contest?.start_time ? new Date(contest.start_time).toLocaleString() : 'N/A'}
      </Paragraph>
      <Paragraph>
        <Text strong>Duration:</Text> {contest?.total_time ? `${contest.total_time} minutes` : 'N/A'}
      </Paragraph>
      <Paragraph>
        <Text strong>Participants:</Text> {contest?.participant_count || 'N/A'}
      </Paragraph>

      <Title level={3}>Problems</Title>

      {isAdmin() && (<button onClick={showProblem}>Add Problem</button>)}

      <div className="problems-container">

        {problems && problems.length > 0 ? (
          <table className="problems-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Total Submissions</th>
                <th>Total Correct</th>
                <th>Correct Percentage</th>
              </tr>
            </thead>
            <tbody>
              {problems.map(problem => (
                <tr key={problem.problem.problem_id}>
                  <td><Link to={`/problems/${problem.problem.problem_id}`}>{problem.problem.title}</Link></td>
                  <td onClick={() => handleShowSubmissions(problem.problem.problem_id)} style={{ cursor: 'pointer', color: 'blue' }}>
                    {problem.problem.total_submissions}
                  </td>
                  <td>{problem.problem.total_correct}</td>
                  <td>
                    {problem.problem.total_submissions > 0
                      ? `${((problem.problem.total_correct / problem.problem.total_submissions) * 100).toFixed(2)}% `
                      : 'N/A'}
                  </td>
                  {isAdmin() && (<td><button onClick={() => handleDeleteProblem(problem.contest_problem_id)}>Delete</button></td>)}
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <Paragraph>No problems available for this contest.</Paragraph>
        )}


        {/* Modal for showing user submissions */}
        {selectedProblemId && (
          <div className="modal">
            <div className="modal-content">
              <UserSubmissions problemId={selectedProblemId} />
              <button onClick={() => setSelectedProblemId(null)}>Close</button>
            </div>
          </div>
        )}


        {problemsForm && (
          <div className='modal'>
            <div className='modal-content'>
              <button onClick={() => setProblemsForm(null)}>Close</button>
              <table>
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Problem ID</th>
                  </tr>
                </thead>
                <tbody>
                  {problemsForm.map(problem => (
                    <tr key={problem.problem_id}>
                      <td><Link to={`/problems/${problem.problem_id} `}>{problem.title}</Link></td>
                      <td>{problem.problem_id}</td>
                      <td><button onClick={() => handleAddProblemForContest(problem.problem_id)}>Select</button></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

      </div>
    </Card >
  );
};

export default ContestDetail;

