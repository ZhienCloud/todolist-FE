import React from "react";

const UserPicture = ({ user }) => {
  return (
    <div className="user-picture">
      <img src={user.picture} alt="User" />
    </div>
  );
};

export default UserPicture;