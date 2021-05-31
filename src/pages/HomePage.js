import React from "react";
import { Link } from "react-router-dom";
import PostContext from "../context/PostContext";

const HomePage = () => {
  const [totalItemsShowing, setTotalItemsShowing] = React.useState(10);

  const { posts } = React.useContext(PostContext);

  return (
    <div className="py-4">
      <div className="container">
        <div className="row">
          {posts.slice(0, totalItemsShowing).map((post) => (
            <div className="col-md-4 mb-3" key={post.id}>
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">
                    {post.title.length < 20
                      ? post.title
                      : `${post.title.slice(0, 25)}...`}
                  </h5>
                  <p className="card-text">
                    {post.body.length < 60
                      ? post.body
                      : `${post.body.slice(0, 100)}...`}
                  </p>
                  <Link to={`/posts/${post.id}`} className="btn btn-primary">
                    Read More
                  </Link>
                </div>
              </div>
            </div>
          ))}
          {posts.length > totalItemsShowing && (
            <div className="col-12">
              <button
                className="btn btn-primary mx-auto d-block"
                onClick={() => setTotalItemsShowing(totalItemsShowing + 10)}
              >
                Load More
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
