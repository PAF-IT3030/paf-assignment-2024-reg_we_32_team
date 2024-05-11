import React, { useEffect, useState } from "react";
import ReactRoundedImage from "react-rounded-image";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import TextField from "@mui/material/TextField";
import Swal from "sweetalert2";
import MyPhoto from "../../assets/2.jpg";
import MealFeed from "../../components/meal/MealFeed";
import "./meals.css";

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
  const [mealName, setMealName] = useState("");
  const [mealDescription, setMealDescription] = useState("");
  const [isFilePicked, setIsFilePicked] = useState(false);
  const [meals, setMeals] = useState([]);

  const handleMealNameChange = (e) => {
    setMealName(e.target.value);
  };

  const handleMealDescriptionChange = (e) => {
    setMealDescription(e.target.value);
  };

  const uploadFileHandler = (e) => {
    setImage(e.target.files[0]);
    setIsFilePicked(true);
  };

  const handleLikeEvent = (event, index) => {
    getUserMeals();
  };

  const handleDelete = () => {
    getUserMeals();
  };

  useEffect(() => {
    getProfileData();
    getUserMeals();
  }, []);

  const handleMealSubmit = (event) => {
    event.preventDefault();

    if (!isFilePicked && mealDescription === "") {
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
      formData.append("mealName", mealName);
      formData.append("mealDescription", mealDescription);
      formData.append("image", image);
      const requestOptions = {
        method: "POST",
        body: formData,
      };
      fetch(`http://localhost:8082/api/v1/user/meals/${uid}`, requestOptions)
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
          getUserMeals();
          setImage("");
          setMealName("");
          setMealDescription("");
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

  async function getUserMeals() {
    const response = await fetch(
      `http://localhost:8082/api/v1/user/meals/${uid}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    setMeals(data);
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
            id="workout-name"
            label="Workout Name"
            type="text"
            fullWidth
            multiline
            maxRows={4}
            variant="outlined"
            name="workoutName"
            required
            value={mealName}
            onChange={handleMealNameChange}
          />
          <TextField
            autoFocus
            margin="dense"
            id="workout-description"
            label="Workout Description"
            type="text"
            fullWidth
            multiline
            maxRows={4}
            variant="outlined"
            name="workoutDescription"
            required
            value={mealDescription}
            onChange={handleMealDescriptionChange}
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
              onClick={handleMealSubmit}
            >
              Post
            </Button>
          </CardActions>
        </Card>

        {/* Show posts feed */}
        {meals.map((meal, index) => (
          <MealFeed
            data={meal}
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
