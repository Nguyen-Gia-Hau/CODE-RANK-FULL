
import { useAuth } from '../../context/AuthContext';
import React, { useState } from 'react';
import { BACKEND_URL } from '../../context/ServerStore';

function ContestForm() {
  const [title, setTitle] = useState('');
  const [startTime, setStartTime] = useState('');
  const [totalTime, setTotalTime] = useState('');
  const [participantCount, setParticipantCount] = useState('');
  const { auth } = useAuth();
  const accessToken = auth.accessToken;

  const createContest = async () => {
    const data = {
      title: title,
      start_time: startTime,
      total_time: totalTime,
      participant_count: participantCount,
    };

    try {
      const response = await fetch(`${BACKEND_URL}/contests`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Error creating contest');
      }

      const result = await response.json();
      console.log(result);
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div>
      <h2>Create Contest</h2>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="datetime-local"
        placeholder="Start Time"
        value={startTime}
        onChange={(e) => setStartTime(e.target.value)}
      />
      <input
        type="number"
        placeholder="Total Time (minutes)"
        value={totalTime}
        onChange={(e) => setTotalTime(e.target.value)}
      />
      <input
        type="number"
        placeholder="Participants"
        value={participantCount}
        onChange={(e) => setParticipantCount(e.target.value)}
      />
      <button onClick={createContest}>Create Contest</button>
    </div>
  );
}

export default ContestForm;

