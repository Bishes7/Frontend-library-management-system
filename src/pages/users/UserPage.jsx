import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteSelectedUser,
  fetchAllUsers,
  updateUserRoleAction,
  updateUserStatusAction,
} from "../../features/user/userAction";
import { Button, Dropdown, Form, Spinner, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import PaginationTemplate from "../../components/PaginationTemplate/PaginationTemplate";
const UserPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const { allUsers, user } = useSelector((state) => state.userInfo);
  const [searchQuery, setSearchQuery] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 7;

  useEffect(() => {
    setIsLoading(true);
    dispatch(fetchAllUsers());
    setIsLoading(false);
  }, [dispatch]);

  const handleOnDelete = (_id) => {
    if (window.confirm("Are youy sure you want to delete")) {
      dispatch(deleteSelectedUser(_id));
    }
  };

  const handleOnUpdateStatus = (_id) => {
    dispatch(updateUserStatusAction(_id));
  };

  const handleOnUpdateRole = (_id) => {
    dispatch(updateUserRoleAction(_id));
  };

  // Filter Users
  const filteredUsers = allUsers.filter(
    (users) =>
      users.fName.toLowerCase().includes(searchQuery.toLocaleLowerCase()) ||
      user.email.toLocaleLowerCase().includes(searchQuery.toLocaleLowerCase())
  );

  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentusers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  return (
    <div className="p-3">
      <h4 className="mb-3">All Users</h4>
      <input
        type="text"
        className="form-control mb-3 w-25"
        placeholder="Search by name or email"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      {isLoading && <Spinner animation="border" variant="primary" />}

      {allUsers.length > 0 && (
        <Table className="table-striped bordered table-hover shadow-sm rounded table-responsive">
          <thead>
            <tr>
              <th>#</th>
              <th>Full Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Status</th>
              <th>Controls</th>
              <th>View</th>
            </tr>
          </thead>
          <tbody>
            {currentusers.map((user, i) => (
              <tr key={user._id}>
                <td>{i + 1}</td>
                <td>
                  {user.fName} {user.lName}
                </td>
                <td>{user.email}</td>
                <td>
                  <span
                    className={`badge ${
                      user.role === "admin" ? "bg-success" : "bg-secondary"
                    }`}
                  >
                    {user.role}
                  </span>
                </td>
                <td>
                  <span
                    className={`badge ${
                      user.status === "active" ? "bg-success" : "bg-warning"
                    }`}
                  >
                    {user.status}
                  </span>
                </td>
                <td>
                  <div className="d-flex gap-2 justify-content-center">
                    <Dropdown>
                      <Dropdown.Toggle variant="secondary" size="sm">
                        Actions
                      </Dropdown.Toggle>
                      <Dropdown.Menu>
                        <Dropdown.Item
                          className="custom-dropdown-item"
                          onClick={() => handleOnUpdateStatus(user._id)}
                        >
                          <i className="bi bi-check-circle me-2 text-success"></i>
                          {user.status === "active"
                            ? "Deactivate User"
                            : "Activate User"}
                        </Dropdown.Item>

                        <Dropdown.Item
                          className="custom-dropdown-item"
                          onClick={() => handleOnUpdateRole(user._id)}
                        >
                          <i className="bi bi-person-up me-2 text-primary"></i>
                          Promote to Admin
                        </Dropdown.Item>

                        <Dropdown.Item
                          className="custom-dropdown-item text-danger"
                          onClick={() => handleOnDelete(user._id)}
                        >
                          <i className="bi bi-trash3 me-2"></i>
                          Remove User
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </div>
                </td>

                <td>
                  <Button
                    variant="dark"
                    size="sm"
                    onClick={() => navigate(`/user/${user._id}`)}
                  >
                    View Profile
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}

      <PaginationTemplate
        pages={totalPages}
        active={currentPage}
        setActive={setCurrentPage}
      />
    </div>
  );
};

export default UserPage;
