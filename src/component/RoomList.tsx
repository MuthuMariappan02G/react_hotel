import React, { useState, useMemo } from 'react';
import roomsData from '../mock/roomsData.json';
import RoomDetail from './RoomDetail';
import { SearchFilters } from './AvailableRooms';

interface Feature {
  icon: string;
  label: string;
}

interface Room {
  id: number;
  price: number;
  type: string;
  hot: boolean;
  image: string;
  images?: string[];
  features: Feature[];
  rating?: number;
  isBooked?: boolean;
  lastCheckout?: string;
}

interface Props {
  filters: SearchFilters | null;
}

const RoomList: React.FC<Props> = ({ filters }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [selectedCategory, setSelectedCategory] = useState('All Rooms');

  const categories = ['All Rooms', 'Deluxe', 'Standart', 'Presidential', 'Suite', 'Junior Suite', 'Twin Room'];

const filteredRooms = useMemo(() => {
  let result = [...roomsData];

  // Apply search filter
  if (filters?.roomType && filters.roomType.trim() !== '') {
    result = result.filter(room =>
      room.type.toLowerCase().includes(filters.roomType.toLowerCase())
    );
  }

  // Apply category filter with partial match
  if (selectedCategory !== 'All Rooms') {
    result = result.filter(room =>
      room.type.toLowerCase().includes(selectedCategory.toLowerCase())
    );
  }

  return result;
}, [filters, selectedCategory]);


  const itemsPerPage = 4;
  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const visibleRooms = filteredRooms.slice(startIndex, endIndex);

  const handleNext = () => {
    if (endIndex < filteredRooms.length) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (startIndex > 0) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const openRoomDetail = (room: Room) => setSelectedRoom(room);
  const closeRoomDetail = () => setSelectedRoom(null);

  return (
    <div className="card p-3">
      {/* Header */}
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-3 gap-2">
        <div>
          <h4 className="mb-0">Available Rooms</h4>
          <small className="text-muted">{filteredRooms.length}+ Room Available</small>
        </div>

        <div className="d-flex align-items-center gap-2">
          <i className="bi bi-filter"></i>
          <span className="text-muted">Sort by:</span>
          <select className="form-select form-select-sm" style={{ width: 120 }}>
            <option>Relevance</option>
            <option>Price</option>
            <option>Rating</option>
          </select>
        </div>
      </div>

      {/* Category Filters */}
      <div className="mb-4 d-flex flex-wrap gap-2">
        {categories.map((label, idx) => (
          <button
            key={idx}
            onClick={() => {
              setSelectedCategory(label);
              setCurrentPage(0);
            }}
            className={`btn btn-sm ${label === selectedCategory ? 'btn-primary' : 'btn-outline-secondary'}`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Room Cards */}
      {visibleRooms.length === 0 ? (
        <div className="text-center text-muted py-5 fs-5">No Rooms are Available Today</div>
      ) : (
        visibleRooms.map((room) => (
          <div key={room.id} className="card mb-3 p-3">
            <div className="row g-3 align-items-start align-items-md-center">
              <div className="col-12 col-md-8 d-flex">
                <div className="position-relative me-3 flex-shrink-0">
                  <img
                    src={room.image}
                    alt={room.type}
                    className="rounded"
                    width={100}
                    height={80}
                  />
                  {room.hot && (
                    <span
                      className="badge bg-danger position-absolute top-0 start-0"
                      style={{ fontSize: 12 }}
                    >
                      Hot
                    </span>
                  )}
                </div>
                <div>
                  <h6 className="mb-1">${room.price} / night</h6>
                  <strong>{room.type}</strong>

                  {room.rating && (
                    <div className="small mt-1 d-flex align-items-center">
                      <i className="bi bi-star-fill text-warning me-1"></i>
                      <span className="text-dark">{room.rating} / 5</span>
                    </div>
                  )}

                  <div className="d-flex flex-wrap gap-3 mt-2 text-muted small">
                    {room.features.map((feature, i) => (
                      <span key={i}>
                        <i className={`${feature.icon} me-1`}></i>
                        {feature.label}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="col-12 col-md-4 d-flex flex-wrap justify-content-md-end gap-2 mt-2 mt-md-0">
                <button className="btn btn-outline-primary btn-sm" onClick={() => openRoomDetail(room)}>
                  Room Detail
                </button>
                <button className="btn btn-primary btn-sm">Make Reservation</button>
              </div>
            </div>
          </div>
        ))
      )}

      {/* Pagination */}
      {visibleRooms.length > 0 && (
        <div className="d-flex justify-content-between align-items-center mt-3">
          <button
            className="btn btn-outline-secondary"
            onClick={handlePrev}
            disabled={currentPage === 0}
          >
            <i className="bi bi-chevron-left"></i>
          </button>

          <span className="text-muted">
            Page {currentPage + 1} of {Math.ceil(filteredRooms.length / itemsPerPage)}
          </span>

          <button
            className="btn btn-outline-secondary"
            onClick={handleNext}
            disabled={endIndex >= filteredRooms.length}
          >
            <i className="bi bi-chevron-right"></i>
          </button>
        </div>
      )}

      {/* Room Detail Modal */}
      {selectedRoom && (
        <RoomDetail room={selectedRoom} onClose={closeRoomDetail} />
      )}
    </div>
  );
};

export default RoomList;
