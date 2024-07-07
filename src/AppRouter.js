// AppRouter.js
import React, { useEffect, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import AuthPage from './components/AuthPage';
import Home from './components/Home';
import NavBar from './components/NavBar';
import ExamForm from './components/ExamForm';
import Results from './components/Results';
import FormBuilder from './components/FormBuilder';
import Airtable from 'airtable';
import Callback from './components/Callback'; 

const base = new Airtable({ apiKey: 'patmR9viVXmX3PJAw.71eebdadd0da2fb125650748e7e07b574b6d1a90643cb2f0baade97c33cf4c86' }).base('appmyBUPyd7QLQcwp');

const AppRouter = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [userRole, setUserRole] = useState('');

  useEffect(() => {
    const fetchUserRole = async (username) => {
      try {
        const records = await base('Users').select({
          filterByFormula: `{UserName} = '${username}'`
        }).firstPage();

        if (records.length > 0) {
          const user = records[0].fields;
          setUserRole(user.UserRole);
        }
      } catch (error) {
        console.error('Error fetching user role:', error);
      }
    };

    const loggedIn = localStorage.getItem('loggedIn') === 'true';
    const storedUsername = localStorage.getItem('username') || '';

    if (loggedIn) {
      setIsLoggedIn(loggedIn);
      setUsername(storedUsername);
      fetchUserRole(storedUsername);
    }

    console.log("UserName:", username);
    console.log("UserRole:", userRole);
    console.log("Is Logged In:", isLoggedIn);
  }, [isLoggedIn, username, userRole]);

  const handleLogout = () => {
    localStorage.setItem('loggedIn', 'false');
    localStorage.removeItem('username');
    localStorage.removeItem('userRole');
    setIsLoggedIn(false);
    setUsername('');
    setUserRole('');
    window.location.reload();
  };

  return (
    <>
      {isLoggedIn && <NavBar username={username} userRole={userRole} isLoggedIn={isLoggedIn} onLogout={handleLogout} />}
      <Routes>
        <Route path="/login" element={isLoggedIn ? <Navigate to="/" /> : <AuthPage />} />
        <Route path="/home" element={isLoggedIn ? <Home username={username} onLogout={handleLogout} /> : <Navigate to="/login" />} />
        <Route path="/exam" element={isLoggedIn ? <ExamForm username={username} /> : <Navigate to="/login" />} />
        <Route path="/results" element={isLoggedIn ? <Results username={username} /> : <Navigate to="/login" />} />
        <Route path="/formbuilder" element={isLoggedIn && userRole !== 'Student' ? <FormBuilder username={username} /> : <Navigate to="/login" />} />
        <Route path="/Callback" element={<Callback />} /> {/* Ensure correct path and component usage */}
        <Route path="/" element={isLoggedIn ? <Navigate to="/home" /> : <Navigate to="/login" />} />
      </Routes>
    </>
  );
};

export default AppRouter;
