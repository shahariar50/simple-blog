import axios from "axios";
import React from "react";
import PostContext from "../context/PostContext";

const ProfilePage = () => {
  const [user, setUser] = React.useState({});
  const { posts, setPosts } = React.useContext(PostContext);

  React.useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/users/2")
      .then((res) => {
        setUser({ ...res.data });
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleDeletePost = async (id) => {
    const oldData = [...posts];
    const data = oldData.filter((post) => post.id !== id);

    try {
      setPosts([...data]);
      await axios.delete(`https://jsonplaceholder.typicode.com/posts/${id}`);
    } catch (err) {
      setPosts([...oldData]);
    }
  };

  return (
    <div className="py-4">
      <div className="container">
        <div className="row">
          <div className="col-12 mb-4">
            <h3>User Info</h3>
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
                  {user.address?.street}, {user.address?.suite},{" "}
                  {user.address?.city}, {user.address?.zipcode}
                </span>
              </div>
            </div>
          </div>
          <div className="col-12">
            <h3>User Posts</h3>
            {posts
              .filter((post) => post.userId === user.id)
              .map((post) => (
                <div className="card mb-3" key={post.id}>
                  <div className="card-body">
                    <h5 className="card-title">{post.title}</h5>
                    <p className="card-text">{post.body}</p>
                    <div
                      className="btn-group btn-group-sm"
                      role="group"
                      aria-label="Basic example"
                    >
                      <button type="button" className="btn btn-primary">
                        Update
                      </button>
                      <button
                        type="button"
                        className="btn btn-danger"
                        onClick={() => handleDeletePost(post.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
