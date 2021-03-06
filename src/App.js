import axios from "axios";
import { useEffect, useState } from "react";
import { Route, Switch } from "react-router";
import { PostProvider } from "./context/PostContext";
import { UserProvider } from "./context/UserContext";
import HomePage from "./pages/HomePage";
import ProfilePage from "./pages/ProfilePage";
import SinglePostPage from "./pages/SinglePostPage";
import UsersPage from "./pages/UsersPage";
import SingleUserPage from "./pages/SingleUserPage";
import Layout from "./components/Layout";

function App() {
  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/posts")
      .then((res) => {
        setPosts([...res.data]);
      })
      .catch((err) => {
        console.log(err);
      });

    axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then((res) => {
        setUsers([...res.data]);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <Layout>
      <UserProvider value={{ users, setUsers }}>
        <PostProvider value={{ posts, setPosts }}>
          <Switch>
            <Route
              path="/users"
              exact
              render={(props) => <UsersPage {...props} />}
            />
            <Route
              path="/posts/:id"
              exact
              render={(props) => <SinglePostPage {...props} />}
            />
            <Route
              path="/profile"
              exact
              render={(props) => <ProfilePage {...props} />}
            />
            <Route
              path="/users/:id"
              exact
              render={(props) => <SingleUserPage {...props} />}
            />
            <Route path="/" exact render={(props) => <HomePage {...props} />} />
          </Switch>
        </PostProvider>
      </UserProvider>
    </Layout>
  );
}

export default App;
