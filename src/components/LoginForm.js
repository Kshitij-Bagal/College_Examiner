// LoginForm.js
import React from 'react';
import '../styles/auth.css'; // Import your CSS file here

const LoginForm = ({ onOpenRegister, onLogin }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    onLogin(email, password);
  };

  return (
    <div className="login_div">
      <fieldset>
        <legend>Login Here</legend>
        <form onSubmit={handleSubmit}>
          <div className="input-container">
            <input type="email" id="loginEmail" name="email" required />
            <span className="floating-label">Email Address</span>
          </div>
          <div className="input-container">
            <input type="password" id="loginPassword" name="password" required />
            <span className="floating-label">Password</span>
          </div>
          <button className="auth_button" type="submit">Login</button>
        </form>
        <p>Don't have an account? <button className="auth_button" type="button" onClick={onOpenRegister}>Create account</button></p>
      </fieldset>
    </div>
  );
};

export default LoginForm;

