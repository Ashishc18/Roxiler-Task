import React from "react";

const MonthSelector = ({ selectedMonth, onMonthChange }) => {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  return (
    <div className="container mx-auto my-3">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow p-3">
            <label className="form-label fw-bold">📅 Select Month:</label>
            <select
              className="form-select"
              value={selectedMonth}
              onChange={(e) => onMonthChange(e.target.value)}
            >
              {months.map((month) => (
                <option key={month} value={month}>
                  {month}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MonthSelector;
