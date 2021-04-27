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
import ShareIcon from "@material-ui/icons/Share";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MoreVertIcon from "@material-ui/icons/MoreVert";

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
}));

const PostGrid = ({ post, userInfo }) => {
  const classes = useStyles();
  const [addcomment, setAddComment] = useState("");
  const [expanded, setExpanded] = React.useState(false);
  const [comments, setComments] = useState([]);

  useEffect(() => {}, []);
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

  const SendComment = (e) => {
    if (addcomment === "") {
      console.log("please type comment before send! ");
      return;
    }
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
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="mb-4 mt-4">
      <Card className={classes.root}>
        <CardHeader
          avatar={
            <Avatar aria-label="recipe" className={classes.avatar}>
              R
            </Avatar>
          }
          action={
            <IconButton aria-label="settings">
              <MoreVertIcon />
            </IconButton>
          }
          title={
            <Link to={`/Resturant/${post.resturant_id}`}>
              {post.resturant_name}
            </Link>
          }
          subheader="September 14, 2016"
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
        <CardActions disableSpacing>
          <IconButton aria-label="add to favorites">
            <FavoriteIcon />
          </IconButton>
          <IconButton aria-label="share">
            <ShareIcon />
          </IconButton>
          <IconButton
            className={clsx(classes.expand, {
              [classes.expandOpen]: expanded,
            })}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </IconButton>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            {comments &&
              comments.map((each) => (
                <p key={each.id}>
                  <strong>{each.username}:</strong> {each.comment}
                </p>
              ))}
          </CardContent>
        </Collapse>
      </Card>
    </div>
  );
};

export default PostGrid;
