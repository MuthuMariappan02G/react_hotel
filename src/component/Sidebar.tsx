import React from 'react';

interface SidebarProps {
  onIconClick: (icon: string) => void;
  activeIcon: string; // <-- added this
}

const Sidebar: React.FC<SidebarProps> = ({ onIconClick, activeIcon }) => {
  const icons = [
    { name: 'PieChart', icon: 'bi-pie-chart' },
    { name: 'Team', icon: 'bi-people' },
    { name: 'Calendar', icon: 'bi-calendar-event' },
    { name: 'Clock', icon: 'bi-clock' },
    { name: 'Room', icon: 'bi-door-open' },
    { name: 'Notes', icon: 'bi-stickies' },
    { name: 'Settings', icon: 'bi-gear' },
  ];

  return (
    <div className="d-flex flex-column align-items-center p-3 bg-light vh-100" style={{ width: 80 }}>
      <div className="rounded-circle bg-primary text-white d-flex justify-content-center align-items-center" style={{ width: 50, height: 50, fontWeight: 'bold' }}>
        CHM
      </div>

      <div className="mt-4 d-flex flex-column gap-4 fs-5 text-dark">
        {icons.map((item) => (
          <i
            key={item.name}
            className={`bi ${item.icon} cursor-pointer ${activeIcon === item.name ? 'text-primary' : ''}`}
            role="button"
            onClick={() => onIconClick(item.name)}
          ></i>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
