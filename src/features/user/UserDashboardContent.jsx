import React, { useEffect, useState } from "react";
import { borrowBooksApi } from "../borrow/borrowApi";

const UserDashboardContent = () => {
  const [stats, setStats] = useState({
    totalBorrowed: 0,
    activeBorrows: 0,
    topBook: "N/A",
    dueDate: "",
  });
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const { status, message, payload } = await borrowBooksApi(false);
        if (status === "success") {
          const borrows = payload || [];

          const totalBorrowed = borrows.length;
          const activeBorrows = borrows.filter(
            (borrow) => !borrow.isReturned
          ).length;

          const topBook = borrows.length
            ? borrows[0].bookTitle || "unknown"
            : "N/A";

          const dueDate = borrows.map((borrow) => borrow.dueDate?.slice(0, 10));

          setStats({ totalBorrowed, activeBorrows, topBook, dueDate });
        } else {
          console.error("Failed", message);
        }
      } catch (error) {
        console.log("Error loading borrow stats", error);
      }
    };
    fetchStats();
  }, []);
  return <div>UserDashboardContent</div>;
};

export default UserDashboardContent;
