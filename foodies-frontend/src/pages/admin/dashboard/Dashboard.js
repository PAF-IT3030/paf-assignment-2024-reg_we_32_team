import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import RestoreFromTrashIcon from "@mui/icons-material/RestoreFromTrash";
import {
  Box,
  Button,
  Divider,
  FormControl,
  InputLabel,
  List,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import ListItem from "@mui/material/ListItem";
import Typography from "@mui/material/Typography";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "./Dashboard.css";

export default function Dashboard() {
  const uid = localStorage.getItem("user_id");

  const [totalAccountsCount, setTotalAccountsCount] = React.useState(0);
  const [totalPostsCount, setTotalPostsCount] = React.useState(0);
  const [allUsers, setAllUsers] = React.useState([]);
  const [allAdmins, setAllAdmins] = React.useState([]);

  React.useEffect(() => {
    getTotalPostsCount();
    getTotalAccountsCount();
    getAllUsers();
    getAllAdmins();
  }, []);

  const handleDeleteAccount = (id) => {
    deleteAccount(id);
    getAllUsers();
    getTotalAccountsCount();
  };

  const [open, setOpen] = React.useState(false);

  const [admin, setadmin] = useState({
    firstName: "",
    lastName: "",
    age: "",
    gender: "",
    email: "",
    username: "",
    password: "",
    role: "admin",
  });

  const handleChange = (e) => {
    const value = e.target.value;
    setadmin({ ...admin, [e.target.name]: value });
  };

  const [confirmPass, setConfirmPassword] = useState({
    confirmPassword: "",
  });

  const handleConfirmPassword = (e) => {
    const value = e.target.value;
    setConfirmPassword({ ...confirmPass, [e.target.name]: value });
  };

  const [addOrEditAdmin, setAddOrEditAdmin] = useState({
    addOrEdit: "",
  });

  const [editAdminId, setEditAdminId] = useState("");

  const handleClickOpen = (adminData, addOrEdit) => {
    if (addOrEdit === "edit") {
      setEditAdminId(adminData.id);
      setAddOrEditAdmin({ addOrEdit: "edit" });
      setadmin({
        firstName: adminData.firstName,
        lastName: adminData.lastName,
        age: adminData.age,
        gender: adminData.gender,
        email: adminData.email,
        username: adminData.username,
        role: "admin",
      });
      setOpen(true);
    } else {
      setAddOrEditAdmin({ addOrEdit: "add" });
      setadmin({
        firstName: "",
        lastName: "",
        age: "",
        gender: "",
        email: "",
        username: "",
        password: "",
        role: "admin",
      });

      setConfirmPassword({
        confirmPassword: "",
      });
      setOpen(true);
    }
  };

  const handleClose = () => {
    setOpen(false);
    getAllAdmins();
  };

  const navigate = useNavigate();
  const handleGotoProfile = (id) => {
    navigate("/admin/profiles", {
      state: {
        uid: id,
      },
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (addOrEditAdmin.addOrEdit === "add") {
      addAdmin().then((data) => {
        if (data)
          Swal.fire({
            title: "Success!",
            text: "Admin saved successfully",
            icon: "success",
            showConfirmButton: false,
            timer: 3000,
          });
      });
    } else {
      editAdmin().then((data) => {
        if (data)
          Swal.fire({
            title: "Success!",
            text: "Admin updated successfully",
            icon: "success",
            showConfirmButton: false,
            timer: 3000,
          });
      });
    }
    getAllAdmins();
  };

  // Add admin info
  async function addAdmin(event) {
    if (admin.password !== confirmPass.confirmPassword) {
      Swal.fire({
        title: "Error!",
        text: "Passwords do not match",
        icon: "error",
        showConfirmButton: false,
        timer: 3000,
      });
    } else {
      const response = await fetch(`http://localhost:8082/api/v1/user/save`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName: admin.firstName,
          lastName: admin.lastName,
          email: admin.email,
          username: admin.username,
          gender: admin.gender,
          age: admin.age,
          password: admin.password,
          role: "admin",
        }),
      });

      const jsonData = await response.json();
      if (jsonData.error) {
        Swal.fire({
          title: "Not Found!",
          text: "Admin does not exists",
          icon: "error",
          showConfirmButton: false,
          timer: 3000,
        });
        return false;
      }
      return jsonData;
    }
  }

  // Update admin info
  async function editAdmin(event) {
    const response = await fetch(
      `http://localhost:8082/api/v1/user/profile/${editAdminId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName: admin.firstName,
          lastName: admin.lastName,
          email: admin.email,
          username: admin.username,
          gender: admin.gender,
          age: admin.age,
        }),
      }
    );

    const jsonData = await response.json();
    if (jsonData.error) {
      Swal.fire({
        title: "Not Found!",
        text: "Admin does not exists",
        icon: "error",
        showConfirmButton: false,
        timer: 3000,
      });
      return false;
    }
    return jsonData;
  }

  // Get total accounts counts
  async function getTotalAccountsCount() {
    const response = await fetch(
      `http://localhost:8082/api/v1/user/accounts/count`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    setTotalAccountsCount(data);
  }

  // Get total posts count
  async function getTotalPostsCount() {
    const response = await fetch(
      `http://localhost:8082/api/v1/user/posts/count`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    setTotalPostsCount(data);
  }

  // Get user accounts
  async function getAllUsers() {
    const response = await fetch(
      `http://localhost:8082/api/v1/user/profiles/`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    setAllUsers(data);
  }

  // Get admin accounts
  async function getAllAdmins() {
    const response = await fetch(
      `http://localhost:8082/api/v1/user/admin/profiles`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    setAllAdmins(data);
  }

  //Delete account
  async function deleteAccount(userId) {
    const response = await fetch(
      `http://localhost:8082/api/v1/user/account/${userId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    if (response.ok) {
      Swal.fire({
        title: "Success!",
        text: "Account deleted successfully",
        icon: "success",
        showConfirmButton: false,
        timer: 3000,
      });
      return false;
    } else {
      Swal.fire({
        title: "Error",
        text: "Cannot delete account",
        icon: "error",
        showConfirmButton: false,
        timer: 3000,
      });
      return false;
    }
  }

  return (
    <div className="dashboard-wrapper">
      <div className="dashboard-content-wrapper">
        <div className="total-cards-wrapper">
          <Card sx={{ minWidth: 300 }}>
            <CardContent>
              <Typography variant="h5" component="div">
                Total Accounts {totalAccountsCount}
              </Typography>
            </CardContent>
          </Card>
          <Card sx={{ minWidth: 300 }}>
            <CardContent>
              <Typography variant="h5" component="div">
                Total Posts {totalPostsCount}
              </Typography>
            </CardContent>
          </Card>
        </div>

        <CardContent sx={{ marginTop: "2em" }}>
          <Button sx={{ textTransform: "capitalize" }}>View Profiles</Button>
          {/* Show comments list */}
          {allUsers.length > 0 ? (
            <List>
              {Array.from(allUsers).map((data, index) => (
                <div key={index}>
                  <ListItem
                    sx={{
                      justifyContent: "space-between",
                    }}
                  >
                    <Typography>
                      {data.firstName + " " + data.lastName}
                    </Typography>
                    <Button
                      sx={{
                        color: "black",
                        backgroundColor: "white",
                        textTransform: "capitalize",
                        ":hover": {
                          backgroundColor: "grey",
                        },
                      }}
                      startIcon={<ManageAccountsIcon sx={{ color: "black" }} />}
                      variant="contained"
                      onClick={() => handleGotoProfile(data.id)}
                    >
                      Go to Profile
                    </Button>
                    <Button
                      sx={{
                        color: "black",
                        backgroundColor: "white",
                        textTransform: "capitalize",
                        ":hover": {
                          backgroundColor: "red",
                        },
                      }}
                      startIcon={<RestoreFromTrashIcon />}
                      variant="contained"
                      onClick={() => handleDeleteAccount(data.id, data.role)}
                    >
                      Delete Account
                    </Button>
                  </ListItem>
                  <Divider />
                </div>
              ))}
            </List>
          ) : (
            <Typography paragraph sx={{ m: 1 }}>
              No profiles yet.
            </Typography>
          )}
        </CardContent>

        <CardContent sx={{ marginTop: "2em" }}>
          <Button
            sx={{ textTransform: "capitalize" }}
            onClick={() => handleClickOpen(null, "add")}
          >
            Add Admins
          </Button>
          {/* Show comments list */}
          {allAdmins.length > 0 ? (
            <List>
              {Array.from(allAdmins).map((data, index) => (
                <div key={index}>
                  <ListItem sx={{ justifyContent: "space-between" }}>
                    <Typography>
                      {data.firstName + " " + data.lastName}
                    </Typography>
                    <Button
                      sx={{
                        color: "black",
                        backgroundColor: "white",
                        textTransform: "capitalize",
                        ":hover": {
                          backgroundColor: "grey",
                        },
                      }}
                      startIcon={<ManageAccountsIcon sx={{ color: "black" }} />}
                      variant="contained"
                      onClick={() => handleClickOpen(data, "edit")}
                    >
                      Edit details
                    </Button>
                    <Button
                      sx={{
                        color: "black",
                        backgroundColor: "white",
                        textTransform: "capitalize",
                        ":hover": {
                          backgroundColor: "red",
                        },
                      }}
                      startIcon={<RestoreFromTrashIcon />}
                      variant="contained"
                      onClick={() => handleDeleteAccount(data.id)}
                    >
                      Delete
                    </Button>
                  </ListItem>
                  <Divider />
                </div>
              ))}
            </List>
          ) : (
            <Typography paragraph sx={{ m: 1 }}>
              No profiles yet.
            </Typography>
          )}
        </CardContent>
      </div>

      {/* Add/update admin form */}
      <Dialog open={open} onClose={handleClose} sx={{ zIndex: 1000 }}>
        {addOrEditAdmin.addOrEdit === "edit" ? (
          <div>
            <DialogTitle>Edit admin info</DialogTitle>
          </div>
        ) : (
          <div>
            <DialogTitle>Add admin info</DialogTitle>
          </div>
        )}
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
              value={admin.firstName}
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
              value={admin.lastName}
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
              value={admin.username}
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
              value={admin.email}
              onChange={(e) => handleChange(e)}
            />
            <Box sx={{ minWidth: 120 }}>
              <FormControl fullWidth>
                <InputLabel id="gender-label">Gender</InputLabel>
                <Select
                  labelId="gender-label"
                  id="gender"
                  value={admin.gender}
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
              value={admin.age}
              onChange={(e) => handleChange(e)}
            />
            {addOrEditAdmin.addOrEdit === "add" ? (
              <div>
                <TextField
                  autoFocus
                  margin="dense"
                  id="password"
                  label="Password"
                  type="password"
                  fullWidth
                  variant="outlined"
                  name="password"
                  required
                  value={admin.password}
                  onChange={(e) => handleChange(e)}
                />
                <TextField
                  autoFocus
                  margin="dense"
                  id="confirmPassword"
                  label="Confirm Password"
                  type="password"
                  fullWidth
                  variant="outlined"
                  name="confirmPassword"
                  required
                  value={confirmPass.confirmPassword}
                  onChange={(e) => handleConfirmPassword(e)}
                />
              </div>
            ) : null}
          </DialogContent>

          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            {addOrEditAdmin.addOrEdit === "edit" ? (
              <div>
                <Button type="submit" name="update">
                  Update
                </Button>
              </div>
            ) : (
              <div>
                <Button type="submit" name="add">
                  Add
                </Button>
              </div>
            )}
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}
