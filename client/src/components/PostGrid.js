import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Axios from "axios";

import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import FavoriteIcon from "@material-ui/icons/Favorite";
import TextField from "@material-ui/core/TextField";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import ChatBubbleIcon from "@material-ui/icons/ChatBubble";
import SendIcon from "@material-ui/icons/Send";
import Alert from "@material-ui/lab/Alert";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
    margin: "0 auto",
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9,
    marginTop: "30",
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  avatar: {
    backgroundColor: red[500],
  },
  send: {
    margin: theme.spacing(1),
  },
}));

const PostGrid = ({ post, userInfo }) => {
  const classes = useStyles();
  const [addcomment, setAddComment] = useState("");
  const [expanded, setExpanded] = React.useState(false);
  const [comments, setComments] = useState([]);
  const [likes, setLikes] = useState(false);
  const [commentErr, setCommentErr] = useState(false);
  // console.log("post is", post, "userIno is", userInfo);

  useEffect(() => {
    const likesSet = new Set(post.likes);
    if (likesSet.has(userInfo.id)) {
      setLikes(true);
    }
  }, [userInfo, post]);

  const handleExpandClick = () => {
    if (!expanded) {
      Axios.get(`/api/post/${post.id}/comments`)
        .then((res) => {
          console.log("comments: ", res.data);
          setComments(res.data.comments);
        })
        .catch((err) => {
          console.log(err);
        });
    }

    setExpanded(!expanded);
  };

  const TypeComment = (e) => {
    setAddComment(e.target.value);
  };

  const clickLikes = (e) => {
    let data = {
      user_id: userInfo.id,
      post_id: post.id,
    };
    if (likes) {
      setLikes(false);
      console.log("unlike!");
      // delete like from like array in backend
      Axios.delete("/api/post/deleteLikes", {
        headers: {
          "Content-Type": "application/json",
        },
        data: data,
      }).catch((err) => {
        console.log(err);
      });
    } else {
      setLikes(true);
      console.log("like!");
      // add user to the like array in the backend
      Axios.post("/api/post/addLikes", data, {
        headers: {
          "Content-Type": "application/json",
        },
      }).catch((err) => {
        console.log(err);
      });
    }
  };

  const SendComment = (e) => {
    if (addcomment === "") {
      console.log("please type comment before send! ");
      setCommentErr(true);
      return;
    }
    setCommentErr(false);
    console.log("send");
    let data = {
      username: userInfo.firstName,
      comment: addcomment,
      post_id: post.id,
    };
    Axios.post("/api/post/addComment", data, {
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        setAddComment("");
        console.log(res);
        setComments([data, ...comments]);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="mb-4 mt-4">
      {commentErr && (
        <Alert
          severity="warning"
          onClose={() => {
            setCommentErr(false);
          }}
        >
          This is a error alert — cannot an send empty comment!
        </Alert>
      )}
      <Card className={classes.root}>
        <CardHeader
          avatar={
            <Link
              to={`/profile/${post.user_id}`}
              style={{ textDecoration: "none" }}
            >
              <Avatar aria-label="recipe" className={classes.avatar}>
                {post.user_name.charAt(0)}
              </Avatar>
            </Link>
          }
          action={
            <IconButton aria-label="settings">
              <MoreVertIcon />
            </IconButton>
          }
          title={
            <Link
              to={`/Resturant/${post.resturant_id}`}
              style={{ color: "inherit" }}
            >
              {post.resturant_name}
            </Link>
          }
          subheader={
            <Link to={`/profile/${post.user_id}`} style={{ color: "inherit" }}>
              {post.user_name.concat(" - ").concat(post.createdAt)}
            </Link>
          }
        />
        <CardMedia
          className={classes.media}
          image={post.url}
          title="Paella dish"
        />
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            {post.content}
          </Typography>
        </CardContent>
        <CardActions>
          <TextField
            className="mt-0"
            value={addcomment}
            onChange={TypeComment}
            label="Add Comment"
          />
          <IconButton aria-label="add to favorites" onClick={SendComment}>
            <SendIcon />
          </IconButton>
          <IconButton aria-label="add to favorites" onClick={clickLikes}>
            {likes && <FavoriteIcon style={{ fill: "#fb3958" }} />}
            {!likes && <FavoriteIcon />}
          </IconButton>
          <IconButton
            className={clsx(classes.expand, {
              [classes.expandOpen]: expanded,
            })}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ChatBubbleIcon />
          </IconButton>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            {comments &&
              comments.map((each, index) => (
                <p key={index} className="mb-0">
                  <strong>
                    <Link
                      to={`/Resturant/${post.resturant_id}`}
                      style={{ color: "inherit" }}
                    >
                      {each.username}
                    </Link>
                    :{" "}
                  </strong>
                  <strong>{each.comment}</strong>
                </p>
              ))}
          </CardContent>
        </Collapse>
      </Card>
    </div>
  );
};

export default PostGrid;
