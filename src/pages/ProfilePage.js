import axios from "axios";
import React from "react";
import PostCard from "../components/PostCard";
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

  const handlePostUpdate = async (data, id) => {
    const oldData = [...posts];
    const newData = oldData.map((post) =>
      post.id === id ? { post, ...data } : post
    );

    try {
      setPosts([...newData]);
      await axios.put(`https://jsonplaceholder.typicode.com/posts/${id}`, data);
    } catch (err) {
      setPosts([...oldData]);
      console.log(err.message);
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
                <PostCard
                  key={post.id}
                  post={post}
                  onDeletePost={handleDeletePost}
                  onUpdate={handlePostUpdate}
                />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
