
import React from 'react';
import './UserActivityGrid.css'; // Import the CSS file for grid styling

const UserActivityGrid = ({ activityData }) => {
  // Create an array representing the days in a year (52 weeks * 7 days)
  const totalDays = 365;
  const daysArray = Array.from({ length: totalDays }, (_, index) => index + 1);

  return (
    <div className="activity-grid">
      {daysArray.map((day) => {
        const activity = activityData[day] || 0; // Default activity for a day is 0 if not available
        // Determine color intensity based on activity (problems solved)
        const colorIntensity = activity === 0 ? '#ebedf0' :
          activity <= 2 ? '#9be9a8' :
            activity <= 5 ? '#40c463' :
              '#30a14e';

        return (
          <div
            key={day}
            className="activity-cell"
            style={{ backgroundColor: colorIntensity }}
          ></div>
        );
      })}
    </div>
  );
};

export default UserActivityGrid;
