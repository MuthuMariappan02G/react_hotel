import React from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/SignUp';
import ForgotPassword from './pages/ForgotPassword';
import Home from './pages/Home';

const App: React.FC = () => {
  const location = useLocation();
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
  const isLoginRoute =
    location.pathname === '/login' ||
    location.pathname === '/signup' ||
    location.pathname === '/forgotpassword';
  if (isLoginRoute) {
    return (
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    );
  }
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  
  return (
    <Routes>
      <Route path="/" element={<Home />}>
      </Route>
    </Routes>
  );
};

export default App;
