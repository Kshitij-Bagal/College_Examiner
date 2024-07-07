import '../styles/NavBar.css';
import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ username, isLoggedIn, onLogout, userRole }) => {
  console.log({username, userRole})
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/" className="navbar-logo">
          <img className="logo" src={`${process.env.PUBLIC_URL}/logo.png`} alt="College Examiner Logo" />
          <span className="navbar-title">College Examiner</span>
        </Link>
      </div>
      <div className="nav-items">
        <ul>
          <li>
            <Link to="/home">Home</Link>
          </li>
          <li>
            <Link to="/exam">Exam</Link>
          </li>
          {userRole !== 'Student' && (
            <>
              <li>
                <Link to="/formbuilder">Form Builder</Link>
              </li>
              <li>
                <Link to="/results">Results</Link>
              </li>
            </>
          )}
        </ul>
      </div>
      <div className="navbar-right">
        {isLoggedIn && (
          <div className="navbar-user">
            <span>{username}</span>
            <button onClick={onLogout}>Logout</button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
