import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const Login: React.FC = () => {
  const LoginImage = require('../assets/images/Login.jpg');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailVerified, setEmailVerified] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState<'success' | 'danger' | ''>('');
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
      setMessage('Login successful!');
      setMessageType('success');
      setTimeout(() => {
        navigate('/');
      }, 2000);
    } else {
      setMessage('Incorrect Password');
      setMessageType('danger');
    }
  };

  return (
    <div className="container-fluid vh-100 d-flex">
      {/* Left Image */}
      <div className="d-none d-md-block col-md-6 p-0">
        <img
          src={LoginImage}
          alt="login"
          className="img-fluid h-100 w-100"
          style={{ objectFit: 'cover' }}
        />
      </div>

      {/* Right Form */}
      <div className="col-md-6 d-flex flex-column justify-content-center p-5">
        <h3 className="text-center mb-4 fw-bold">Welcome back!!</h3>
        <h1 className="text-center mb-4 fw-bold text-primary">Log In</h1>

        {/* Alerts */}
        {message && (
          <div className={`alert alert-${messageType} text-center`} role="alert">
            {message}
          </div>
        )}

        {/* Email Input */}
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
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

        {/* Password Input */}
        {emailVerified && (
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
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
                  navigate('/forgotpassword', {
                    state: { Data: { Email: email } },
                  })
                }
              >
                Forgot Password?
              </button>
            </div>
          </div>
        )}

        {/* Continue or Login Button */}
        <div className="d-grid mb-3">
          <button
            className="btn btn-primary"
            onClick={emailVerified ? handleCheckPassword : handleCheckEmail}
          >
            {emailVerified ? 'Log In' : 'Continue'}
          </button>
        </div>

        {/* Sign Up Link */}
        <div className="text-center">
          <span>Don't have an account? </span>
          <button className="btn btn-link p-0" onClick={() => navigate('/signup')}>
            Sign up here
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
