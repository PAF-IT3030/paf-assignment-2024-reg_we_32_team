import React, { useEffect, useState } from "react";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import TextField from "@mui/material/TextField";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
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

  const WorkoutTemplates = [
    { id: 1, text: 'Ran [Distance] miles' },
    { id: 2, text: 'Completed [Number] pushups' },
    { id: 3, text: 'Lifted [Weight] lbs' },
  ];

  const [selectedTemplate, setSelectedTemplate] = useState('');
  const [postDescription, setPostDescription] = useState('');

  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [isFilePicked, setIsFilePicked] = useState(false);
  const [posts, setPosts] = useState([]);

  // Handle description change
  const handlePostChange = (e) => {
    setPostDescription(e.target.value);
  };
  
  const handleTemplateChange = (event) => {
    const selectedTemplate = event.target.value;
    setSelectedTemplate(selectedTemplate);
    setPostDescription(selectedTemplate);
  };

  // Handle image upload
  const uploadFileHandler = (e) => {
    setImage(e.target.files[0]);
    setIsFilePicked(true);
  };

  // Handle like post
  const handleLikeEvent = () => {
    getUserPosts();
  };

  // Handle delete post
  const handleDelete = () => {
    getUserPosts();
  };

  useEffect(() => {
    getProfileData();
    getUserPosts();
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
              text: "Post saved successfully",
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
    setPosts(data);
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
              <p className="followers-details">Followers 18M | Following 1M</p>
            </div>
          </div>
        </div>
        <FormControl fullWidth>
          <InputLabel id="workout-template-label">Select Workout Template</InputLabel>
          <Select
            labelId="workout-template-label"
            value={selectedTemplate}
            onChange={handleTemplateChange}
          >
            <MenuItem value="">None</MenuItem>
            {WorkoutTemplates.map((template) => (
              <MenuItem key={template.id} value={template.text}>
                {template.text}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Card sx={{ marginTop: "2em" }} className="post-card-wrapper">
          <TextField
            autoFocus
            margin="dense"
            id="post-description"
            label="Share your fitness achievement"
            type="text"
            fullWidth
            multiline
            maxRows={4}
            variant="outlined"
            name="postDescription"
            required
            value={postDescription}
            onChange={handlePostChange}
            placeholder="e.g. Ran 5 miles, completed 50 pushups, lifted 150 lbs, etc."
          />

          <CardActions sx={{ justifyContent: "space-between" }}>
            <div className="upload-btn-wrapper" style={{ display: "flex", alignItems: "center" }}>
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
        {posts.map((post, index) => (
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
