import React from 'react';

import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto';

const BarChart = ({ data }) => {
  const chartData = {
    labels: Object.keys(data),
    datasets: [
      {
        label: 'Number of Items',
        data: Object.values(data),
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className=''>
      <h2 className='pt-4'>Transactions Bar Chart</h2>
      <Bar data={chartData} />
    </div>
  );
};

export default BarChart;
