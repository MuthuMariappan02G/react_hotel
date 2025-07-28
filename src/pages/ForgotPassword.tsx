import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ForgotPassword: React.FC = () => {
  const ForgotPass = require('../assets/images/FP-1.jpg');
  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState<'success' | 'danger'>('success');

  const handleSubmit = () => {
    if (!newPassword || !confirmPassword) {
      setMessage('Please fill in both fields');
      setMessageType('danger');
      return;
    }

    if (newPassword !== confirmPassword) {
      setMessage('Passwords do not match');
      setMessageType('danger');
      return;
    }

    setMessage('Password Changed Successfully');
    setMessageType('success');

    setTimeout(() => {
      navigate('/login');
    }, 2000);
  };

  return (
    <div className="container-fluid vh-100 d-flex p-0">
      {/* Left Image */}
      <div className="d-none d-md-block col-md-6 p-0">
        <img
          src={ForgotPass}
          alt="Reset Password"
          className="img-fluid h-100 w-100"
          style={{ objectFit: 'cover' }}
        />
      </div>

      {/* Right Form */}
      <div className="col-md-6 d-flex align-items-center justify-content-center">
        <div className="w-100 px-4" style={{ maxWidth: 450 }}>
          <h3 className="text-center mb-4 fw-bold">Reset Password</h3>

          {message && (
            <div className={`alert alert-${messageType} text-center`} role="alert">
              {message}
            </div>
          )}

          <div className="form-group mb-3">
            <label>New Password</label>
            <input
              type="password"
              className="form-control"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>

          <div className="form-group mb-4">
            <label>Confirm Password</label>
            <input
              type="password"
              className="form-control"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>

          <div className="d-grid">
            <button className="btn btn-primary" onClick={handleSubmit}>
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
