import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import BarChart from './components/BarChart';
import TransactionTable from './components/TransactionTable';
import MonthSelector from './components/MonthSelector';
import StatisticsBox from './components/StatisticsBox';

function App() {
  const [transactions, setTransactions] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [statistics, setStatistics] = useState({});
  const [barChartData, setBarChartData] = useState({});
  const [selectedMonth, setSelectedMonth] = useState('March');
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [perPage] = useState(10);
  const [loading, setLoading] = useState({
    transactions: false,
    statistics: false,
    barChart: false
  });
  const BASE_URL = 'http://localhost:5000/api';

 
  const fetchTransactions = async () => {
    try {
      setLoading(prev => ({ ...prev, transactions: true }));
      const response = await axios.get(`${BASE_URL}/transactions`, {
        params: { month: selectedMonth }
      });
      const allTransactions = response.data.transactions || [];
      setTransactions(allTransactions);
      filterAndPaginateTransactions(allTransactions, search, page);
    } catch (error) {
      console.error('Error fetching transactions:', error);
    } finally {
      setLoading(prev => ({ ...prev, transactions: false }));
    }
  };

  
  const filterAndPaginateTransactions = (allTransactions, searchTerm, currentPage) => {
    let filtered = allTransactions;

   
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      filtered = filtered.filter(transaction =>
        transaction.title.toLowerCase().includes(searchLower) ||
        transaction.description.toLowerCase().includes(searchLower) ||
        transaction.category.toLowerCase().includes(searchLower)
      );
    }

   
    const total = Math.ceil(filtered.length / perPage);
    setTotalPages(total);

   
    const start = (currentPage - 1) * perPage;
    const paginatedData = filtered.slice(start, start + perPage);
    
    setFilteredTransactions(paginatedData);
  };

 
  const fetchStatistics = async () => {
    try {
      setLoading(prev => ({ ...prev, statistics: true }));
      const response = await axios.get(`${BASE_URL}/statistics`, {
        params: { month: selectedMonth }
      });
      setStatistics(response.data);
    } catch (error) {
      console.error('Error fetching statistics:', error);
    } finally {
      setLoading(prev => ({ ...prev, statistics: false }));
    }
  };

  
  const fetchBarChartData = async () => {
    try {
      setLoading(prev => ({ ...prev, barChart: true }));
      const response = await axios.get(`${BASE_URL}/barchart`, {
        params: { month: selectedMonth }
      });
      setBarChartData(response.data);
    } catch (error) {
      console.error('Error fetching bar chart data:', error);
    } finally {
      setLoading(prev => ({ ...prev, barChart: false }));
    }
  };

  
  const handleMonthChange = (month) => {
    setSelectedMonth(month);
    setPage(1);
    setSearch('');
  };

  
  const handleSearchChange = (e) => {
    const searchTerm = e.target.value;
    setSearch(searchTerm);
    setPage(1);
    filterAndPaginateTransactions(transactions, searchTerm, 1);
  };

 
  const handlePageChange = (newPage) => {
    setPage(newPage);
    filterAndPaginateTransactions(transactions, search, newPage);
  };

 
  useEffect(() => {
    fetchTransactions();
    fetchStatistics();
    fetchBarChartData();
  }, [selectedMonth]);

  return (
    <div className="container py-4 mx-auto">
      <h1 className="text-center mb-4">Transaction Dashboard</h1>
      
     
      <div className="row mb-4">
        <div className="col-12">
          <MonthSelector selectedMonth={selectedMonth} onMonthChange={handleMonthChange} />
        </div>
      </div>

      
      <div className="row mb-4">
        <div className="col-12">
          <StatisticsBox 
            statistics={statistics} 
            loading={loading.statistics}
          />
        </div>
      </div>

    
      <div className="row mb-4">
        <div className=" col-12 xl:col-3">
          <input 
            type="text" 
            className="form-control"
            placeholder="Search transactions..." 
            value={search}
            onChange={handleSearchChange} 
          />
        </div>
      </div>

    
      <div className="row mb-4">
        <div className="col-12">
          <TransactionTable
            transactions={filteredTransactions}
            loading={loading.transactions}
            page={page}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      </div>

     
      <div className="row">
        <div className="col-12">
          <BarChart 
            data={barChartData} 
            loading={loading.barChart}
          />
        </div>
      </div>
    </div>
  );
}

export default App;