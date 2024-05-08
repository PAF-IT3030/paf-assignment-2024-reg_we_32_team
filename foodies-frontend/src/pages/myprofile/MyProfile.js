import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import React, { useEffect, useState } from "react";
import ReactRoundedImage from "react-rounded-image";
import { useLocation } from "react-router-dom";
import Swal from "sweetalert2";
import MyPhoto from "../../assets/profile.jpg";
import "./MyProfile.css";

function MyProfile(props) {
  const uid = localStorage.getItem("user_id");
  const role = localStorage.getItem("role");

  const location = useLocation();
  const [open, setOpen] = React.useState(false);

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    age: "",
    gender: "",
    email: "",
    username: "",
    role: "user",
  });

  const [user, setUser] = useState({
    firstName: data.firstName,
    lastName: data.lastName,
    age: data.age,
    gender: data.gender,
    email: data.email,
    username: data.username,
    role: "user",
  });

  const handleChange = (e) => {
    const value = e.target.value;
    setUser({ ...user, [e.target.name]: value });
  };

  const handleClickOpen = () => {
    setOpen(true);
    setUser({
      firstName: data.firstName,
      lastName: data.lastName,
      age: data.age,
      gender: data.gender,
      email: data.email,
      username: data.username,
      role: "user",
    });
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    getProfileData();
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    updateUser().then((data) => {
      if (data)
        Swal.fire({
          title: "Success!",
          text: "Profile updated successfully",
          icon: "success",
          showConfirmButton: false,
          timer: 3000,
        });
    });
  };

  // Get user profile data
  async function getProfileData(event) {
    var URL = "";
    if (role === "admin") {
      URL = `http://localhost:8082/api/v1/user/profile/${location.state.uid}`;
    }
    if (role === "user") {
      URL = `http://localhost:8082/api/v1/user/profile/${uid}`;
    }

    const response = await fetch(URL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    setData(data);
  }

  // Update user profile data
  async function updateUser(event) {
    const response = await fetch(
      `http://localhost:8082/api/v1/user/profile/${uid}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          username: user.username,
          gender: user.gender,
          age: user.age,
          role: "user",
        }),
      }
    );

    const jsonData = await response.json();
    if (jsonData.error) {
      Swal.fire({
        title: "Not Found!",
        text: "User does not exists",
        icon: "error",
        showConfirmButton: false,
        timer: 3000,
      });
      return false;
    }
    return jsonData;
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
            <div className="edit-profile-btn-wrapper">
              {role === "user" ? (
                <div>
                  <Button
                    style={{ textTransform: "capitalize" }}
                    onClick={handleClickOpen}
                  >
                    Edit Profile
                  </Button>
                </div>
              ) : null}
            </div>
          </div>
        </div>
        <div className="content-card-wrapper">
          <label>Name</label>
          <p>{data.firstName + " " + data.lastName}</p>
        </div>
        <div className="content-card-wrapper">
          <label>Age</label>
          <p>{data.age}</p>
        </div>
        <div className="content-card-wrapper">
          <label>Gender</label>
          <p>{data.gender}</p>
        </div>
        <div className="content-card-wrapper">
          <label>Email</label>
          <p>{data.email}</p>
        </div>
      </div>

      {/* Edit dialog form */}
      <Dialog open={open} onClose={handleClose} sx={{ zIndex: 1000 }}>
        <DialogTitle>Edit profile info</DialogTitle>
        <form onSubmit={handleSubmit}>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              id="firstName"
              label="First Name"
              type="text"
              fullWidth
              variant="outlined"
              name="firstName"
              required
              value={user.firstName}
              onChange={(e) => handleChange(e)}
            />
            <TextField
              autoFocus
              margin="dense"
              id="lastName"
              label="Last Name"
              type="text"
              fullWidth
              variant="outlined"
              name="lastName"
              required
              value={user.lastName}
              onChange={(e) => handleChange(e)}
            />
            <TextField
              autoFocus
              margin="dense"
              id="username"
              label="Username"
              type="text"
              fullWidth
              variant="outlined"
              name="username"
              required
              value={user.username}
              onChange={(e) => handleChange(e)}
            />
            <TextField
              autoFocus
              margin="dense"
              id="email"
              label="Email Address"
              type="email"
              fullWidth
              variant="outlined"
              name="email"
              required
              value={user.email}
              onChange={(e) => handleChange(e)}
            />
            <Box sx={{ minWidth: 120 }}>
              <FormControl fullWidth>
                <InputLabel id="gender-label">Gender</InputLabel>
                <Select
                  labelId="gender-label"
                  id="gender"
                  value={user.gender}
                  label="Gender"
                  name="gender"
                  onChange={(e) => handleChange(e)}
                  required
                >
                  <MenuItem value={"Male"}>Male</MenuItem>
                  <MenuItem value={"Female"}>Female</MenuItem>
                </Select>
              </FormControl>
            </Box>

            <TextField
              autoFocus
              margin="dense"
              id="age"
              label="Age"
              type="number"
              fullWidth
              variant="outlined"
              name="age"
              required
              value={user.age}
              onChange={(e) => handleChange(e)}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit">Update</Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}

export default MyProfile;
