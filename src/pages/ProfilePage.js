import axios from "axios";
import React from "react";
import PostCard from "../components/PostCard";
import PostContext from "../context/PostContext";
import UserInfoCard from "./Profile/UserInfoCard";

const ProfilePage = () => {
  const [user, setUser] = React.useState({});
  const [isAddingNew, setIsAddingNew] = React.useState(false);
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

  const hangleNewPostSubmit = async (e) => {
    e.preventDefault();
    const obj = {
      title: e.target.title.value,
      userId: 2,
      body: e.target.body.value,
    };
    const oldPosts = [...posts];

    axios
      .post("https://jsonplaceholder.typicode.com/posts", obj)
      .then((res) => {
        setPosts([res.data, ...posts]);
        setIsAddingNew(false);
      })
      .catch((err) => {
        setPosts([...oldPosts]);
        console.log(err.message);
      });
  };

  return (
    <div className="py-4">
      <div className="container">
        <div className="row">
          <div className="col-12 mb-4">
            <h3>User Info</h3>
            <UserInfoCard user={user} />
          </div>
          <div className="col-12">
            <div className="d-flex align-items-center justify-content-between mb-3">
              <h3>User Posts</h3>
              {!isAddingNew && (
                <button
                  className="btn btn-primary"
                  onClick={() => setIsAddingNew(true)}
                >
                  Add New Post
                </button>
              )}
            </div>
            {isAddingNew && (
              <div className="card mb-3">
                <div className="card-body">
                  <h4>Add New Post</h4>
                  <form onSubmit={hangleNewPostSubmit}>
                    <div className="form-group">
                      <input
                        type="text"
                        name="title"
                        placeholder="Title"
                        className="form-control"
                      />
                    </div>
                    <div className="form-group">
                      <textarea
                        name="body"
                        placeholder="Write main article here..."
                        className="form-control"
                        rows={6}
                      />
                    </div>
                    <div
                      className="btn-group"
                      role="group"
                      aria-label="Basic example"
                    >
                      <button type="submit" className="btn btn-primary">
                        Submit
                      </button>
                      <button
                        type="button"
                        className="btn btn-danger"
                        onClick={() => setIsAddingNew(false)}
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
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
