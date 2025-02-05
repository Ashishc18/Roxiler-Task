import React from 'react';

const MonthSelector = ({ selectedMonth, onMonthChange }) => {
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  return (
    <div>
      <label>Select Month: </label>
      <select value={selectedMonth} onChange={(e) => onMonthChange(e.target.value)}>
        {months.map((month) => (
          <option key={month} value={month}>{month}</option>
        ))}
      </select>
    </div>
  );
};

export default MonthSelector;
