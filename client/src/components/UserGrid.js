import React,{ useState, useEffect} from "react";
import Axios from "axios";
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    margin: 'auto',
    maxWidth: 800,
  },
  image: {
    width: 128,
    height: 128,
  },
  img: {
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '128px',
  },
}));

const UserGrid = ({user, userInfo,isProfile}) =>  {
  const classes = useStyles();
  const [follow, setFollow] = useState(false);
    const [self, setSelf] = useState(false);

    // console.log("userrrrindoooo", userInfo);
    // console.log("followww",userInfo.follow );
    // console.log("userrrrr", user);
    

    useEffect(() => {  
        const followSet = new Set(userInfo.follow);
        if (user && userInfo.id === user.id){
            setSelf(true);
        }
        if (user && followSet.has(user.id)) {
            setFollow(true);
        }   
        
      }, []);

    const handleClick = (e) => {
        let data = {
          user_id: userInfo.id,
          change_id: user.id,
        };
        if (follow) {
          setFollow(false);
          console.log("unfollow!");
          // delete like from like array in backend
          Axios.delete("/api/user/deleteFollows", {
            headers: {
              "Content-Type": "application/json",
            },
            data: data,
          }).catch((err) => {
            console.log(err);
          });
        } else {
          setFollow(true);
          console.log("follow!");
          // add user to the like array in the backend
          Axios.post("/api/user/addFollows", data, {
            headers: {
              "Content-Type": "application/json",
            },
          }).catch((err) => {
            console.log(err);
          });
        }
      };

  return (
    <div className="mb-4">
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Grid container spacing={2}>
          <Grid item>
            <ButtonBase className={classes.image}>
            {user && user.avatar === "" && <a className="image-link" href={`/profile/${user.id}`}><img className={classes.img} alt="complex" src="https://bootdey.com/img/Content/avatar/avatar1.png" /></a>}
            {user && user.avatar !== "" && <a className="image-link" href={`/profile/${user.id}`}><img className={classes.img} alt="complex" src={user.avatar} /></a>}
            </ButtonBase>
          </Grid>
          <Grid item xs={12} sm container>
            <Grid item xs container direction="column" spacing={2}>
              <Grid item xs>
                <Typography gutterBottom variant="subtitle1">
                <a href={`/profile/${user.id}`}>{user.firstName} {user.lastName}</a>
                </Typography>
                <Typography variant="body2" gutterBottom>
                  {user.location}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {user.note}
                </Typography>
              </Grid>
              {/* <Grid item>
                <Typography variant="body2" style={{ cursor: 'pointer' }}>
                  Remove
                </Typography>
              </Grid> */}
            </Grid>
            <Grid item>
            {/* <IconButton aria-label="add to favorites" onClick={handleClick}> */}
            { !isProfile && !follow && !self && <Button variant="contained" color="primary" aria-label="add to follow" onClick={handleClick}>Follow</Button>}
            { !isProfile && follow && !self && <Button variant="contained" color="primary" aria-label="add to follow" onClick={handleClick}>Followed</Button>}


            {/* <SendIcon /> */}
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </div>
    </div>
  );
}
export default UserGrid;