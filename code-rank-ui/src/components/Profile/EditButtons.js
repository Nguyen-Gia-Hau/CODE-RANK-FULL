
import React from 'react';

const EditButtons = ({ editing, handleEditClick, handleSave, handleLogout, usernameFromLocalStorage, username }) => {
  return (
    <div className="edit-buttons">
      {usernameFromLocalStorage === username && (
        <>
          {editing ? (
            <button className="save-button" onClick={handleSave}>
              Save
            </button>
          ) : (
            <button className="edit-button" onClick={handleEditClick}>
              Edit
            </button>
          )}
          <button className="logout-button" onClick={handleLogout}>
            Logout
          </button>
        </>
      )}
    </div>
  );
};

export default EditButtons;
