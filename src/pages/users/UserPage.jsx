import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteSelectedUser,
  fetchAllUsers,
  updateUserStatusAction,
} from "../../features/user/userAction";
import { Button, Dropdown, Spinner, Table } from "react-bootstrap";

const UserPage = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const { allUsers } = useSelector((state) => state.userInfo);

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
  return (
    <div className="p-3">
      <h4 className="mb-3">All Users</h4>

      {isLoading && <Spinner animation="border" variant="primary" />}

      {allUsers.length > 0 && (
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>#</th>
              <th>Full Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Status</th>
              <th>Controls</th>
            </tr>
          </thead>
          <tbody>
            {allUsers.map((user, i) => (
              <tr key={user._id}>
                <td>{i + 1}</td>
                <td>
                  {user.fName} {user.lName}
                </td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>{user.status}</td>
                <td>
                  <Dropdown>
                    <Dropdown.Toggle variant="secondary" size="sm">
                      Actions
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item
                        onClick={() => handleOnUpdateStatus(user._id)}
                      >
                        {user.status === "active"
                          ? "Deactivate User"
                          : "Activate User"}
                      </Dropdown.Item>

                      {user.role !== "admin" && (
                        <Dropdown.Item>Promote To Admin</Dropdown.Item>
                      )}

                      <Dropdown.Item onClick={() => handleOnDelete(user._id)}>
                        Remove User
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
};

export default UserPage;
