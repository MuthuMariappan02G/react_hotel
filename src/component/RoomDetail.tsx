import React, { useState, useEffect } from 'react';

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

interface RoomDetailProps {
  room: Room;
  onClose: () => void;
}

const RoomDetail: React.FC<RoomDetailProps> = ({ room, onClose }) => {
  const imageList = room.images?.length ? room.images : [room.image];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handlePrevImage = () => {
    setCurrentImageIndex(prev => (prev === 0 ? imageList.length - 1 : prev - 1));
  };

  const handleNextImage = () => {
    setCurrentImageIndex(prev => (prev === imageList.length - 1 ? 0 : prev + 1));
  };

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  return (
    <div
      className="modal fade show d-block"
      style={{ backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1050 }}
      role="dialog"
    >
      <div className="modal-dialog modal-lg modal-dialog-centered"  style={{ maxWidth: '550px' }} >
        <div className="modal-content position-relative">
          <div className="modal-body">
            <div className="d-flex justify-content-center align-items-center position-relative mb-4">
              {imageList.length > 1 && (
                <button
                  className="btn btn-sm btn-outline-secondary position-absolute start-0"
                  onClick={handlePrevImage}
                >
                  <i className="bi bi-chevron-left"></i>
                </button>
              )}
              <img
                src={imageList[currentImageIndex]}
                alt={`room-${currentImageIndex}`}
                className="rounded"
                style={{ height: 180, width: 'auto' }}
              />
              {imageList.length > 1 && (
                <button
                  className="btn btn-sm btn-outline-secondary position-absolute end-0"
                  onClick={handleNextImage}
                >
                  <i className="bi bi-chevron-right"></i>
                </button>
              )}
            </div>
            <div className="text-center">
              <h5>{room.type}</h5>
              <p><strong>ID:</strong> {room.id}</p>
              <p><strong>Price:</strong> ${room.price} / night</p>
              {room.hot && <span className="badge bg-danger mb-2">Hot</span>}
              <div className="text-muted mb-2">
                <strong>Features:</strong>
                <div className="d-flex flex-wrap justify-content-center gap-2 mt-2">
                  {room.features.map((feature, idx) => (
                    <div key={idx} className="d-flex align-items-center small">
                      <i className={`${feature.icon} me-1`}></i>
                      {feature.label}
                    </div>
                  ))}
                </div>
              </div>
              {room.rating && <p><strong>Rating:</strong> {room.rating} / 5</p>}
              {room.isBooked && room.lastCheckout && (
                <p><strong>Last Checkout:</strong> {room.lastCheckout}</p>
              )}
            </div>
             <div className="text-center mt-4">
              <button className="btn btn-secondary px-4" onClick={onClose}>
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomDetail;
