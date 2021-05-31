import axios from "axios";
import React from "react";

const SinglePostPage = ({ match }) => {
  const [post, setPost] = React.useState({});
  const [comments, setComments] = React.useState([]);

  React.useEffect(() => {
    axios
      .get(`https://jsonplaceholder.typicode.com/posts/${match.params.id}`)
      .then((res) => {
        setPost({ ...res.data });
      })
      .catch((err) => {
        console.log(err);
      });

    axios
      .get(
        `https://jsonplaceholder.typicode.com/posts/${match.params.id}/comments`
      )
      .then((res) => {
        setComments([...res.data]);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [match.params.id]);

  return (
    <div className="py-4">
      <div className="container">
        <div className="row">
          <div className="col-12 mb-3">
            <h3>Post</h3>
            <div className="card">
              <div className="card-body">
                <h4 className="card-title">{post.title}</h4>
                <p>{post.body}</p>
              </div>
            </div>
          </div>
          <div className="col-12">
            <h3>Comments</h3>
            {comments.map((comment) => (
              <div className="card mb-3" key={comment.id}>
                <div className="card-body">
                  <h5 className="card-title">{comment.name}</h5>
                  <h6 className="card-subtitle text-muted">{comment.email}</h6>
                  <p className="card-text">{comment.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SinglePostPage;
