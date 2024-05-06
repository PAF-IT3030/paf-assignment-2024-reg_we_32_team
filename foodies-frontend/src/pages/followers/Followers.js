import { Button } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import React, { useEffect } from "react";
import "./Followers.css";

function Followers() {
  const uid = localStorage.getItem("user_id");
  const [followers, setFollowers] = React.useState([]);
  const [followBack, setFollowBack] = React.useState(false);

  // Handle follow change
  const handleFollowChange = (e) => {
    setFollowBack(e.target.value);
  };

  useEffect(() => {
    getAllFollowers();
  }, []);

  // Get all followers
  async function getAllFollowers() {
    const response = await fetch(
      `http://localhost:8082/api/v1/user/followers/${uid}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    setFollowers([...data]);
  }

  return (
    <div className="main-followers-wrapper">
      <div className="followers-container">
        <Typography variant="h3">Followers</Typography>

        {/* Show comments list */}
        {followers.length > 0 ? (
          <div>
            {Array.from(followers).map((data, index) => (
              <div key={index}>
                <Card
                  sx={{
                    marginTop: "1em",
                    display: "flex",
                    padding: "2em",
                    alignItems: "center",
                  }}
                >
                  <Avatar
                    sx={{ bgcolor: red[500], width: "100px", height: "100px" }}
                    aria-label="recipe"
                  >
                    Avatar
                  </Avatar>
                  <Typography
                    sx={{ paddingLeft: "1em" }}
                    variant="h5"
                    color="text.primary"
                  >
                    {data.firstName + " " + data.lastName}
                  </Typography>
                  <Button
                    variant="contained"
                    color="success"
                    sx={{ marginLeft: "15em" }}
                  >
                    Follow Back
                  </Button>
                </Card>
              </div>
            ))}
          </div>
        ) : (
          <Typography paragraph sx={{ m: 1 }}>
            No followers yet.
          </Typography>
        )}
      </div>
    </div>
  );
}

export default Followers;
