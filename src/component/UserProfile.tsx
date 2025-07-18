import React from 'react';

interface UserProfileProps {
  name: string;
  email: string;
  avatarUrl?: string;
}

const UserProfile: React.FC<UserProfileProps> = ({ name, email, avatarUrl }) => {
  return (
    <div
      className="position-absolute end-0 mt-2 p-3 border rounded shadow bg-white"
      style={{ width: '220px', top: '60px', zIndex: 1000 }}
    >
      <div className="d-flex align-items-center mb-2">
        <img
          src={avatarUrl || `https://ui-avatars.com/api/?name=${name.replace(' ', '+')}`}
          alt="avatar"
          className="rounded-circle me-2"
          width={40}
          height={40}
        />
        <div>
          <strong>{name}</strong>
        </div>
      </div>

      <div className="d-flex align-items-center text-muted mb-3" style={{ fontSize: 14 }}>
        <i className="bi bi-envelope me-2"></i>
        <span>{email}</span>
      </div>

      <button className="btn btn-outline-danger btn-sm w-100">Logout</button>
    </div>
  );
};

export default UserProfile;
