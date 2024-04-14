import { useEffect, useState } from "react";
import Post from "./Post";
import { useContext } from "react";
import { PostList as PostListData } from "../store/post-list-store";
import WelcomeMessage from "./WelcomeMessage";
import LoadingSpinner from "./LoadingSpinner";

export default function PostList() {
    const { postList, fetching } = useContext(PostListData);
    

    //   automatically loading the dummy post using state management useState
    //   const [dataFetched, setDataFetched] = useState(false);

    //   if (!dataFetched) {
    //     fetch("https://dummyjson.com/posts")
    //       .then((res) => res.json())
    //       .then((data) => {
    //         addInitialPosts(data.posts);
    //       });
    //     setDataFetched(true);
    //   }

    return (
        <div>
            {fetching && <LoadingSpinner />}
            {!fetching && postList.length === 0 && <WelcomeMessage />}
            <div className="middle-section-middle">

                {!fetching && postList.map((post) => <Post key={post.id} post={post} />)}
            </div>
        </div>
    );
}
