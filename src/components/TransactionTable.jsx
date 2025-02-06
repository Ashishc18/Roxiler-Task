import React, { useEffect, useState } from "react";


const TransactionTable = () => {
  const [transactions, setTransactions] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchTransactions = async (currentPage) => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(
        `http://localhost:5000/api/transactions?page=${currentPage}&perPage=10`
      );
      const data = await response.json();

      if (!response.ok) throw new Error(data.error || "Something went wrong");

      setTransactions(data.transactions || []);
      setTotalPages(data.totalPages || 1);
    } catch (err) {
      setError(err.message);
      setTransactions([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions(page);
  }, [page]);

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Transaction List</h2>

      {loading && <p className="text-center text-primary">Loading...</p>}
      {error && <p className="text-center text-danger">{error}</p>}
      {!loading && transactions.length === 0 && (
        <p className="text-center text-warning">No transactions found.</p>
      )}

      <div className="table-responsive">
        <table className="table table-striped table-hover text-center">
          <thead className="table-dark">
            <tr>
              <th>Title</th>
              <th>Description</th>
              <th>Price</th>
              <th>Date of Sale</th>
              <th>Category</th>
              <th>Sold</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction) => (
              <tr key={transaction._id}>
                <td>{transaction.title}</td>
                <td>{transaction.description}</td>
                <td>${transaction.price.toFixed(2)}</td>
                <td>{new Date(transaction.dateOfSale).toLocaleDateString()}</td>
                <td>{transaction.category}</td>
                <td>
                  <span
                    className={`badge ${transaction.sold ? "bg-success" : "bg-danger"}`}
                  >
                    {transaction.sold ? "Yes" : "No"}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="d-flex justify-content-center mt-3">
        <button
          className="btn btn-primary mx-2"
          onClick={() => setPage(page - 1)}
          disabled={page === 1}
        >
          Previous
        </button>
        <span className="align-self-center">
          Page {page} of {totalPages}
        </span>
        <button
          className="btn btn-primary mx-2"
          onClick={() => setPage(page + 1)}
          disabled={page >= totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default TransactionTable;
