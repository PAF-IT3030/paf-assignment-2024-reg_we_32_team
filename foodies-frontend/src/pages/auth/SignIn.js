import React, { useState } from "react";
import backgroundImg from "../../assets/sign_in_background.png";
import "./SignIn.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import userService from "../../services/user.service";

function SignIn() {
  const [user, setUser] = useState({
    username: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const value = e.target.value;
    setUser({ ...user, [e.target.name]: value });
  };

  const login = (e) => {
    e.preventDefault();
    userService
      .login(user)
      .then((res) => {
        console.log(res.data);
        if (res.data.status == "404") {
          Swal.fire({
            title: "Not Found!",
            text: "User does not exists",
            icon: "error",
            showConfirmButton: false,
            timer: 3000,
          });
        } else if (res.data.status == "13") {
          Swal.fire({
            title: "Error!",
            text: "Invalid username or password",
            icon: "error",
            showConfirmButton: false,
            timer: 3000,
          });
        } else if (res.data.status == "200") {
          localStorage.setItem("user_id", res.data.id);
          localStorage.setItem("role", res.data.role);
          if (res.data.role == "admin") {
            navigate("/admin/dashboard");
          } else {
            navigate("/user/home");
          }
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="wrapper">
      <div className="form-wrapper">
        <form className="form-container">
          <input
            type="text"
            id="username"
            name="username"
            placeholder="Username"
            value={user.username}
            onChange={(e) => handleChange(e)}
          ></input>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Password"
            value={user.password}
            onChange={(e) => handleChange(e)}
          ></input>
          <label className="forgot-pass-text">
            Forget <span>Password</span>?
          </label>

          <button className="signin-btn" onClick={login}>
            Sign in
          </button>
          <Link className="signup-label" to="/sign-up">
            New? Sign up
          </Link>
        </form>
      </div>

      <div className="background-wrapper">
        <img src={backgroundImg} alt="background" />
      </div>
    </div>
  );
}

export default SignIn;
