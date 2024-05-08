import Typography from "@mui/material/Typography";
import React, { useEffect } from "react";
import PostFeed from "../../components/post/PostFeed";
import "./Home.css";

function Home() {
  const [posts, setPosts] = React.useState([]);

  // Handle like post
  const handleLikeEvent = (event, index) => {
    getAllPosts();
  };

  // Handle delete post
  const handleDelete = () => {
    getAllPosts();
  };

  useEffect(() => {
    getAllPosts();
  }, []);

  // Get all posts
  async function getAllPosts() {
    const response = await fetch(`http://localhost:8082/api/v1/user/posts`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    setPosts([...data]);
    console.log(data);
  }

  return (
    <div className="profile-wrapper">
      <div className="content-wrapper">
        <Typography variant="h4">Post Feed</Typography>
        {/* Show posts feed */}
        {posts.length > 0 ? (
          <div>
            {Array.from(posts).map((post, index) => (
              <PostFeed
                data={post}
                key={index}
                onLike={handleLikeEvent}
                onDelete={handleDelete}
              />
            ))}
          </div>
        ) : (
          <Typography paragraph sx={{ m: 1 }}>
            No posts yet
          </Typography>
        )}
      </div>
    </div>
  );
}

export default Home;
