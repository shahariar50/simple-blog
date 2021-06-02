import React from "react";

const UsersPost = ({ post }) => {
  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">
          {post.title.length < 20
            ? post.title
            : `${post.title.slice(0, 25)}...`}
        </h5>
        <p className="card-text">
          {post.body.length < 60 ? post.body : `${post.body.slice(0, 100)}...`}
        </p>
      </div>
    </div>
  );
};

export default UsersPost;
