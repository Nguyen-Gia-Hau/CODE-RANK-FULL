import React, { useState } from 'react';
import axios from 'axios';

const RegisterContest = () => {
  const [contestId, setContestId] = useState('');
  const [message, setMessage] = useState('');

  const handleRegister = () => {
    axios.post('/contests/users', { contest_id: contestId })
      .then(response => {
        setMessage(response.data.message);
      })
      .catch(error => {
        console.error('Error registering for contest:', error);
        setMessage('Registration failed.');
      });
  };

  return (
    <div>
      <h2>Register for a Contest</h2>
      <input
        type="text"
        placeholder="Enter contest ID"
        value={contestId}
        onChange={(e) => setContestId(e.target.value)}
      />
      <button onClick={handleRegister}>Register</button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default RegisterContest;

