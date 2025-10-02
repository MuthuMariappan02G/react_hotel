import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Lottie from 'lottie-react';
import LoginLottie from '../mock/Lottie/Green Login.json';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailVerified, setEmailVerified] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState<'success' | 'danger' | ''>('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleCheckEmail = () => {
    if (email.trim().toLowerCase() === 'muthumariappan@gmail.com') {
      setEmailVerified(true);
      setMessage('Email verified!');
      setMessageType('success');
    } else {
      setMessage('Incorrect Email ID');
      setMessageType('danger');
    }
  };

  const handleCheckPassword = () => {
    if (password === 'Muthu@02') {
      localStorage.setItem('isAuthenticated', 'true');
      setTimeout(() => {
        setLoading(true);
        setTimeout(() => {
          navigate('/');
        }, 3000);
      }, 2000);
    } else {
      setMessage('Incorrect Password');
      setMessageType('danger');
    }
  };

  const handleNavigateWithLoading = (path: string, state?: any) => {
    setLoading(true);
    setTimeout(() => {
      navigate(path, state ? { state } : undefined);
    }, 2000);
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
        <div className="d-none d-md-flex col-md-6 p-0 justify-content-center align-items-center">
          <Lottie animationData={LoginLottie} loop={true} style={{ width: 500, height: 500 }} />
        </div>
        <div className="d-block d-md-none d-flex justify-content-center align-items-center">
          <Lottie animationData={LoginLottie} loop={true} style={{ width: 450, height: 320 }} />
        </div>
        <div className="col-12 col-md-6 d-flex flex-column justify-content-center align-items-center p-5">
          <div style={{ maxWidth: '450px', width: '100%' }}>
            <h3 className="text-center mb-4 fw-bold">Welcome back!!</h3>
            <h1 className="text-center mb-4 fw-bold text-primary">Log In</h1>

            {message && (
              <div className={`alert alert-${messageType} text-center`} role="alert">
                {message}
              </div>
            )}

            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email address</label>
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setMessage('');
                }}
              />
            </div>

            {emailVerified && (
              <div className="mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setMessage('');
                  }}
                />
                <div className="text-left mt-2">
                  <button
                    className="btn btn-link p-0"
                    onClick={() =>
                      handleNavigateWithLoading('/forgotpassword', { Data: { Email: email } })
                    }
                  >
                    Forgot Password?
                  </button>
                </div>
              </div>
            )}

            <div className="d-grid mb-3">
              <button
                className="btn btn-primary"
                onClick={emailVerified ? handleCheckPassword : handleCheckEmail}
              >
                {emailVerified ? 'Log In' : 'Continue'}
              </button>
            </div>

            <div className="text-center">
              <span>Don't have an account? </span>
              <button
                className="btn btn-link p-0"
                onClick={() => handleNavigateWithLoading('/signup')}
              >
                Sign up here
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
