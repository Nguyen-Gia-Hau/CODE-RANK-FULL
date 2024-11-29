
import React from 'react';
import { Tooltip } from 'antd';
import dayjs from 'dayjs';

const SubmissionGrid = ({ weeks, submissionGrid, getSubmissionColor }) => {
  const dayLabels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  return (
    <div className="submission-container">
      <div className="day-names-column">
        {dayLabels.map((label, index) => (
          <div className="day-label" key={index}>
            {label}
          </div>
        ))}
      </div>

      <div className="submission-grid">
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
                    title={dayjs(date).format('MMM D, YYYY')}
                  >
                  </div>
                </Tooltip>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SubmissionGrid;
