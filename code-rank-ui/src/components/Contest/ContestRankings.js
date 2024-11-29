
import React, { useState } from 'react';
import axios from 'axios';

const ContestRankings = () => {
  const [contestId, setContestId] = useState('');
  const [rankings, setRankings] = useState([]);

  const handleViewRankings = () => {
    axios.get(`/contests/ranks/${contestId}`)
      .then(response => {
        setRankings(response.data);
      })
      .catch(error => {
        console.error('Error fetching rankings:', error);
        setRankings([]);
      });
  };

  return (
    <div>
      <h2>Contest Rankings</h2>
      <input
        type="text"
        placeholder="Enter contest ID"
        value={contestId}
        onChange={(e) => setContestId(e.target.value)}
      />
      <button onClick={handleViewRankings}>View Rankings</button>
      <ul>
        {rankings.length > 0 ? rankings.map((rank, index) => (
          <li key={index}>
            {rank.username} - Points: {rank.points}
          </li>
        )) : <p>No rankings available</p>}
      </ul>
    </div>
  );
};

export default ContestRankings;
