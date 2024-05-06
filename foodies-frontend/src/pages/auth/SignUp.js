import React, { useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import backgroundImg from "../../assets/sign_in_background.png";
import userService from "../../services/user.service";
import "./SignUp.css";

function SignUp() {
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    age: "",
    gender: "",
    email: "",
    username: "",
    password: "",
    role: "user",
  });

  const [confirmPass, setConfirmPassword] = useState({
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const value = e.target.value;
    setUser({ ...user, [e.target.name]: value });
  };

  const handleConfirmPassword = (e) => {
    const value = e.target.value;
    setConfirmPassword({ ...confirmPass, [e.target.name]: value });
  };

  const RegisterUser = (e) => {
    e.preventDefault();
    console.log(user);
    if (user.password !== confirmPass.confirmPassword) {
      Swal.fire({
        title: "Error!",
        text: "Passwords do not match",
        icon: "error",
        showConfirmButton: false,
        timer: 3000,
      });
    } else {
      userService
        .saveUser(user)
        .then((res) => {
          console.log("User Added Successfully");
          Swal.fire({
            title: "Success!",
            text: "User registered successfully",
            icon: "success",
            showConfirmButton: false,
            timer: 3000,
          });
          setUser({
            firstName: "",
            lastName: "",
            age: "",
            gender: "",
            email: "",
            username: "",
            password: "",
            role: "user",
          });
          setConfirmPassword({
            confirmPassword: "",
          });
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <div className="wrapper">
      <div className="form-wrapper">
        <form className="form-container" onSubmit={(e) => RegisterUser(e)}>
          <input
            type="text"
            id="firstname"
            name="firstName"
            placeholder="First Name"
            required
            value={user.firstName}
            onChange={(e) => handleChange(e)}
          ></input>

          <input
            type="text"
            id="lastname"
            name="lastName"
            placeholder="Last Name"
            required
            value={user.lastName}
            onChange={(e) => handleChange(e)}
          ></input>

          <input
            type="number"
            id="age"
            name="age"
            placeholder="Age"
            required
            max={80}
            min={16}
            value={user.age}
            onChange={(e) => handleChange(e)}
          ></input>
          {/*
          <select
            value={genders}
            required
            onChange={(e) => setGender(e.target.value)}
          >
            <option>Select gender</option>
            <option>Male</option>
            <option>Female</option>
          </select> */}
          <input
            type="text"
            id="gender"
            name="gender"
            placeholder="Gender"
            required
            value={user.gender}
            onChange={(e) => handleChange(e)}
          ></input>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Email"
            required
            value={user.email}
            onChange={(e) => handleChange(e)}
          ></input>
          <input
            type="text"
            id="username"
            name="username"
            placeholder="Username"
            required
            value={user.username}
            onChange={(e) => handleChange(e)}
          ></input>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Password"
            required
            value={user.password}
            onChange={(e) => handleChange(e)}
          ></input>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            placeholder="Confirm Password"
            required
            value={confirmPass.confirmPassword}
            onChange={(e) => handleConfirmPassword(e)}
          ></input>

          <button className="signup-btn">Sign up</button>

          <Link className="signin-label" to="/sign-in">
            Sign in here
          </Link>
        </form>
      </div>

      <div className="background-wrapper">
        <img src={backgroundImg} alt="background" />
      </div>
    </div>
  );
}

export default SignUp;
