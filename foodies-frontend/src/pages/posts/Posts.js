import PhotoCamera from "@mui/icons-material/PhotoCamera";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import TextField from "@mui/material/TextField";
import React, { useEffect, useState } from "react";
import ReactRoundedImage from "react-rounded-image";
import Swal from "sweetalert2";
import MyPhoto from "../../assets/profile.jpg";
import PostFeed from "../../components/post/PostFeed";
import "./Posts.css";

function MyProfile() {
  const uid = localStorage.getItem("user_id");

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    age: "",
    gender: "",
    email: "",
    username: "",
    role: "",
  });

  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [isFilePicked, setIsFilePicked] = useState(false);
  const [posts, setPosts] = React.useState({
    id: "",
    postDescription: "",
    image: "",
    likes: "",
  });

  // Handle description change
  const handlePostChange = (e) => {
    setDescription(e.target.value);
  };

  // Handle image upload
  const uploadFileHandler = (e) => {
    setImage(e.target.files[0]);
    setIsFilePicked(true);
  };

  // Handle like post
  const handleLikeEvent = (event, index) => {
    getUserPosts();
  };

  // Handle delete post
  const handleDelete = () => {
    getUserPosts();
  };

  useEffect(() => {
    getProfileData();
    getUserPosts();
    // getUserLikes();
    // combineData();
  }, []);

  //Handle Post submit
  const handlePostSubmit = (event) => {
    event.preventDefault();

    if (!isFilePicked && description === "") {
      Swal.fire({
        title: "Upload error!",
        text: "Please select an image or enter a description",
        icon: "error",
        showConfirmButton: false,
        timer: 3000,
      });
      return false;
    } else {
      // console.log(post.postImage.split("base64,")[1]);
      const formData = new FormData();
      formData.append("postDescription", description);
      formData.append("image", image);
      const requestOptions = {
        method: "POST",
        body: formData,
      };
      fetch(`http://localhost:8082/api/v1/user/posts/${uid}`, requestOptions)
        .then(async (response) => {
          const isJson = response.headers
            .get("content-type")
            ?.includes("application/json");
          const data = isJson && (await response.json());
          if (!response.ok) {
            Swal.fire({
              title: "Upload error!",
              text: "Unable to upload post",
              icon: "error",
              showConfirmButton: false,
              timer: 3000,
            });
          } else {
            Swal.fire({
              title: "Success!",
              text: "Post save successfully",
              icon: "success",
              showConfirmButton: false,
              timer: 3000,
            });
          }
          getUserPosts();
          setImage("");
          setDescription("");
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };
  // Get user profile data
  async function getProfileData() {
    const response = await fetch(
      `http://localhost:8082/api/v1/user/profile/${uid}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    setData(data);
  }

  // Get user posts
  async function getUserPosts() {
    const response = await fetch(
      `http://localhost:8082/api/v1/user/posts/${uid}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    setPosts([...data]);
  }

  return (
    <div className="profile-wrapper">
      <div className="content-wrapper">
        <div className="profile-card-wrapper">
          <div className="profile-card-header">
            <ReactRoundedImage
              image={MyPhoto}
              roundedSize="0"
              imageWidth="140"
              imageHeight="140"
            />
            <div className="profile-card-details">
              <p className="user-name">{data.username}</p>
              <p className="followers-details ">Followers 18M | Following 1M</p>
            </div>
          </div>
        </div>

        <Card sx={{ marginTop: "2em" }} className="post-card-wrapper">
          <TextField
            autoFocus
            margin="dense"
            id="post-description"
            label="Post Description"
            type="text"
            fullWidth
            multiline
            maxRows={4}
            variant="outlined"
            name="postDescription"
            required
            value={description}
            onChange={(e) => handlePostChange(e)}
          />

          <CardActions sx={{ justifyContent: "space-between" }}>
            <div
              className="upload-btn-wrapper"
              style={{ display: "flex", alignItems: "center" }}
            >
              <Button
                variant="contained"
                component="label"
                startIcon={<PhotoCamera />}
              >
                Upload
                <input
                  filename={image}
                  hidden
                  accept="image/*"
                  multiple
                  type="file"
                  onChange={uploadFileHandler}
                />
              </Button>
              {isFilePicked ? (
                <div>
                  <p>{image.name}</p>
                </div>
              ) : null}
            </div>
            <Button
              variant="contained"
              component="label"
              onClick={handlePostSubmit}
            >
              Post
            </Button>
          </CardActions>
        </Card>

        {/* Show posts feed */}
        {Array.from(posts).map((post, index) => (
          <PostFeed
            data={post}
            key={index}
            onLike={handleLikeEvent}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  );
}

export default MyProfile;
