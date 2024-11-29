import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import { AuthContext } from '../../context/AuthContext';

function Header() {
  const { auth } = useContext(AuthContext);

  return (
    <header className="header">
      <div className="header-container">
        <Link to="/" className="logo">CodeRank</Link>
        <nav className="nav">
          <ul className="nav-list">
            <li className="nav-item"><Link to="/" className="nav-link">Home</Link></li>
            <li className="nav-item"><Link to="/problems" className="nav-link">Problems</Link></li>
            <li className="nav-item"><Link to="/contests" className="nav-link">Contests</Link></li>
            <li className="nav-item"><Link to="/courses" className="nav-link">Courses</Link></li>
            {auth.isAuthenticated ? (
              <>
                <li className="nav-item"><Link to="/profile" className="nav-link">Profile</Link></li>
              </>
            ) : (
              <>
                <li className="nav-item"><Link to="/login" className="nav-link">Login</Link></li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
