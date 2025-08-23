import React from 'react';

interface UserProfileProps {
  name: string;
  email: string;
  onLogout: () => void;
}

const UserProfile: React.FC<UserProfileProps> = ({ name, email, onLogout }) => {
  return (
    <div
      className="position-absolute top-100 end-0 mt-2 bg-white border rounded shadow p-3"
      style={{ zIndex: 999, minWidth: 270 }}
    >
      <div className="d-flex align-items-center gap-2 mb-2">
        <div
          className="rounded-circle bg-primary d-flex align-items-center justify-content-center text-white"
          style={{ width: 32, height: 32, cursor: 'pointer' }}
        >
          MM
        </div>
        <div>
          <strong>{name}</strong>
          <div className="text-muted" style={{ fontSize: 12 }}>{email}</div>
        </div>
      </div>
      <hr />
      <button className="btn btn-outline-danger w-100" onClick={onLogout}>
        Logout
      </button>
    </div>
  );
};

export default UserProfile;
