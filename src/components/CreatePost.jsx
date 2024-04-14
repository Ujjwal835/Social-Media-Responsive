import { useContext, useRef } from "react";
import { PostList } from "../store/post-list-store";
import { useNavigate } from "react-router-dom";

export default function CreatePost() {
  const { addPost } = useContext(PostList);
  const navigate = useNavigate();

  const userIdElement = useRef();
  const postTitleElement = useRef();
  const postBodyElement = useRef();
  const reactionsElement = useRef();
  const tagsElement = useRef();

  const handleSubmit = (event) => {
    event.preventDefault();
    const userId = userIdElement.current.value;
    const postTitle = postTitleElement.current.value;
    const postBody = postBodyElement.current.value;
    const reactions = reactionsElement.current.value;
    const tags = tagsElement.current.value.split(" ");

    userIdElement.current.value = "";
    postTitleElement.current.value = "";
    postBodyElement.current.value = "";
    reactionsElement.current.value = "";
    tagsElement.current.value = "";

    fetch("https://dummyjson.com/posts/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: postTitle,
        body: postBody,
        reactions: reactions,
        userId: userId,
        tags: tags,
      }),
    })
      .then((res) => res.json())
      .then((post) => {
        addPost(post);
        navigate("/");
      });
  };

  return (
    <form className="create-post" onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="userId" className="form-label text-bg-side">
          User ID{" "}
        </label>
        <input
          type="text "
          ref={userIdElement}
          className="form-control"
          id="userId"
          placeholder="Enter Your User ID here"
        />
      </div>
      <div className="mb-3">
        <label htmlFor="title" className="form-label text-bg-side">
          Post Title
        </label>
        <input
          type="text "
          ref={postTitleElement}
          className="form-control"
          id="title"
          placeholder="How Are You Feeling Today ..."
        />
      </div>
      <div className="mb-3">
        <label htmlFor="body" className="form-label text-bg-side">
          Post Content
        </label>
        <textarea
          rows="4"
          type="text "
          ref={postBodyElement}
          className="form-control"
          id="body"
          placeholder="Tell us more about it..."
        />
      </div>
      <div className="mb-3">
        <label htmlFor="reactions" className="form-label text-bg-side">
          Number of Reactions{" "}
        </label>
        <input
          type="text "
          ref={reactionsElement}
          className="form-control"
          id="reactions"
          placeholder="How many people reacted to this post"
        />
      </div>

      <div className="mb-3">
        <label htmlFor="tags" className="form-label text-bg-side">
          Tags{" "}
        </label>
        <input
          type="text "
          ref={tagsElement}
          className="form-control"
          id="tags"
          placeholder="Enter your Hash tags here using space"
        />
      </div>

      <button type="submit" className="btn btn-primary">
        Post
      </button>
    </form>
  );
}
