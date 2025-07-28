import React, { useState } from 'react';
import UserProfile from './UserProfile'; 
import { useNavigate } from 'react-router-dom';

interface TopbarProps {
  onToggleSidebar: () => void;
}

const Topbar: React.FC<TopbarProps> = ({ onToggleSidebar }) => {
  const [showUserBox, setShowUserBox] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/login'); 
  };
  const toggleUserBox = () => {
    setShowUserBox(!showUserBox);
  };

  return (
    <div className="d-flex justify-content-between align-items-center px-3 py-2 border-bottom bg-white">
      <div className="d-flex align-items-center gap-2">
        {/* Hamburger for mobile/tablet only */}
        <div className="d-md-none">
          <button className="btn btn-light" onClick={onToggleSidebar}>
            <i className="bi bi-list fs-4"></i>
          </button>
        </div>

        {/* <input
          className="form-control"
          placeholder="Search room name, other facilities"
          style={{ maxWidth: 300 }}
        /> */}
      </div>

      <div className="d-flex align-items-center gap-3 position-relative">
        <i className="bi bi-bell fs-5"></i>
        <i className="bi bi-clock fs-5"></i>

        <div className="d-none d-lg-block text-end">
          <strong>Muthu Mariappan</strong>
          <div className="text-muted" style={{ fontSize: 12 }}>
            Head Manager
          </div>
        </div>

        <img
          src="https://i.pravatar.cc/32"
          alt="avatar"
          className="rounded-circle"
          style={{ cursor: 'pointer' }}
          onClick={toggleUserBox}
        />

        {showUserBox && (
          <UserProfile
            name="Muthumariappan"
            email="muthumariappan@gmail.com"
            avatarUrl="https://i.pravatar.cc/100"
            onLogout={handleLogout}
          />
        )}
      </div>
    </div>
  );
};

export default Topbar;

