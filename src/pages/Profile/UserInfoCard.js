import React from "react";

const UserInfoCard = ({ user }) => {
  return (
    <div className="card">
      <div className="card-body">
        <h4>{user?.name}</h4>
        <span className="mr-3">
          <strong>Username: </strong>
          {user?.username}
        </span>
        <span className="mr-3">
          <strong>Email: </strong>
          {user?.email}
        </span>
        <span className="mr-3">
          <strong>Phone: </strong>
          {user?.phone}
        </span>
        <span className="mr-3">
          <strong>Website: </strong>
          {user?.website}
        </span>
        <span className="mr-3">
          <strong>Company: </strong>
          {user.company?.name}
        </span>
        <span className="mr-3 d-block">
          <strong>Address: </strong>
          {user.address?.street}, {user.address?.suite}, {user.address?.city},{" "}
          {user.address?.zipcode}
        </span>
      </div>
    </div>
  );
};

export default UserInfoCard;
