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
import "./Style.css";

export default function WorkoutPlan() {
    const uid = localStorage.getItem("user_id");

    const [data, setData] = useState({
        username: "",
    });

    const [image, setImage] = useState("");
    const [isFilePicked, setIsFilePicked] = useState(false);
    const [workoutPlan, setWorkoutPlan] = useState("");
    const [routine, setRoutine] = useState("");
    const [exercise, setExercise] = useState("");
    const [sets, setSets] = useState("");
    const [repetitions, setRepetitions] = useState("");
    const [posts, setPosts] = useState([]);

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
    }, []);

    // Handle Post submit
    const handlePostSubmit = (event) => {
        event.preventDefault();

        if (!isFilePicked) {
            Swal.fire({
                title: "Upload error!",
                text: "Please select an image",
                icon: "error",
                showConfirmButton: false,
                timer: 3000,
            });
            return false;
        } else {
            const formData = new FormData();
            formData.append("image", image);
            formData.append("workoutPlan", workoutPlan);
            formData.append("routine", routine);
            formData.append("exercise", exercise);
            formData.append("sets", sets);
            formData.append("repetitions", repetitions);

            const requestOptions = {
                method: "POST",
                body: formData,
            };
            fetch(`http://localhost:8082/api/v1/user/posts/${uid}`, requestOptions)
                .then(async (response) => {
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
                    setWorkoutPlan("");
                    setRoutine("");
                    setExercise("");
                    setSets("");
                    setRepetitions("");
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    };

    // Get user profile data
    async function getProfileData() {
        const response = await fetch(`http://localhost:8082/api/v1/user/profile/${uid}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
        const data = await response.json();
        setData(data);
    }

    // Get user posts
    async function getUserPosts() {
        const response = await fetch(`http://localhost:8082/api/v1/user/posts/${uid}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
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
                            <p className="followers-details ">Followers 18M | Following 1M</p>
                        </div>
                    </div>
                </div>

                <Card sx={{ marginTop: "2em" }} className="post-card-wrapper">

                    {/* New input fields for workout details */}
                    <TextField
                        margin="dense"
                        id="workout-plan"
                        label="Workout Plan"
                        type="text"
                        fullWidth
                        variant="outlined"
                        name="workoutPlan"
                        value={workoutPlan}
                        onChange={(e) => setWorkoutPlan(e.target.value)}
                    />

                    <TextField
                        margin="dense"
                        id="routine"
                        label="Routine"
                        type="text"
                        fullWidth
                        variant="outlined"
                        name="routine"
                        value={routine}
                        onChange={(e) => setRoutine(e.target.value)}
                    />

                    <TextField
                        margin="dense"
                        id="exercise"
                        label="Exercise"
                        type="text"
                        fullWidth
                        variant="outlined"
                        name="exercise"
                        value={exercise}
                        onChange={(e) => setExercise(e.target.value)}
                    />

                    <TextField
                        margin="dense"
                        id="sets"
                        label="Sets"
                        type="number"
                        fullWidth
                        variant="outlined"
                        name="sets"
                        value={sets}
                        onChange={(e) => setSets(e.target.value)}
                    />

                    <TextField
                        margin="dense"
                        id="repetitions"
                        label="Repetitions"
                        type="number"
                        fullWidth
                        variant="outlined"
                        name="repetitions"
                        value={repetitions}
                        onChange={(e) => setRepetitions(e.target.value)}
                    />
                    {/* End of new input fields */}

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
