import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BarChart from './components/BarChart';
import TransactionTable from './components/TransactionTable';
import MonthSelector from './components/MonthSelector';
import StatisticsBox from './components/StatisticsBox';

function App() {
  const [transactions, setTransactions] = useState([]);
  const [statistics, setStatistics] = useState({});
  const [barChartData, setBarChartData] = useState({});
  const [selectedMonth, setSelectedMonth] = useState('March');
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [perPage] = useState(10);
  const BASE_URL = 'http://localhost:5000/api';

  // Fetch Transactions
  const fetchTransactions = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/transactions`, {
        params: { month: selectedMonth, search, page, perPage },
      });
      setTransactions(response.data);
      // Calculate total pages based on response (if available)
      setTotalPages(Math.ceil(response.data.total / perPage));
    } catch (error) {
      console.error('Error fetching transactions:', error);
    }
  };

  // Fetch Statistics
  const fetchStatistics = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/statistics`, {
        params: { month: selectedMonth },
      });
      setStatistics(response.data);
    } catch (error) {
      console.error('Error fetching statistics:', error);
    }
  };

  // Fetch Bar Chart Data
  const fetchBarChartData = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/barchart`, {
        params: { month: selectedMonth },
      });
      setBarChartData(response.data);
    } catch (error) {
      console.error('Error fetching bar chart data:', error);
    }
  };

  // Handle Month Change
  const handleMonthChange = (month) => {
    setSelectedMonth(month);
    setPage(1); // Reset page to 1 when month changes
  };

  // Handle Search Change
  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    setPage(1); // Reset page when search changes
  };

  // Handle Page Change (Next/Prev)
  const handlePageChange = (direction) => {
    if (direction === 'next' && page < totalPages) {
      setPage(page + 1);
    } else if (direction === 'prev' && page > 1) {
      setPage(page - 1);
    }
  };

  useEffect(() => {
    fetchTransactions();
    fetchStatistics();
    fetchBarChartData();
  }, [selectedMonth, search, page]);

  return (
    <div className="App">
      <h1>Transaction Dashboard</h1>
      
      {/* Month Selector */}
      <MonthSelector selectedMonth={selectedMonth} onMonthChange={handleMonthChange} />
      
      {/* Statistics Box */}
      <StatisticsBox statistics={statistics} />
      
      {/* Search Bar */}
      <input 
        type="text" 
        placeholder="Search transactions" 
        value={search}
        onChange={handleSearchChange} 
      />
      
      {/* Transaction Table */}
      <TransactionTable
        transactions={transactions} 
        onPageChange={handlePageChange}
        page={page}
        totalPages={totalPages} 
      />
      
      {/* Bar Chart */}
      <BarChart data={barChartData} />
    </div>
  );
}

export default App;
