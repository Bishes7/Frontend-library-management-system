import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { getRecentBooksApi } from "../../features/borrowStatus/borrowStatsStatus";

const RecentBooksTable = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getRecentBooksApi();
        setBooks(response);
        console.log(response);
      } catch (error) {
        console.error("Error fetching recent books", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <h5 className="text-center mb-3">Recent Book Uploads</h5>
    </div>
  );
};

export default RecentBooksTable;
