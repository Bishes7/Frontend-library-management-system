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
        console.log("Recent Books Uploaded", response);
      } catch (error) {
        console.error("Error fetching recent books", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <h5 className="text-center mb-3">Recent Book Uploads</h5>
      <Table striped bordered hover responsive variant="dark">
        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Genre</th>
            <th>Status</th>
            <th>Average Rating</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book) => (
            <tr key={book._id}>
              <td>{book.title}</td>
              <td>{book.author}</td>
              <td>{book.genre}</td>
              <td>{book.status}</td>
              <td>{book.averageRating}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default RecentBooksTable;
