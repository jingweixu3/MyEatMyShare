import React from "react";
import "./PostRestaurant.css";
import {
  Avatar,
  Chip,
  Paper,
  Grid,
  GridList,
  GridListTile,
  Typography,
  List,
  ListSubheader,
  ListItem,
  ListItemText,
  Divider,
} from "@material-ui/core";
import ReactReadMoreReadLess from "react-read-more-read-less";
import { makeStyles } from "@material-ui/core/styles";

import PlaceIcon from "@material-ui/icons/Place";
import CallEndIcon from "@material-ui/icons/CallEnd";
import LanguageIcon from "@material-ui/icons/Language";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    //   theme.palette.background.paper
    backgroundColor: "transparent",
  },
  label: {
    display: "flex",
    // justifyContent: 'center',
    flexWrap: "wrap",
    "& > *": {
      margin: theme.spacing(0.3),
    },
  },

  gridList: {
    flexWrap: "nowrap",
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    //   transform: 'translateZ(0)',
  },
  rootcap: {
    flexGrow: 1,
    overflow: "hidden",
    // padding: theme.spacing(0, 3),
  },
  paper: {
    // maxWidth: 500,
    margin: `${theme.spacing(1.5)}px auto`,
    // padding: theme.spacing(1),
  },
  rootlist: {
    width: "95%",
    marginLeft: "2%",
    // maxWidth: 500,
    // backgroundColor: theme.palette.background.paper,
    backgroundColor: "transparent",
    position: "relative",
    overflow: "auto",
    maxHeight: 300,
  },
  listSection: {
    backgroundColor: "transparent",
  },
  ul: {
    backgroundColor: "transparent",
    padding: 0,
  },
  rootopen: {
    width: "100%",
    margin: `5px 0 0 ${theme.spacing(2)}px`,
    // maxWidth: 360,
    // backgroundColor: theme.palette.background.paper
  },
  dividerFullWidth: {
    margin: `5px 0 0 ${theme.spacing(2)}px`,
  },
  dividerInset: {
    margin: `5px 0 0 ${theme.spacing(9)}px`,
  },
}));
function PostRestaurant({
  comment,
  openhour,
  username,
  phone,
  website,
  types,
  icon,
  vicinity,
  captions,
  photos,
  view,
}) {
  const classes = useStyles();
  return (
    <Paper>
      <div className="post_border">
        <div className="post_body">
          <div
            className="post_header"
            style={{
              backgroundImage:
                view === null
                  ? null
                  : "url(" +
                    `https://maps.googleapis.com/maps/api/place/photo?maxheight=200&photoreference=${view.photo_reference}&key=AIzaSyDGx9NguhqUd5CeQR8FA12jwLTyFgBekxU` +
                    ")",
              backgroundPosition: "center",
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
            }}
          >
            <h3>{username}</h3>
          </div>

          {/* <br/> */}
          {comment &&( 
            <List className={classes.rootopen}> 
                {(comment.posts).map(item => (
                  <ListItemText secondary={"        <"+ item.content + ">"+ " --  By " + item.user_name} />
                ))}
            </List>
            )}

          <Divider />

          <Typography
            className={classes.dividerFullWidth}
            display="block"
            variant="caption"
          >
            Basic Information
          </Typography>
          {/* <br/> */}
          <div className="information">
            {vicinity && (
              <p class="small">
                <PlaceIcon />
                &nbsp; {vicinity}{" "}
              </p>
            )}
            {phone && (
              <p class="small">
                {" "}
                <CallEndIcon />
                &nbsp;&nbsp;{phone}{" "}
              </p>
            )}
            {website && (
              <p class="small">
                {" "}
                <LanguageIcon />
                &nbsp;&nbsp;{website}
              </p>
            )}
          </div>

          <br />
          <Divider />

          <Typography
            className={classes.dividerFullWidth}
            display="block"
            variant="caption"
          >
            Open Hour
          </Typography>

          {/* <List className={classes.rootopen}>
                        <ListItem>
                            <ListItemText secondary="Jan 9, 2014" />
                        </ListItem>
            </List> */}

          {openhour && (
            <List className={classes.rootopen}>
              {openhour.weekday_text.map((item) => (
                // <li key={item}>{item}</li>
                <div>
                  <ListItemText secondary={item} />
                  {/* {item} */}
                </div>
              ))}
            </List>
          )}

          {/* <br/> */}
          <Divider />

          <Typography
            className={classes.dividerFullWidth}
            display="block"
            variant="caption"
          >
            Photos
          </Typography>
          {/* <br/> */}
          <div className={classes.root}>
            <GridList className={classes.gridList} cols={2.5}>
              {photos &&
                photos.map((photo) => {
                  return (
                    <div>
                      <GridListTile>
                        <img
                          src={`https://maps.googleapis.com/maps/api/place/photo?maxheight=200&photoreference=${photo.photo_reference}&key=AIzaSyDGx9NguhqUd5CeQR8FA12jwLTyFgBekxU`}
                        />
                      </GridListTile>
                    </div>
                  );
                })}
            </GridList>
          </div>
          <br />
          <Divider />

          <Typography
            className={classes.dividerFullWidth}
            display="block"
            variant="caption"
          >
            Labels
          </Typography>
          <div className={classes.label}>
            {types &&
              types.map((type) => {
                return (
                  <div>
                    <Chip label={type} />
                  </div>
                );
              })}
          </div>
          <br />

          <Divider />

          <Typography
            className={classes.dividerFullWidth}
            display="block"
            variant="caption"
          >
            Comments
          </Typography>
          <List className={classes.rootlist} subheader={<li />}>
            {[0].map((sectionId) => (
              <li key={`section-${sectionId}`} className={classes.listSection}>
                <ul className={classes.ul}>
                  {captions &&
                    captions.map((caption) => {
                      return (
                        <div>
                          <Paper className={classes.paper}>
                            <Grid container wrap="nowrap" spacing={2}>
                              <Grid item>
                                <Avatar
                                  alt="username"
                                  src={caption.profile_photo_url}
                                />
                              </Grid>
                              <Grid item xs>
                                <Typography>
                                  {
                                    <div>
                                      "
                                      <ReactReadMoreReadLess
                                        charLimit={150}
                                        readMoreText={"Read more ▼"}
                                        readLessText={"Read less ▲"}
                                        readMoreClassName="read-more-less--more"
                                        readLessClassName="read-more-less--less"
                                      >
                                        {caption.text}
                                      </ReactReadMoreReadLess>
                                    </div>
                                  }
                                </Typography>
                              </Grid>
                            </Grid>
                          </Paper>
                        </div>
                      );
                    })}
                </ul>
              </li>
            ))}
          </List>
        </div>
      </div>
    </Paper>
  );
}

export default PostRestaurant;
