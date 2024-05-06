import "./PostFeed.css";

import { Delete, Edit, PhotoCamera, Send, ThumbUp } from "@mui/icons-material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import {
  Button,
  Divider,
  FormControl,
  Grid,
  InputLabel,
  List,
  ListItemSecondaryAction,
  ListItemText,
  Menu,
  MenuItem,
  OutlinedInput,
  TextField,
} from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import Collapse from "@mui/material/Collapse";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import ListItem from "@mui/material/ListItem";
import Typography from "@mui/material/Typography";
import { blue, red } from "@mui/material/colors";
import { styled } from "@mui/material/styles";
import React, { useState } from "react";
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

export default function PostFeed(props) {
  const uid = localStorage.getItem("user_id");
  const role = localStorage.getItem("role");
  const [postInfo, setPostInfo] = React.useState({ ...props.data });

  const [expanded, setExpanded] = React.useState(false);
  //Set all comments
  const [comments, setComments] = React.useState([]);

  const [values, setValues] = React.useState({
    comment: "",
  });

  const [updatedComment, setUpdatedComment] = React.useState({
    id: "",
    comment: "",
  });

  const [opend, setOpen] = React.useState(false);
  const [opene, setOpene] = React.useState(false);

  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [isFilePicked, setIsFilePicked] = useState(false);

  const handlePostEditChange = (e) => {
    setDescription(e.target.value);
  };

  const handleClickOpen = () => {
    setOpen(true);
    setDescription(postInfo.postDescription);
  };

  const handleCommentOpen = (commentData) => {
    setOpene(true);
    setUpdatedComment({
      id: commentData.id,
      comment: commentData.comment,
    });
  };

  const handleCommentEditChange = (e) => {
    const value = e.target.value;
    setUpdatedComment({ ...updatedComment, [e.target.name]: value });
  };

  const handleClosed = () => {
    setOpen(false);
  };

  const handleClosede = () => {
    setOpene(false);
  };

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  // Handle comment change
  const handleCommentChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  // Handle image upload
  const uploadFileHandler = (e) => {
    setImage(e.target.files[0]);
    setIsFilePicked(true);
  };

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const handleClickSend = (event) => {
    setValues({
      ...values,
      comments: values.comment,
    });
    addComment().then(() => {
      getAllComments();
    });
  };

  const handleDeletePost = () => {
    deletePost(postInfo.id);
  };

  const handleDeleteComment = (deleteCommentId) => {
    deleteComment(deleteCommentId);
  };

  // Update post
  const handleSubmit = (event) => {
    event.preventDefault();

    // console.log(post.postImage.split("base64,")[1]);
    const formData = new FormData();
    formData.append("postDescription", description);
    formData.append("image", image);
    const requestOptions = {
      method: "PATCH",
      body: formData,
    };
    fetch(
      `http://localhost:8082/api/v1/user/post/${postInfo.id}`,
      requestOptions
    )
      .then(async (response) => {
        const isJson = response.headers
          .get("content-type")
          ?.includes("application/json");
        const data = isJson && (await response.json());
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
            text: "Post updated successfully",
            icon: "success",
            showConfirmButton: false,
            timer: 3000,
          });
        }
        setImage("");
        setDescription("");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // Handle Update comment
  const handleCommentUpdate = (event) => {
    event.preventDefault();
    updateComment();
    setOpene(false);
  };

  // Update comment
  async function updateComment() {
    const response = await fetch(
      `http://localhost:8082/api/v1/user/posts/comment/${updatedComment.id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          comment: updatedComment.comment,
        }),
      }
    );
    const jsonData = await response.json();
    if (jsonData.error) {
      Swal.fire({
        title: "Error!",
        text: "Cannot update comment",
        icon: "error",
        showConfirmButton: false,
        timer: 3000,
      });
    } else {
      Swal.fire({
        title: "Success!",
        text: "Comment updated successfully",
        icon: "success",
        showConfirmButton: false,
        timer: 3000,
      });
    }
  }

  React.useEffect(() => {
    getAllComments();
    setPostInfo(props.data);
    return () => {};
  }, [props.data]);
  // Add user comment
  async function addComment(event) {
    const response = await fetch(
      `http://localhost:8082/api/v1/user/posts/${postInfo.id}/comments`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          comment: values.comment,
        }),
      }
    );
    const jsonData = await response.json();
    if (jsonData.error) {
      Swal.fire({
        title: "Error",
        text: "Cannot post comment",
        icon: "error",
        showConfirmButton: false,
        timer: 3000,
      });
      return false;
    }
  }

  // Get all comments
  async function getAllComments() {
    const response = await fetch(
      `http://localhost:8082/api/v1/user/posts/${postInfo.id}/comments`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    setComments(data);
  }

  //Delete post
  async function deletePost(postId) {
    const response = await fetch(
      `http://localhost:8082/api/v1/user/posts/${postId}`,
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
        text: "Post deleted successfully",
        icon: "success",
        showConfirmButton: false,
        timer: 3000,
      });
      return true;
    } else {
      Swal.fire({
        title: "Error",
        text: "Cannot delete post",
        icon: "error",
        showConfirmButton: false,
        timer: 3000,
      });
      return false;
    }
  }

  //Delete comment
  async function deleteComment(commentId) {
    const response = await fetch(
      `http://localhost:8082/api/v1/user/posts/comment/${commentId}`,
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
        text: "Comment deleted successfully",
        icon: "success",
        showConfirmButton: false,
        timer: 3000,
      });
      return false;
    } else {
      Swal.fire({
        title: "Error",
        text: "Cannot delete comment",
        icon: "error",
        showConfirmButton: false,
        timer: 3000,
      });
      return false;
    }
  }

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
              open={open}
              onClose={handleClose}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
            >
              <MenuItem onClick={handleClose}>
                <IconButton onClick={() => handleDeletePost(postInfo.id)}>
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
        title="Shrimp and Chorizo Paella"
      />
      <CardMedia
        component="img"
        height="300"
        image={`data:image/jpeg;base64,${props.data.image}`}
        alt="Paella dish"
      />
      <CardContent>
        {/* Post Description goes here */}
        <Typography variant="body2" color="text.secondary">
          {props.data.postDescription}
        </Typography>
      </CardContent>
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
                  <IconButton
                    onClick={(event) => handleClickSend(event)}
                    edge="end"
                  >
                    {<Send />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>

          {/* Show comments list */}
          {comments.length > 0 ? (
            <List>
              {Array.from(comments).map((data, index) => (
                <div key={index}>
                  <ListItem>
                    <Grid container>
                      <Grid item xs={12}>
                        <ListItemText primary={data.comment}></ListItemText>
                        <ListItemSecondaryAction>
                          <IconButton onClick={() => handleCommentOpen(data)}>
                            <Edit sx={{ color: blue[500] }} />
                          </IconButton>
                          <IconButton
                            onClick={() => handleDeleteComment(data.id)}
                          >
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

      {/* Edit post form */}
      <Dialog open={opend} onClose={handleClosed} sx={{ zIndex: 1000 }}>
        <DialogTitle>Edit post</DialogTitle>
        <form onSubmit={handleSubmit}>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              id="postDescription"
              label="Post Description"
              type="text"
              fullWidth
              variant="outlined"
              name="post Description"
              value={description}
              onChange={(e) => handlePostEditChange(e)}
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

      {/* Edit comment form */}
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
              onChange={(e) => handleCommentEditChange(e)}
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
}
