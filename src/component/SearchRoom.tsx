import React, { useState } from 'react';
import { SearchFilters } from './AvailableRooms';

interface Props {
  onSearch: (filters: SearchFilters | null) => void;
}

const SearchRoom: React.FC<Props> = ({ onSearch }) => {
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [adults, setAdults] = useState<number | 0>(0);
  const [children, setChildren] = useState<number | 0>(0);
  const [rooms, setRooms] = useState<number | 0>(0);
  const [roomType, setRoomType] = useState('');

  const handleSearch = () => {
    onSearch({
      checkIn,
      checkOut,
      adults: adults || 0,
      children: children || 0,
      rooms: rooms || 0,
      roomType,
    });
  };

  const handleClear = () => {
    setCheckIn('');
    setCheckOut('');
    setAdults(0);
    setChildren(0);
    setRooms(0);
    setRoomType('');
    onSearch(null); // signal to reset filters
  };

  return (
    <div className="card p-3">
      <h5>Search Room</h5>
      <p className="text-muted">Search available room for reservation</p>

      <div className="row">
        <div className="col-6 mb-3">
          <label>Check In</label>
          <input
            type="date"
            className="form-control"
            value={checkIn}
            onChange={(e) => setCheckIn(e.target.value)}
          />
        </div>
        <div className="col-6 mb-3">
          <label>Check Out</label>
          <input
            type="date"
            className="form-control"
            value={checkOut}
            onChange={(e) => setCheckOut(e.target.value)}
          />
        </div>
      </div>

      <div className="mb-3 d-flex justify-content-between align-items-center">
        <label>Adult</label>
        <input
          type="number"
          className="form-control w-25"
          value={adults}
          onChange={(e: any) => setAdults(e.target.value === 0 ? 0 : +e.target.value)}
        />
      </div>

      <div className="mb-3 d-flex justify-content-between align-items-center">
        <label>Children</label>
        <input
          type="number"
          className="form-control w-25"
          value={children}
          onChange={(e: any) => setChildren(e.target.value === 0 ? 0 : +e.target.value)}
        />
      </div>

      <div className="mb-3 d-flex justify-content-between align-items-center">
        <label>Room</label>
        <input
          type="number"
          className="form-control w-25"
          value={rooms}
          onChange={(e: any) => setRooms(e.target.value === 0 ? 0 : +e.target.value)}
        />
      </div>

      <div className="mb-3">
        <label>Room Type</label>
        <input
          type="text"
          className="form-control"
          value={roomType}
          onChange={(e) => setRoomType(e.target.value)}
        />
      </div>

      <div className="d-flex gap-2">
        <button
          className="btn btn-primary w-100"
          style={{ borderRadius: '50px' }}
          onClick={handleSearch}
        >
          Search
        </button>
        <button
          className="btn btn-outline-secondary w-100"
          style={{ borderRadius: '50px' }}
          onClick={handleClear}
        >
          Clear
        </button>
      </div>
    </div>
  );
};

export default SearchRoom;
