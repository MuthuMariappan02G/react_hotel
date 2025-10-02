import React, { useState } from "react";
import reservations from "../mock/reservationData.json";

const LastReservation: React.FC = () => {
  const [page, setPage] = useState(1);
  const perPage = 2;

  const totalPages = Math.ceil(reservations.length / perPage);
  const paginatedData = reservations.slice((page - 1) * perPage, page * perPage);

  return (
    <div className="card p-3 mt-3" style={{ backgroundColor: "#f5f5f5" }}>
      <div className="d-flex justify-content-between align-items-center mb-2">
        <h6 className="mb-0 fw-bold">Last Reservation</h6>
        {/* <i className="bi bi-three-dots-vertical text-muted"></i> */}
      </div>
      {paginatedData.map((res) => (
        <div
          key={res.id}
          className="card d-flex flex-row align-items-center p-3 gap-2 shadow-sm mb-2"
          // style={{ backgroundColor: "#f5f5f5" }}
        >
          <img
            src={res.image}
            alt={res.roomType}
            className="rounded"
            width={80}
            height={80}
            style={{ objectFit: "cover" }}
          />
          <div className="flex-grow-1">
            <div className="text-muted small">${res.price}/night</div>
            <div className="fw-semibold">{res.roomType}</div>
            <div className="text-muted small">
              {new Date(res.checkIn).toLocaleDateString()} -{" "}
              {new Date(res.checkOut).toLocaleDateString()}
            </div>
          </div>
          <i className="bi bi-chevron-right text-muted fs-5"></i>
        </div>
      ))}

      <div className="d-flex justify-content-center mt-3 gap-3 align-items-center">
        <button
          className="btn btn-sm btn-outline-primary d-flex align-items-center justify-content-center"
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
        >
          <i className="bi bi-chevron-left"></i>
        </button>

        <span className="fw-semibold small">
          {page} / {totalPages}
        </span>

        <button
          className="btn btn-sm btn-outline-primary d-flex align-items-center justify-content-center"
          onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={page === totalPages}
        >
          <i className="bi bi-chevron-right"></i>
        </button>
      </div>
    </div>
  );
};

export default LastReservation;
