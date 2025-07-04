import React from "react";

import { useSelector } from "react-redux";
import UserProfilePage from "./UserProfilePage";
import AdminProfile from "../../components/UpdateDetailsModal/AdminProfile";

const Profile = () => {
  const { user } = useSelector((state) => state.userInfo);

  const isAdmin = user?.role === "admin";

  return (
    <div>
      {isAdmin ? (
        <AdminProfile />
      ) : (
        <div>
          <UserProfilePage />
        </div>
      )}
    </div>
  );
};

export default Profile;
