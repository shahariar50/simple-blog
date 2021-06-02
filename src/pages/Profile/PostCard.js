import React from "react";

const PostCard = ({ post, onDeletePost, onUpdate }) => {
  const [postForm, setPostForm] = React.useState({ userId: post.userId });
  const [isUpdating, setIsUpdating] = React.useState(false);

  // Setting post data to post state on load
  React.useEffect(() => {
    setPostForm({ ...post });
  }, [post]);

  // Updating the fields data dynamically
  const handleInputChange = (e) => {
    setPostForm({ ...postForm, [e.target.name]: e.target.value });
  };

  return (
    <div className="card mb-3" key={post.id}>
      <div className="card-body">
        {postForm && isUpdating && (
          <>
            <div className="form-group">
              <input
                type="text"
                name="title"
                placeholder="Title"
                value={postForm.title ? postForm.title : ""}
                className="form-control"
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <textarea
                name="body"
                placeholder="Write main article here..."
                value={postForm.body ? postForm.body : ""}
                className="form-control"
                rows={6}
                onChange={handleInputChange}
              />
            </div>
          </>
        )}
        {/* This code will execute when user click the edit button */}
        {!isUpdating && (
          <>
            <h5 className="card-title">{post.title}</h5>
            <p className="card-text">{post.body}</p>
          </>
        )}
        <div
          className="btn-group btn-group-sm"
          role="group"
          aria-label="Basic example"
        >
          {isUpdating && (
            <>
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => {
                  onUpdate(postForm, post.id);
                  setIsUpdating(false);
                }}
              >
                Save
              </button>
              <button
                type="button"
                className="btn btn-danger"
                onClick={() => setIsUpdating(false)}
              >
                Cancel
              </button>
            </>
          )}
          {!isUpdating && (
            <>
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => setIsUpdating(true)}
              >
                Edit
              </button>
              <button
                type="button"
                className="btn btn-danger"
                onClick={() => onDeletePost(post.id)}
              >
                Delete
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default PostCard;
