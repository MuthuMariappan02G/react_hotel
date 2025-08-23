import React, { useState, useMemo } from 'react';
import roomsData from '../mock/roomsData.json';
import RoomDetail from './RoomDetail';
import { SearchFilters } from './AvailableRooms';
import Lottie from 'lottie-react';
import NoData from '../mock/Lottie/Error 404.json'

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

  const [showSortModal, setShowSortModal] = useState(false);
  const [sortType, setSortType] = useState<string>('Relevance');

  const [minPrice, setMinPrice] = useState<number | ''>('');
  const [maxPrice, setMaxPrice] = useState<number | ''>('');
  const [minRating, setMinRating] = useState<number | ''>('');

  const [tempMinPrice, setTempMinPrice] = useState<number | ''>('');
  const [tempMaxPrice, setTempMaxPrice] = useState<number | ''>('');
  const [tempMinRating, setTempMinRating] = useState<number | ''>('');

  const categories = ['All Rooms', 'Deluxe', 'Standart', 'Presidential', 'Suite', 'Junior Suite', 'Twin Room'];

  const filteredRooms = useMemo(() => {
    let result = [...roomsData];
    if (filters?.roomType && filters.roomType.trim() !== '') {
      result = result.filter(room =>
        room.type.toLowerCase().includes(filters.roomType.toLowerCase())
      );
    }
    if (selectedCategory !== 'All Rooms') {
      result = result.filter(room =>
        room.type.toLowerCase().includes(selectedCategory.toLowerCase())
      );
    }
    if (sortType === 'Price' && minPrice !== '' && maxPrice !== '') {
      result = result.filter(room => room.price >= minPrice && room.price <= maxPrice);
      result.sort((a, b) => a.price - b.price);
    }

    if (sortType === 'Rating' && minRating !== '') {
      result = result.filter(room => (room.rating ?? 0) >= minRating);
      result.sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0));
    }

    return result;
  }, [filters, selectedCategory, sortType, minPrice, maxPrice, minRating]);

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
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-3 gap-2">
        <div>
          <h4 className="mb-0">Available Rooms</h4>
          <small className="text-muted">{filteredRooms.length}+ Room Available</small>
        </div>

        <div className="d-flex align-items-center gap-2">
          <i className="bi bi-filter"></i>
          <span className="text-muted">Sort by:</span>
          <select
            className="form-select form-select-sm"
            style={{ width: 120 }}
            value={sortType}
            onChange={(e) => {
              const newSort = e.target.value;
              setSortType(newSort);
              setTempMinPrice(minPrice);
              setTempMaxPrice(maxPrice);
              setTempMinRating(minRating);
              setShowSortModal(true);
            }}
          >
            <option value="Relevance">Relevance</option>
            <option value="Price">Price</option>
            <option value="Rating">Rating</option>
          </select>
        </div>
      </div>

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

      {visibleRooms.length === 0 ? (
        <div className="col-12 d-flex flex-column justify-content-center align-items-center p-3">
          <Lottie
            animationData={NoData}
            loop={true}
            style={{ width: '100%', maxWidth: 370, height: 'auto', maxHeight: 500 }}
          />
          <div className="text-center text-muted py-4 fs-5">
            No Rooms are Available Today
          </div>
        </div>
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

      {selectedRoom && (
        <RoomDetail room={selectedRoom} onClose={closeRoomDetail} />
      )}

      {showSortModal && (
        <div className="modal fade show d-block" tabIndex={-1} style={{ background: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{sortType}</h5>
                <button type="button" className="btn-close" onClick={() => setShowSortModal(false)}></button>
              </div>

              <div className="modal-body">
                {sortType === 'Relevance' && (
                  <p className="text-muted">Showing rooms by relevance.</p>
                )}

                {sortType === 'Price' && (
                  <div className="d-flex gap-2">
                    <input
                      type="number"
                      className="form-control"
                      placeholder="Min"
                      value={tempMinPrice}
                      onChange={(e) => setTempMinPrice(e.target.value === '' ? '' : Number(e.target.value))}
                    />
                    <span className="align-self-center">-</span>
                    <input
                      type="number"
                      className="form-control"
                      placeholder="Max"
                      value={tempMaxPrice}
                      onChange={(e) => setTempMaxPrice(e.target.value === '' ? '' : Number(e.target.value))}
                    />
                  </div>
                )}

                {sortType === 'Rating' && (
                  <select
                    className="form-select"
                    value={tempMinRating}
                    onChange={(e) => setTempMinRating(e.target.value === '' ? '' : Number(e.target.value))}
                  >
                    <option value="">Select minimum rating</option>
                    <option value="5">5 ★</option>
                    <option value="4">4 ★ & above</option>
                    <option value="3">3 ★ & above</option>
                  </select>
                )}
              </div>

              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={() => setShowSortModal(false)}>Cancel</button>
                <button
                  className="btn btn-primary"
                  onClick={() => {
                    setMinPrice(tempMinPrice);
                    setMaxPrice(tempMaxPrice);
                    setMinRating(tempMinRating);
                    setShowSortModal(false);
                    setCurrentPage(0);
                  }}
                >
                  Apply
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RoomList;
