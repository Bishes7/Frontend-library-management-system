import React from "react";
import BorrowTable from "../../components/table/BorrowTable";

const Borrow = () => {
  return (
    <div>
      <div className="p-3 fw-bold bg">All Borrows</div>
      <hr className="hr-book" />

      <div className="all-borrow-table">
        <BorrowTable />
      </div>
    </div>
  );
};

export default Borrow;
