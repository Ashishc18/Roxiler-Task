import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
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

 
  const handleMonthChange = (month) => {
    setSelectedMonth(month);
    setPage(1); 
  };

 
  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    setPage(1);
  };

 
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
    <div className="App text-center">
      <h1>Transaction Dashboard</h1>
      
     
      <MonthSelector selectedMonth={selectedMonth} onMonthChange={handleMonthChange} />
      
     
      <StatisticsBox statistics={statistics} />
      
     
      <input 
        type="text" 
        placeholder="Search transactions" 
        value={search}
        onChange={handleSearchChange} 
      />
      
     
      <TransactionTable
        transactions={transactions} 
        onPageChange={handlePageChange}
        page={page}
        totalPages={totalPages} 
      />
      
     
      <BarChart data={barChartData} />
    </div>
  );
}

export default App;
