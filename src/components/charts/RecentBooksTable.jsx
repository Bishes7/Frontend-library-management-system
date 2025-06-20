import React from "react";
import { Table } from "react-bootstrap";

const RecentBooksTable = () => {
  // dummy data
  const books = [
    {
      title: "Clean Code",
      author: "Robert Martin",
      category: "Tech",
      date: "2024-06-10",
    },
    {
      title: "1984",
      author: "George Orwell",
      category: "Fiction",
      date: "2024-06-12",
    },
    {
      title: "Atomic Habits",
      author: "James Clear",
      category: "Self-help",
      date: "2024-06-14",
    },
  ];
  return (
    <div className="bg-dark p-4 rounded shadow text-white">
      <h5>Recent Book Uploads</h5>
      <Table striped bordered hover variant="dark" className=" text-light">
        <thead>
          <tr>
            <th>Titlle</th>
            <th>Author</th>
            <th>Category</th>
            <th>Upload Date</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book, i) => (
            <tr key={i}>
              <td>{book.title}</td>
              <td>{book.author}</td>
              <td>{book.category}</td>
              <td>{book.date}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default RecentBooksTable;
