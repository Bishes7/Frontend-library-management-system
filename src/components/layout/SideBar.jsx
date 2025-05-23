import Stack from "react-bootstrap/Stack";
import { Link } from "react-router-dom";
import { MdDashboard } from "react-icons/md";
import { IoBookSharp } from "react-icons/io5";
import { FaUsers } from "react-icons/fa";
import { MdOutlineHistoryEdu } from "react-icons/md";
import { FaCircleUser } from "react-icons/fa6";
import { MdRateReview } from "react-icons/md";
import { useSelector } from "react-redux";
export const SideBar = () => {
  const { user } = useSelector((state) => state.userInfo);

  const admin = user.role === "admin";
  return (
    <Stack gap={2}>
      <div className="p-2">
        <Link className="nav-link" to="/user">
          <MdDashboard /> Dashboard
        </Link>
      </div>

      <div className="p-2">
        <Link className="nav-link" to="/user/my-borrow">
          <MdOutlineHistoryEdu /> My Borrow List
        </Link>
      </div>
      <div className="p-2">
        <Link className="nav-link" to="/user/profile">
          <FaCircleUser /> Profile
        </Link>
      </div>

      {admin && (
        <>
          <div className="p-2">
            <Link className="nav-link" to="/user/reviews">
              <MdRateReview /> Reviews
            </Link>
          </div>
          <div className="p-2">
            <Link className="nav-link" to="/user/all">
              <FaUsers /> All users
            </Link>
          </div>
          <div className="p-2">
            <Link className="nav-link" to="/user/borrow">
              <MdOutlineHistoryEdu /> All Borrows
            </Link>
          </div>
          <div className="p-2">
            <Link className="nav-link" to="/user/books">
              <IoBookSharp /> BookPage
            </Link>
          </div>
        </>
      )}
    </Stack>
  );
};
