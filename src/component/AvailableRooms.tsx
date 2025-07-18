import React, { useState } from 'react';
import SearchRoom from './SearchRoom';
import RoomList from './RoomList';

export interface SearchFilters {
  checkIn: string;
  checkOut: string;
  adults: number;
  children: number;
  rooms: number;
  roomType: string;
}

const AvailableRooms: React.FC = () => {
  const [filters, setFilters] = useState<SearchFilters | null>(null);

  // const handleSearch = (filterValues: SearchFilters) => {
  //   setFilters(filterValues);
  // };

  return (
    <div className="row g-3">
      <div className="col-md-4">
        <SearchRoom onSearch={(filters) => setFilters(filters)} />
      </div>
      <div className="col-md-8">
        <RoomList filters={filters} />
      </div>
    </div>
  );
};

export default AvailableRooms;
