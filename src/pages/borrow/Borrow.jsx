import React from "react";
import BorrowTable from "../../components/table/BorrowTable";

const Borrow = ({ admin }) => {
  return (
    <div>
      <div className="p-3 fw-bold bg">
        {admin ? "All Borrows" : "My borrows List"}
      </div>
      <hr className="hr-book" />

      <div className="all-borrow-table">
        <BorrowTable admin={admin} />
      </div>
    </div>
  );
};

export default Borrow;
