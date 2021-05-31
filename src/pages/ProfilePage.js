import axios from "axios";
import React from "react";

const ProfilePage = () => {
  const [user, setUser] = React.useState({});

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

  return <div>Single User Profile Page</div>;
};

export default ProfilePage;
