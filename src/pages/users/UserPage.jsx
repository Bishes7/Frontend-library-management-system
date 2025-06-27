import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllUsers } from "../../features/user/userAction";
import { Spinner, Table } from "react-bootstrap";

const UserPage = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const { allUsers } = useSelector((state) => state.userInfo);

  useEffect(() => {
    setIsLoading(true);
    dispatch(fetchAllUsers());
    setIsLoading(false);
  }, [dispatch]);
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
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
};

export default UserPage;
