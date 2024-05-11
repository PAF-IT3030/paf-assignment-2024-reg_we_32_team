import React, { useEffect, useState } from "react";
import ReactRoundedImage from "react-rounded-image";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import TextField from "@mui/material/TextField";
import Swal from "sweetalert2";
import MyPhoto from "../../assets/2.jpg";
import WorkoutFeed from "../../components/workout/WorkoutFeed";
import "./Workouts.css";

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
  const [workoutName, setWorkoutName] = useState("");
  const [workoutDescription, setWorkoutDescription] = useState("");
  const [isFilePicked, setIsFilePicked] = useState(false);
  const [workouts, setWorkouts] = useState([]);

  const handleWorkoutNameChange = (e) => {
    setWorkoutName(e.target.value);
  };

  const handleWorkoutDescriptionChange = (e) => {
    setWorkoutDescription(e.target.value);
  };

  const uploadFileHandler = (e) => {
    setImage(e.target.files[0]);
    setIsFilePicked(true);
  };

  const handleLikeEvent = (event, index) => {
    getUserWorkouts();
  };

  const handleDelete = () => {
    getUserWorkouts();
  };

  useEffect(() => {
    getProfileData();
    getUserWorkouts();
  }, []);

  const handleWorkoutSubmit = (event) => {
    event.preventDefault();

    if (!isFilePicked && workoutDescription === "") {
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
      formData.append("workoutName", workoutName);
      formData.append("workoutDescription", workoutDescription);
      formData.append("image", image);
      const requestOptions = {
        method: "POST",
        body: formData,
      };
      fetch(`http://localhost:8082/api/v1/user/workouts/${uid}`, requestOptions)
        .then(async (response) => {
          if (!response.ok) {
            throw new Error("Unable to upload workout");
          }
          Swal.fire({
            title: "Success!",
            text: "Workout saved successfully",
            icon: "success",
            showConfirmButton: false,
            timer: 3000,
          });
          getUserWorkouts();
          setImage("");
          setWorkoutName("");
          setWorkoutDescription("");
        })
        .catch((error) => {
          console.log(error);
          Swal.fire({
            title: "Upload error!",
            text: error.message,
            icon: "error",
            showConfirmButton: false,
            timer: 3000,
          });
        });
    }
  };

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

  async function getUserWorkouts() {
    const response = await fetch(
      `http://localhost:8082/api/v1/user/workouts/${uid}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    setWorkouts(data);
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
            id="meal-name"
            label="Meal Name"
            type="text"
            fullWidth
            multiline
            maxRows={4}
            variant="outlined"
            name="workoutName"
            required
            value={workoutName}
            onChange={handleWorkoutNameChange}
          />
          <TextField
            autoFocus
            margin="dense"
            id="meal-description"
            label="Meal Description"
            type="text"
            fullWidth
            multiline
            maxRows={4}
            variant="outlined"
            name="workoutDescription"
            required
            value={workoutDescription}
            onChange={handleWorkoutDescriptionChange}
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
              onClick={handleWorkoutSubmit}
            >
              Post
            </Button>
          </CardActions>
        </Card>

        {/* Show posts feed */}
        {workouts.map((workout, index) => (
          <WorkoutFeed
            data={workout}
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
