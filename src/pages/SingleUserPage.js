import axios from "axios";
import _ from "lodash";
import React from "react";
import Pagination from "../components/Pagination";
import PostContext from "../context/PostContext";
import UserDetails from "./SingleUserPage/UserDetails";
import UsersPost from "./SingleUserPage/UsersPost";

const SingleUserPage = ({ match }) => {
  const [user, setUser] = React.useState({});
  const [currentPage, setCurrentPage] = React.useState(1);
  const { posts } = React.useContext(PostContext);

  React.useEffect(() => {
    (async () => {
      const { data } = await axios.get(
        `https://jsonplaceholder.typicode.com/users/${match.params.id}`
      );
      setUser(data);
    })();
  }, [match.params.id]);

  const usersPost = posts.filter((post) => post.userId === user.id);

  const fiteredPginatedUsers = _(usersPost)
    .slice((currentPage - 1) * 3)
    .take(3)
    .value();
  return (
    <div className="container">
      <div className="row">
        <div className="col-12 mb-4">
          <h3>User Info</h3>
          <UserDetails user={user} />
        </div>
        <div className="col-12 mb-4">
          <h3>User Posts</h3>
          <div className="row">
            {fiteredPginatedUsers.map((post) => (
              <div className="col-4">
                <UsersPost post={post} />
              </div>
            ))}
          </div>
        </div>
        <div className="col-12">
          <Pagination
            setCurrentPage={setCurrentPage}
            currentPage={currentPage}
            itemsPerPage={3}
            totalItems={usersPost.length}
          />
        </div>
      </div>
    </div>
  );
};

export default SingleUserPage;
