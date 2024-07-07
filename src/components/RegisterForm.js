// RegisterForm.js
import React from 'react';
import '../styles/auth.css'; // Import your CSS file here

const RegisterForm = ({ onOpenLogin, onRegister }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const phone = e.target.phone.value;
    const college = e.target.college.value;
    const batch = e.target.batch.value;
    const password = e.target.password.value;
    const confirmPassword = e.target.confirmPassword.value;

    if (password !== confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    onRegister(name, email, phone, college, password, batch);
  };

  return (
    <div className="register_div">
      <fieldset>
        <legend>Register Here</legend>
        <form onSubmit={handleSubmit}>
          <div className="input-container">
            <input type="text" id="registerName" name="name" required />
            <span className="floating-label">Full Name</span>
          </div>
          <div className="input-container">
            <input type="email" id="registerEmail" name="email" required />
            <span className="floating-label">Email Address</span>
          </div>
          <div className="input-container">
            <input type="text" id="registerPhone" name="phone" required />
            <span className="floating-label">Phone Number</span>
          </div>
          <div className="input-container">
            <select id="registerCollege" className='registerCollege' name="college" required>
              <option value="" defaultValue>Select College</option>
              <option value="CKT">CKT</option>
              <option value="MGM">MGM</option>
              <option value="Bharti">Bharti</option>
              <option value="SES">SES</option>
            </select>
          </div>
          <div className="input-container">
            <select id="registerBatch" className='registerCollege' name="batch" required>
              <option value="" defaultValue>Select Batch</option>
              <option value="B.CS-F.Y">B.CS-F.Y</option>
              <option value="B.CS-S.Y">B.CS-S.Y</option>
              <option value="B.CS-T.Y">B.CS-T.Y</option>
              <option value="M.CS-F.Y">M.CS-F.Y</option>
              <option value="M.CS-S.Y">M.CS-S.Y</option>
            </select>
          </div>
          <div className="input-container">
            <input type="password" id="registerPassword" name="password" required />
            <span className="floating-label">Create Password</span>
          </div>
          <div className="input-container">
            <input type="password" id="confirmPassword" name="confirmPassword" required />
            <span className="floating-label">Confirm Password</span>
          </div>
          <button className="auth_button" type="submit">Register</button>
        </form>
        <p>Have an account already? <button className="auth_button" type="button" onClick={onOpenLogin}>Login</button></p>
      </fieldset>
    </div>
  );
};

export default RegisterForm;
