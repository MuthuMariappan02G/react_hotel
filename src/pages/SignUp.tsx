import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Lottie from 'lottie-react';
import SignupLottie from '../mock/Lottie/Developer.json';

const SignUp: React.FC = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState<'success' | 'danger'>('success');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignUp = () => {
    if (!username || !email || !phoneNumber || !password || !confirmPassword) {
      setMessage('Please fill in all fields');
      setMessageType('danger');
      return;
    }
    if (password !== confirmPassword) {
      setMessage('Passwords do not match');
      setMessageType('danger');
      return;
    }
    setMessage('Sign Up Successful!');
    setMessageType('success');

    setLoading(true);
    setTimeout(() => {
      navigate('/login');
    }, 3000);
  };

  const handleLoginRedirect = () => {
    setLoading(true);
    setTimeout(() => {
      navigate('/login');
    }, 3000);
  };

  if (loading) {
    return (
      <div 
        className="d-flex justify-content-center align-items-center position-fixed top-50 start-50 translate-middle"
        style={{ width: '100%', height: '100%' }}
      >
        <div className="spinner-border text-primary" role="status" style={{ width: 80, height: 80 }}>
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container-fluid vh-100">
      <div className="row h-100">
        <div className="col-12 col-md-6 d-flex justify-content-center align-items-center p-3">
          <Lottie 
            animationData={SignupLottie} 
            loop={true} 
            style={{ width: '100%', maxWidth: 500, height: 'auto', maxHeight: 500 }} 
          />
        </div>
        <div className="col-12 col-md-6 d-flex align-items-center justify-content-center p-4">
          <div className="w-100" style={{ maxWidth: 450 }}>
            <h3 className="text-center mb-4 fw-bold">Sign Up</h3>
            {message && (
              <div className={`alert alert-${messageType} text-center`} role="alert">
                {message}
              </div>
            )}
            <div className="form-group mb-3">
              <label>Username</label>
              <input
                type="text"
                className="form-control"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

            <div className="form-group mb-3">
              <label>Email</label>
              <input
                type="email"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="form-group mb-3">
              <label>Phone Number</label>
              <input
                type="tel"
                className="form-control"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </div>

            <div className="form-group mb-3">
              <label>Password</label>
              <input
                type="password"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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

            <div className="d-grid mb-3">
              <button className="btn btn-primary" onClick={handleSignUp}>
                Sign Up
              </button>
            </div>

            <div className="text-center">
              Already have an account?{' '}
              <button className="btn btn-link p-0" onClick={handleLoginRedirect}>
                Log in here
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
