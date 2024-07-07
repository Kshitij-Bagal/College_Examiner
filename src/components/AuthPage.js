import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Airtable from 'airtable';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import { useAuth } from '../utils/AuthContext';
import '../styles/auth.css';

const base = new Airtable({ apiKey: 'patmR9viVXmX3PJAw.71eebdadd0da2fb125650748e7e07b574b6d1a90643cb2f0baade97c33cf4c86' }).base('appmyBUPyd7QLQcwp');

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isFlipping, setIsFlipping] = useState(false);
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleOpenRegister = () => {
    if (!isFlipping) {
      setIsFlipping(true);
      setTimeout(() => {
        setIsLogin(false);
        setIsFlipping(false);
      }, 100);
    }
  };

  const handleOpenLogin = () => {
    if (!isFlipping) {
      setIsFlipping(true);
      setTimeout(() => {
        setIsLogin(true);
        setIsFlipping(false);
      }, 100);
    }
  };

  const handleLogin = async (email, password) => {
    try {
      const records = await base('Users').select({
        filterByFormula: `AND({UserMail} = '${email}', {UserPass} = '${password}')`,
      }).firstPage();

      if (records.length > 0) {
        const user = records[0].fields;
        login(user.UserName, user.UserRole);
        console.log(user.UserName, user.UserRole)
        navigate('/home');
        window.location.reload();
      } else {
        throw new Error('Invalid email or password');
      }
    } catch (err) {
      setError('Error logging in: ' + err.message);
      alert('Invalid email or password');
    }
  };

  const handleRegister = async (name, email, phone, college, password, batch) => {
    try {
      const newRecord = await base('Users').create({
        UserName: name,
        UserMail: email,
        UserPhone: phone,
        UserCollege: college,
        UserPass: password,
        UserRole: '',
        Batch: batch,
      });

      login(newRecord.fields.UserName, newRecord.fields.UserRole);
      navigate('/home');
      window.location.reload();
    } catch (err) {
      setError('Error signing up: ' + err.message);
    }
  };

  return (
    <main>
      <div className="L-R">
        <section className={`cover_div ${isFlipping ? 'flip' : ''}`}>
          <div className={`login_div ${isLogin ? 'front' : 'back'}`}>
            <LoginForm onOpenRegister={handleOpenRegister} onLogin={handleLogin} />
          </div>
          <div className={`register_div ${!isLogin ? 'front' : 'back'}`}>
            <RegisterForm onOpenLogin={handleOpenLogin} onRegister={handleRegister} />
          </div>
        </section>
      </div>
      <div className="L-R decorative">
        <h1>Welcome To <br/> College Examiner</h1>
        <img src="logo.gif" alt="Logo" />
      </div>
    </main>
  );
};

export default AuthPage;
