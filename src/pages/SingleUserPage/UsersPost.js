import React from "react";

const UsersPost = ({ post }) => {
  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">
          {/* Limit the text length to 20 */}
          {post.title.length < 20
            ? post.title
            : `${post.title.slice(0, 25)}...`}
        </h5>
        <p className="card-text">
          {/* Limit the text length to 60 */}
          {post.body.length < 100 ? post.body : `${post.body.slice(0, 100)}...`}
        </p>
      </div>
    </div>
  );
};

export default UsersPost;
