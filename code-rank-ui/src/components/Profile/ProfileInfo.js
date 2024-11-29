
import React from 'react';

const ProfileInfo = ({
  username,
  profile,
  editing,
  firstName,
  lastName,
  about,
  setFirstName,
  setLastName,
  setAbout,
  handleEditClick,
  handleSave
}) => {
  return (
    <div className="profile-container">
      <table className="profile-table">
        <tbody>
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
  );
};

export default ProfileInfo;
