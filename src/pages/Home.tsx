import React, { useState, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Sidebar from '../component/Sidebar';
import Topbar from '../component/Topbar';
import SearchRoom from '../component/SearchRoom';
import RoomList from '../component/RoomList';
import LastReservation from '../component/LastReservation';
import CommingSoon from '../mock/Lottie/Under Construction Animation.json';
import Lottie from 'lottie-react';
import CicleLoading from '../mock/Lottie/Sandy Loading.json';

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
    const savedIcon = localStorage.getItem('activeIcon');
    if (savedIcon) return savedIcon;

    const isAuthenticated = localStorage.getItem('isAuthenticated');
    return isAuthenticated ? 'Calendar' : 'PieChart';
  });

  const [filters, setFilters] = useState<SearchFilters | null>(null);
  const [loading, setLoading] = useState(false);

  const toggleSidebar = () => setIsDrawerOpen(!isDrawerOpen);
  const closeDrawer = () => setIsDrawerOpen(false);

  const handleIconClick = (icon: string) => {
    setLoading(true);
    setTimeout(() => {
      setSelectedIcon(icon);
      localStorage.setItem('activeIcon', icon);
      setLoading(false);
    }, 1500);
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
      <div className="d-none d-md-block position-fixed bg-light" style={{ width: 80, height: '100vh' }}>
        <Sidebar onIconClick={handleIconClick} activeIcon={selectedIcon} />
        {/* <div className="text-center mt-3">
          <button onClick={handleLogout} className="btn btn-sm btn-outline-danger">
            Logout
          </button>
        </div> */}
      </div>

      <div className="flex-grow-1" style={{ marginLeft: isDesktop ? 80 : 0 }}>
        <Topbar onToggleSidebar={toggleSidebar} />
        {isDrawerOpen && (
          <div
            className="position-fixed top-0 start-0 bg-light vh-100 shadow d-md-none"
            style={{ width: 125, zIndex: 1050 }}
          >
            <button className="btn btn-light position-absolute top-0 start-50 m-3 " onClick={closeDrawer}>
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

        <div className="container-fluid mt-3">
          <div className="row">
            {loading ? (
              <div className="d-flex justify-content-center align-items-center vh-100">
                <Lottie animationData={CicleLoading} loop={true} style={{ width: 200, height: 200 }} />
              </div>
            ) : selectedIcon === 'Calendar' ? (
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
              <div className="d-flex justify-content-center align-items-center">
                <Lottie animationData={CommingSoon} loop={true} style={{ width: 250, height: 250 }} />
              </div>
            )}
          </div>
          <div className="mt-4">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
