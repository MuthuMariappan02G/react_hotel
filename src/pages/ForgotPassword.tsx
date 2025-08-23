import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Lottie from 'lottie-react';
import ForgotLottie from '../mock/Lottie/Forgot Password.json';
import Loading from '../mock/Lottie/Loading 40 _ Paperplane.json';

const ForgotPassword: React.FC = () => {
  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState<'success' | 'danger'>('success');
  const [loading, setLoading] = useState(false);

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
      setMessage('');
      setLoading(true);
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    }, 2000);
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <Lottie animationData={Loading} loop={true} style={{ width: 400, height: 400 }} />
      </div>
    );
  }

  return (
    <div className="container-fluid vh-100">
      <div className="row h-100">
        <div className="d-none d-md-flex col-md-6 p-0 justify-content-center align-items-center">
          <Lottie 
            animationData={ForgotLottie} 
            loop={true} 
            style={{ width: 500, height: 500 }} 
          />
        </div>
        <div className="d-block d-md-none p-3">
          <div className="d-flex justify-content-center align-items-center">
            <Lottie 
              animationData={ForgotLottie} 
              loop={true} 
              style={{ width: 150, height: 150 }} 
            />
          </div>
        </div>

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
    </div>
  );
};

export default ForgotPassword;
