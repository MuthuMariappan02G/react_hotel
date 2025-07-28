import React from 'react';

interface UserProfileProps {
  name: string;
  email: string;
  avatarUrl: string;
  onLogout: () => void;
}

const UserProfile: React.FC<UserProfileProps> = ({ name, email, avatarUrl, onLogout }) => {
  return (
    <div
      className="position-absolute top-100 end-0 mt-2 bg-white border rounded shadow p-3"
      style={{ zIndex: 999, minWidth: 200 }}
    >
      <div className="d-flex align-items-center gap-2 mb-2">
        <img src={avatarUrl} alt="avatar" className="rounded-circle" width={40} height={40} />
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
