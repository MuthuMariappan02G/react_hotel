import React, { useState, useEffect, useRef } from 'react';
import UserProfile from './UserProfile';
import { useNavigate } from 'react-router-dom';

interface TopbarProps {
  onToggleSidebar: () => void;
}

const Topbar: React.FC<TopbarProps> = ({ onToggleSidebar }) => {
  const [showUserBox, setShowUserBox] = useState(false);
  const navigate = useNavigate();
  const userBoxRef = useRef<HTMLDivElement>(null);

  const handleLogout = () => {
    navigate('/login');
  };

  const toggleUserBox = () => {
    setShowUserBox((prev) => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        userBoxRef.current &&
        !userBoxRef.current.contains(event.target as Node)
      ) {
        setShowUserBox(false);
      }
    };

    if (showUserBox) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showUserBox]);

  return (
    <div className="d-flex justify-content-between align-items-center px-3 py-2 border-bottom bg-white">
      <div className="d-flex align-items-center gap-2">
        <div className="d-md-none">
          <button className="btn btn-light" onClick={onToggleSidebar}>
            <i className="bi bi-list fs-4"></i>
          </button>
        </div>
      </div>

      <div className="d-flex align-items-center gap-3 position-relative" ref={userBoxRef}>
        <i className="bi bi-bell fs-5"></i>
        <i className="bi bi-clock fs-5"></i>
        <div className="d-none d-lg-block text-end">
          <strong>Muthu Mariappan</strong>
          <div className="text-muted" style={{ fontSize: 12 }}>
            Customer Support Officer
          </div>
        </div>
        <div
          className="rounded-circle bg-primary d-flex align-items-center justify-content-center text-white"
          style={{ width: 32, height: 32, cursor: 'pointer' }}
          onClick={toggleUserBox}
        >
          MM
        </div>

        {showUserBox && (
          <UserProfile
            name="Muthumariappan"
            email="muthumariappan@gmail.com"
            onLogout={handleLogout}
          />
        )}
      </div>
    </div>
  );
};

export default Topbar;
