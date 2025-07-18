import React from 'react';

const LastReservation: React.FC = () => {
  return (
    <div className="mt-4">
      {/* Title and Menu Icon */}
      <div className="d-flex justify-content-between align-items-center mb-2">
        <h6 className="mb-0 fw-bold">Last Reservation</h6>
        <i className="bi bi-three-dots-vertical text-muted"></i>
      </div>

      {/* Reservation Card */}
      <div className="card d-flex flex-row align-items-center p-3 gap-2 shadow-sm">
        <img
          src="https://placehold.co/60x60?text=Room"
          alt="room"
          className="rounded"
          width={80}
          height={80}
          style={{ objectFit: 'cover' }}
        />
        <div className="flex-grow-1">
          <div className="text-muted small">$239/night</div>
          <div className="fw-semibold">Luxury King Size</div>
          <div className="text-muted small">24 Jul - 26 Jul</div>
        </div>
        <i className="bi bi-chevron-right text-muted fs-5"></i>
      </div>
    </div>
  );
};

export default LastReservation;
