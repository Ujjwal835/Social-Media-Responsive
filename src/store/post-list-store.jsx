import { useCallback, useState, useEffect } from "react";
import { createContext, useReducer } from "react";

//defining so that whenever used it can do auto complete
export const PostList = createContext({
  postList: [],
  fetching:false,
  addPost: () => { },
  deletePost: () => { },
});

const postListReducer = (currPostList, action) => {
  let newPostList = currPostList;
  if (action.type === "DELETE_POST") {
    newPostList = currPostList.filter(
      (post) => post.id !== action.payload.postId
    );
  } else if (action.type === "ADD_INITIAL_POSTS") {
    newPostList = action.payload.posts;
  } else if (action.type === "ADD_POST") {
    newPostList = [action.payload, ...currPostList];
  }
  return newPostList;
};

// Normal react component PostListProvider takes children and wraps it in PostList.provider and render it
const PostListProvider = ({ children }) => {
  const [postList, DispatchPostList] = useReducer(postListReducer, []);

  const [fetching, setFetching] = useState(false);



  const addPost = (post) => {
    DispatchPostList({
      type: "ADD_POST",
      payload: post,
    });
  };

  const addInitialPosts = (posts) => {
    DispatchPostList({
      type: "ADD_INITIAL_POSTS",
      payload: {
        posts,
      },
    });
  };

  //used call back here what happen is that whenever the parent gets repainted so do the child even though child has nothig to change which adds in more repainting thus to avoid that we use callback that help by saying if thereis change in child then only child should be repainted
  const deletePost = useCallback(
    (postId) => {
      DispatchPostList({
        type: "DELETE_POST",
        payload: {
          postId,
        },
      });
    },
    [DispatchPostList]
  );

  useEffect(() => {
    setFetching(true);

    //to clean up the api we are using abortcontroller
    const controller = new AbortController();
    const signal = controller.signal;

    fetch("https://dummyjson.com/posts", { signal })
      .then((res) => res.json())
      .then((data) => {
        addInitialPosts(data.posts);
        setFetching(false);
      });
    // this is the cleanup function means whenever this useffect or the call is getting murder then this cleanup will be called
    // cleaning up the api
    return () => {
      controller.abort();
    };
  }, []);

  return (
    <PostList.Provider
      value={{
        postList,
        fetching,
        addPost,
        deletePost,
      }}
    >
      {children}
    </PostList.Provider>
  );
};

export default PostListProvider;
