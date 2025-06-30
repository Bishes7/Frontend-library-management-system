import React from "react";
import { Pagination } from "react-bootstrap";

const PaginationTemplate = ({ pages, active, setActive }) => {
  let items = [];
  for (let number = 1; number <= pages; number++) {
    items.push(
      <Pagination.Item
        key={number}
        active={number === active}
        onClick={() => setActive(number)}
      >
        {number}
      </Pagination.Item>
    );
  }
  return (
    <div className=" d-flex justify-content-center mt-4">
      <Pagination className="pagination-rounded shadow-sm">{items}</Pagination>
    </div>
  );
};

export default PaginationTemplate;
