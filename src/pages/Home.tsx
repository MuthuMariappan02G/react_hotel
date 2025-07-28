import React, { useState, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Sidebar from '../component/Sidebar';
import Topbar from '../component/Topbar';
import SearchRoom from '../component/SearchRoom';
import RoomList from '../component/RoomList';
import LastReservation from '../component/LastReservation';

export interface SearchFilters {
  checkIn: string;
  checkOut: string;
  adults: number;
  children: number;
  rooms: number;
  roomType: string;
}

const Home: React.FC = () => {
  const navigate = useNavigate();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 768);
  const [selectedIcon, setSelectedIcon] = useState<string>(() => {
    return localStorage.getItem('activeIcon') || 'PieChart';
  });
  const [filters, setFilters] = useState<SearchFilters | null>(null);

  const toggleSidebar = () => setIsDrawerOpen(!isDrawerOpen);
  const closeDrawer = () => setIsDrawerOpen(false);

  const handleIconClick = (icon: string) => {
    setSelectedIcon(icon);
    localStorage.setItem('activeIcon', icon);
    closeDrawer();
  };

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    navigate('/login');
  };

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="d-flex">
      {/* Sidebar */}
      <div className="d-none d-md-block position-fixed bg-light" style={{ width: 80, height: '100vh' }}>
        <Sidebar onIconClick={handleIconClick} activeIcon={selectedIcon} />
        {/* Optional logout button for desktop */}
        <div className="text-center mt-3">
          <button onClick={handleLogout} className="btn btn-sm btn-outline-danger">
            Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-grow-1" style={{ marginLeft: isDesktop ? 80 : 0 }}>
        <Topbar onToggleSidebar={toggleSidebar} />

        {/* Mobile Drawer */}
        {isDrawerOpen && (
          <div
            className="position-fixed top-0 start-0 bg-light vh-100 shadow d-md-none"
            style={{ width: 220, zIndex: 1050 }}
          >
            <button className="btn btn-light position-absolute top-0 end-0 m-2" onClick={closeDrawer}>
              <i className="bi bi-x fs-4"></i>
            </button>
            <Sidebar onIconClick={handleIconClick} activeIcon={selectedIcon} />
            <div className="text-center mt-3">
              <button onClick={handleLogout} className="btn btn-sm btn-outline-danger">
                Logout
              </button>
            </div>
          </div>
        )}

        {/* Page Content */}
        <div className="container-fluid mt-3">
          <div className="row">
            {selectedIcon === 'Calendar' ? (
              <>
                <div className="col-12 col-md-5 col-lg-4">
                  <SearchRoom onSearch={(filters) => setFilters(filters)} />
                  <LastReservation />
                </div>
                <div className="col-12 col-md-7 col-lg-8">
                  <RoomList filters={filters} />
                </div>
              </>
            ) : (
              <div className="text-muted text-center p-5">Coming Soon...</div>
            )}
          </div>

          {/* Nested routing outlet */}
          <div className="mt-4">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
