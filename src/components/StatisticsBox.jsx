import React from "react";

const StatisticsBox = ({ statistics }) => {
  return (
    <div className="container mx-auto my-4">
      <h2 className="text-center mb-4">📊 Statistics</h2>

      <div className="row justify-center">
        <div className="col-md-4 col-sm-6">
          <div className="card text-white bg-primary mb-3 shadow">
            <div className="card-body text-center">
              <h5 className="card-title">Total Sale</h5>
              <p className="card-text fs-4 fw-bold">${statistics.totalSale}</p>
            </div>
          </div>
        </div>

        <div className="col-md-4 col-sm-6">
          <div className="card text-white bg-success mb-3 shadow">
            <div className="card-body text-center">
              <h5 className="card-title">Total Sold Items</h5>
              <p className="card-text fs-4 fw-bold">{statistics.soldItems}</p>
            </div>
          </div>
        </div>

        <div className="col-md-4 col-sm-6">
          <div className="card text-white bg-danger mb-3 shadow">
            <div className="card-body text-center">
              <h5 className="card-title">Total Not Sold Items</h5>
              <p className="card-text fs-4 fw-bold">{statistics.notSoldItems}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatisticsBox;
