import React, { useState } from "react";

interface ReservationForm {
  name: string;
  email: string;
  phone: string;
  gender: string;
  address: string;
}

interface Props {
  room: { id: number; type: string };
}

const MakeReservation: React.FC<Props> = ({ room }) => {
  const [forms, setForms] = useState<ReservationForm[]>([
    { name: "", email: "", phone: "", gender: "", address: "" },
  ]);

  const handleChange = (
    index: number,
    field: keyof ReservationForm,
    value: string
  ) => {
    const updated = [...forms];
    updated[index] = { ...updated[index], [field]: value };
    setForms(updated);
  };

  const handleAdd = () => {
    setForms([
      ...forms,
      { name: "", email: "", phone: "", gender: "", address: "" },
    ]);
  };

  const handleRemove = (index: number) => {
    setForms(forms.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Reservation Data:", forms);
    alert(`Reservation for ${room.type} submitted!`);
  };

  return (
    <form onSubmit={handleSubmit}>
      {forms.map((form, index) => (
        <div key={index} className="border rounded p-3 mb-3 bg-light shadow-sm">
          <div className="row">
            <div className="col-12 col-md-6 mb-2">
              <label className="form-label">Name</label>
              <input
                type="text"
                className="form-control"
                value={form.name}
                onChange={(e) => handleChange(index, "name", e.target.value)}
              />
            </div>

            <div className="col-12 col-md-6 mb-2">
              <label className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                value={form.email}
                onChange={(e) => handleChange(index, "email", e.target.value)}
              />
            </div>

            <div className="col-12 col-md-6 mb-2">
              <label className="form-label">Phone</label>
              <input
                type="tel"
                className="form-control"
                value={form.phone}
                onChange={(e) => handleChange(index, "phone", e.target.value)}
              />
            </div>

            <div className="col-12 col-md-6 mb-2">
              <label className="form-label">Gender</label>
              <select
                className="form-select"
                value={form.gender}
                onChange={(e) => handleChange(index, "gender", e.target.value)}
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>

            <div className="col-12 mb-2">
              <label className="form-label">Address</label>
              <textarea
                className="form-control"
                rows={2}
                value={form.address}
                onChange={(e) => handleChange(index, "address", e.target.value)}
              />
            </div>
          </div>

          {index > 0 && (
            <button
              type="button"
              className="btn btn-danger mt-2"
              onClick={() => handleRemove(index)}
            >
              Remove
            </button>
          )}
        </div>
      ))}

      <div className="d-flex justify-content-center gap-2 mt-3">
        <button
          type="button"
          className="btn btn-outline-primary"
          onClick={handleAdd}
        >
          + Add Person
        </button>

        <button type="submit" className="btn btn-success">
          Submit Reservation
        </button>
      </div>
    </form>
  );
};

export default MakeReservation;
