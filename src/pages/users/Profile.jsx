import React from "react";

import AdminProfile from "../../components/changePassword/AdminProfile";
import { useSelector } from "react-redux";
import UserProfilePage from "./UserProfilePage";

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
