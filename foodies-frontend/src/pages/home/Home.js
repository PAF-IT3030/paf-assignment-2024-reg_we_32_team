import Typography from "@mui/material/Typography";
import React, { useEffect } from "react";
import PostFeed from "../../components/post/PostFeed";
import WorkoutFeed from "../../components/workout/WorkoutFeed";
import "./Home.css";

function Home() {
  const [posts, setPosts] = React.useState([]);
  const [workouts, setWorkouts] = React.useState([]);

  // Handle like post
  const handleLikeEventPost = (event, index) => {
    getAllPosts();
  };

  const handleLikeEventWorkout = (event, index) => {
    getAllWorkouts();
  };

  // Handle delete post
  const handleDeletePost = () => {
    getAllPosts();
  };

  const handleDeleteWorkout = () => {
    getAllWorkouts();
  };

  useEffect(() => {
    getAllPosts();
  }, []);

  useEffect(() => {
    getAllWorkouts();
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

  async function getAllWorkouts() {
    const response = await fetch(`http://localhost:8082/api/v1/user/workouts`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    setWorkouts([...data]);
    console.log(data);
  }

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

  async function getAllWorkouts() {
    const response = await fetch(`http://localhost:8082/api/v1/user/workouts`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    setWorkouts([...data]);
    console.log(data);
  }

  return (
    <div className="profile-wrapper">
      <div className="content-wrapper">
        <Typography variant="h4">Feed</Typography>
        {/* Show posts feed */}
        {posts.length > 0 ? (
          <div>
            {Array.from(posts).map((post, index) => (
              <PostFeed
                data={post}
                key={index}
                onLike={handleLikeEventPost}
                onDelete={handleDeletePost}
              />
            ))}
          </div>
        ) : (
          <Typography paragraph sx={{ m: 1 }}>
            No posts yet
          </Typography>
        )}


{workouts.length > 0 ? (
          <div>
            {Array.from(workouts).map((workout, index) => (
              <WorkoutFeed
                data={workout}
                key={index}
                onLike={handleLikeEventWorkout}
                onDelete={handleDeleteWorkout}
              />
            ))}
          </div>
        ) : (
          <Typography paragraph sx={{ m: 1 }}>
            No workouts yet
          </Typography>
        )}
      </div>
    </div>
  );
}

export default Home;
