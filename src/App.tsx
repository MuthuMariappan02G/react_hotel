import React from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/SignUp';
import ForgotPassword from './pages/ForgotPassword';
import Home from './pages/Home';
// import Dashboard from './pages/Dashboard';
// import Settings from './pages/Settings';

const App: React.FC = () => {
  const location = useLocation();
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';

  const isLoginRoute =
    location.pathname === '/login' ||
    location.pathname === '/signup' ||
    location.pathname === '/forgotpassword';

  // Always show login/signup/forgot routes
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

  // If not logged in and not on login/signup pages, force redirect
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  // If logged in → show sidebar + nested pages
  return (
    <Routes>
      <Route path="/" element={<Home />}>
        {/* <Route index element={<Navigate to="/dashboard" />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="*" element={<Navigate to="/dashboard" />} /> */}
      </Route>
    </Routes>
  );
};

export default App;
