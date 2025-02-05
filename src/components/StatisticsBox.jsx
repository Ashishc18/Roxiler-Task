import React from 'react';

const StatisticsBox = ({ statistics }) => {
  return (
    <div>
      <h2>Statistics</h2>
      <div>
        <p>Total Sale: ${statistics.totalSale}</p>
        <p>Total Sold Items: {statistics.soldItems}</p>
        <p>Total Not Sold Items: {statistics.notSoldItems}</p>
      </div>
    </div>
  );
};

export default StatisticsBox;
