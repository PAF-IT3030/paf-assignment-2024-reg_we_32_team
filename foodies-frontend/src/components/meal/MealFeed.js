


import React, { useState, useEffect } from "react";
import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Collapse,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  Menu,
  MenuItem,
  OutlinedInput,
  TextField,
  Typography
} from "@mui/material";
import { Delete, Edit, PhotoCamera, Send, ThumbUp } from "@mui/icons-material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { blue, red } from "@mui/material/colors";
import { styled } from "@mui/material/styles";
import Swal from "sweetalert2";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

const MealFeed = (props) => {
  const uid = localStorage.getItem("user_id");
  const role = localStorage.getItem("role");

  const [mealInfo, setMealInfo] = useState({ ...props.data });
  const [expanded, setExpanded] = useState(false);
  const [comments, setComments] = useState([]);
  const [values, setValues] = useState({
    comment: ""
  });
  const [updatedComment, setUpdatedComment] = useState({
    id: "",
    comment: ""
  });
  const [opend, setOpen] = useState(false);
  const [opene, setOpene] = useState(false);
  const [mealName, setMealName] = useState("");
  const [mealDescription, setMealDescription] = useState("");
  const [image, setImage] = useState("");
  const [isFilePicked, setIsFilePicked] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  useEffect(() => {
    getAllComments();
    setMealInfo(props.data);
  }, [props.data]);

  const handleMealEditChange = (e) => {
    const { name, value } = e.target;
    setMealName(value);
    setMealDescription(value);
  };

  const handleClickOpen = () => {
    setOpen(true);
    setMealName(mealInfo.mealName);
    setMealDescription(mealInfo.mealDescription);
  };

  const handleCommentOpen = (commentData) => {
    setOpene(true);
    setUpdatedComment({
      id: commentData.id,
      comment: commentData.comment
    });
  };

  const handleCommentEditChange = (e) => {
    const { name, value } = e.target;
    setUpdatedComment({ ...updatedComment, [name]: value });
  };

  const handleClosed = () => {
    setOpen(false);
  };

  const handleClosede = () => {
    setOpene(false);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleCommentChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const uploadFileHandler = (e) => {
    setImage(e.target.files[0]);
    setIsFilePicked(true);
  };

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleClickSend = (event) => {
    event.preventDefault();
    setValues({ ...values, comments: values.comment });
    addComment().then(() => {
      getAllComments();
    });
  };

  const handleDeleteMeal = () => {
    deleteMeal(mealInfo.id);
  };

  const handleDeleteComment = (deleteCommentId) => {
    deleteComment(deleteCommentId);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("mealName", mealName);
    formData.append("mealDescription", mealDescription);
    formData.append("image", image);
    const requestOptions = {
      method: "PATCH",
      body: formData
    };
    fetch(`http://localhost:8082/api/v1/user/meal/${mealInfo.id}`, requestOptions)
      .then(async (response) => {
        const isJson = response.headers.get("content-type")?.includes("application/json");
        const data = isJson && (await response.json());
        if (!response.ok) {
          Swal.fire({
            title: "Upload error!",
            text: "Unable to upload workout",
            icon: "error",
            showConfirmButton: false,
            timer: 3000
          });
        } else {
          Swal.fire({
            title: "Success!",
            text: "Workout updated successfully",
            icon: "success",
            showConfirmButton: false,
            timer: 3000
          });
        }
        setImage("");
        setMealName("");
        setMealDescription("");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleCommentUpdate = (event) => {
    event.preventDefault();
    updateComment();
    setOpene(false);
  };

  const addComment = async () => {
    const response = await fetch(`http://localhost:8082/api/v1/user/meals/${mealInfo.id}/comments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        comment: values.comment
      })
    });
    const jsonData = await response.json();
    if (jsonData.error) {
      Swal.fire({
        title: "Error",
        text: "Cannot post comment",
        icon: "error",
        showConfirmButton: false,
        timer: 3000
      });
      return false;
    }
  };

  const getAllComments = async () => {
    const response = await fetch(`http://localhost:8082/api/v1/user/meals/${mealInfo.id}/comments`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    });
    const data = await response.json();
    setComments(data);
  };

  const deleteMeal = async (mealId) => {
    const response = await fetch(`http://localhost:8082/api/v1/user/meals/${mealId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      }
    });
    const data = await response.json();
    if (response.ok) {
      Swal.fire({
        title: "Success!",
        text: "Workout deleted successfully",
        icon: "success",
        showConfirmButton: false,
        timer: 3000
      });
      return true;
    } else {
      Swal.fire({
        title: "Error",
        text: "Cannot delete workout",
        icon: "error",
        showConfirmButton: false,
        timer: 3000
      });
      return false;
    }
  };

  const deleteComment = async (commentId) => {
    const response = await fetch(`http://localhost:8082/api/v1/user/meals/comment/${commentId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      }
    });
    const data = await response.json();
    if (response.ok) {
      Swal.fire({
        title: "Success!",
        text: "Comment deleted successfully",
        icon: "success",
        showConfirmButton: false,
        timer: 3000
      });
      return false;
    } else {
      Swal.fire({
        title: "Error",
        text: "Cannot delete comment",
        icon: "error",
        showConfirmButton: false,
        timer: 3000
      });
      return false;
    }
  };

  return (
    <Card sx={{ marginTop: "1em" }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            Avatar
          </Avatar>
        }
        action={
          <div>
            <IconButton
              onClick={handleClick}
              aria-controls={open ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
            >
              <MoreVertIcon />
            </IconButton>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleClose}
              MenuListProps={{
                "aria-labelledby": "basic-button"
              }}
            >
              <MenuItem onClick={handleClose}>
                <IconButton onClick={() => handleDeleteMeal(mealInfo.id)}>
                  <Delete sx={{ color: red[500] }} />
                </IconButton>
              </MenuItem>
              <MenuItem onClick={handleClose}>
                {role === "user" ? (
                  <div>
                    <IconButton onClick={handleClickOpen}>
                      <Edit sx={{ color: blue[500] }} />
                    </IconButton>
                  </div>
                ) : null}
              </MenuItem>
            </Menu>
          </div>
        }
        title="Fit Foodies Workout"
      />
      <CardContent>
      <Typography variant="h6" color="textPrimary" style={{ fontWeight: 'bold' }}>
        {props.data.mealName}
      </Typography>
      <Typography variant="body1" color="textSecondary">
        {props.data.mealDescription}
      </Typography>
      </CardContent>
      <CardMedia
        component="img"
        height="300"
        image={`data:image/jpeg;base64,${props.data.image}`}
        alt="Paella dish"
      />
      
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <ThumbUp />
        </IconButton>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>Comments</Typography>
          <FormControl sx={{ m: 1, width: "100%" }} variant="outlined">
            <InputLabel>Comment</InputLabel>
            <OutlinedInput
              autoFocus
              margin="dense"
              id="comment"
              label="Comment"
              type="text"
              fullWidth
              multiline
              maxRows={4}
              variant="outlined"
              name="comment"
              required
              value={values.comment}
              onChange={handleCommentChange("comment")}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton onClick={handleClickSend} edge="end">
                    <Send />
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
          {comments.length > 0 ? (
            <List>
              {comments.map((data, index) => (
                <div key={index}>
                  <ListItem>
                    <Grid container>
                      <Grid item xs={12}>
                        <ListItemText primary={data.comment}></ListItemText>
                        <ListItemSecondaryAction>
                          <IconButton onClick={() => handleCommentOpen(data)}>
                            <Edit sx={{ color: blue[500] }} />
                          </IconButton>
                          <IconButton onClick={() => handleDeleteComment(data.id)}>
                            <Delete sx={{ color: red[500] }} />
                          </IconButton>
                        </ListItemSecondaryAction>
                      </Grid>
                    </Grid>
                  </ListItem>
                  <Divider />
                </div>
              ))}
            </List>
          ) : (
            <Typography paragraph sx={{ m: 1 }}>
              No comments yet.
            </Typography>
          )}
        </CardContent>
      </Collapse>

      <Dialog open={opend} onClose={handleClosed} sx={{ zIndex: 1000 }}>
        <DialogTitle>Edit post</DialogTitle>
        <form onSubmit={handleSubmit}>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              id="workoutName"
              label="Workout Name"
              type="text"
              fullWidth
              variant="outlined"
              name="workoutName"
              value={mealName}
              onChange={handleMealEditChange}
            />
            <TextField
              autoFocus
              margin="dense"
              id="workoutDescription"
              label="Workout Description"
              type="text"
              fullWidth
              variant="outlined"
              name="workoutDescription"
              value={mealDescription}
              onChange={handleMealEditChange}
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
                {isFilePicked ? <p>{image.name}</p> : null}
              </div>
            </CardActions>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClosed}>Cancel</Button>
            <Button type="submit">Update</Button>
          </DialogActions>
        </form>
      </Dialog>

      <Dialog open={opene} onClose={handleClosede} sx={{ zIndex: 1000 }}>
        <DialogTitle>Edit comment</DialogTitle>
        <form onSubmit={handleCommentUpdate}>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              id="comment"
              label="Comment"
              type="text"
              fullWidth
              variant="outlined"
              name="comment"
              value={updatedComment.comment}
              onChange={handleCommentEditChange}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClosede}>Cancel</Button>
            <Button type="submit">Update</Button>
          </DialogActions>
        </form>
      </Dialog>
    </Card>
  );
};

export default MealFeed;

