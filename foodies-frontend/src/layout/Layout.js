import React from "react";
import ReactRoundedImage from "react-rounded-image";
import { Link, Outlet } from "react-router-dom";
import followers from "../assets/followers.png";
import home from "../assets/home.png";
import LogoutBtn from "../assets/logout_btn.png";
import posts from "../assets/posts.png";
import MyPhoto from "../assets/profile.jpg";
import profile from "../assets/profile.png";
import search from "../assets/search.png";
import "./Layout.css";

const handleLogout = () => {
  localStorage.removeItem("user_id");
  localStorage.removeItem("role");
  window.location.href = "/";
};
function Layout() {
  const role = localStorage.getItem("role");

  return (
    <div className="main-wrapper">
      <div className="nav-wrapper">
        <nav className="nav-container">
          <ul>
            <div className="home">
              {role === "admin" ? (
                <Link to="/admin/dashboard" className="link">
                  <img src={home} alt="dashboard" />
                  Dashboard
                </Link>
              ) : (
                <Link to="/user/home" className="link">
                  <img src={home} alt="home" />
                  Home
                </Link>
              )}
            </div>
            <div className="followers">
              {role === "admin" ? (
                <Link className="link">
                  <img src={profile} alt="profiles" />
                  Profiles
                </Link>
              ) : (
                <Link to="/user/followers" className="link">
                  <img src={followers} alt="followers" />
                  Followers
                </Link>
              )}
            </div>
            <div className="posts">
              {role === "admin" ? (
                <Link to="/admin/posts" className="link">
                  <img src={posts} alt="posts" />
                  Posts
                </Link>
              ) : (
                <Link to="/user/posts" className="link">
                  <img src={posts} alt="posts" />
                  Posts
                </Link>
              )}
            </div>
            <div className="profile">
              {role === "admin" ? null : (
                <Link to="/user/myprofile" className="link">
                  <img src={profile} alt="profile" />
                  My Profile
                </Link>
              )}
            </div>
            <div className="search">
              {role === "admin" ? (
                <Link to="/admin/search" className="link">
                  <img src={search} alt="search" />
                  Search
                </Link>
              ) : (
                <Link to="/user/search" className="link">
                  <img src={search} alt="search" />
                  Search
                </Link>
              )}
            </div>
          </ul>
        </nav>

        <div className="logout-wrapper">
          <div className="logout-content">
            <ReactRoundedImage
              image={MyPhoto}
              roundedSize="0"
              imageWidth="140"
              imageHeight="140"
            />
            <div className="button-wrapper">
              <img src={LogoutBtn} alt="logout" />
              <button onClick={handleLogout}>Logout</button>
            </div>
          </div>
        </div>
      </div>
      <Outlet />
    </div>
  );
}

export default Layout;
