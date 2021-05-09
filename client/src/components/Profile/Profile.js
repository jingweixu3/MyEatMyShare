import React,{ useState, useEffect} from "react";
// import { Link } from "react-router-dom";
// import Navbar from "../Navbar/Navbar";
import Axios from "axios";
import UpdateProfile from "../UpdateProfile";
import ShowFollower from "../ShowFollower";
import ShowFollows from "../ShowFollows";
import PostGrid from "../PostGrid";
//import useForceUpdate from 'use-force-update';


<link href="profile.css" rel="stylesheet" type="text/css" />


const Profile = ({id, userInfo}) =>  {
    const [foundUser, setFoundUser] = useState(null);
    const [follower, setFollower] = useState([]);
    const [follows, setFollows] = useState([]);
    const [userPost, setUserPost] = useState([]);
    const [follow, setFollow] = useState(false);
    
    useEffect(()  => {
        const followSet = new Set(userInfo.follow);
        const setInfo= async() => {
            Axios.get(`/api/user/${id}`)
            .then((res) => {
                setFoundUser(res.data); 
                if (followSet.has(res.data.id)){
                    setFollow(true);
                }  
                
            })
            .catch((err) => {
                console.log("err in profile");
                console.log(err);
            });  
            
            Axios.get(`/api/user/post/${id}`)
            .then((res) => {
                setUserPost(res.data); 
                
            })
            .catch((err) => {
                console.log("err in profile");
                console.log(err);
            }); 

            //console.log("is true??", followSet.has(foundUser.id));
            if (foundUser && followSet.has(foundUser.id)){
                setFollow(true);
            } 
        }
        setInfo();  
           
      }, []);

    const handleClickFollower = (e) => {
        console.log("in handle Click Follower");
        if (foundUser) {
            Axios.get(`/api/user/follower/${foundUser.id}`)
                .then((res) => {
                    console.log("follower data", res.data);
                    setFollower(res.data);    
                })
                .catch((err) => {
                    console.log("err in profile");
                    console.log(err);
                });
            }
    }

    const handleClickFollow = (e) => {
        if (foundUser) {
            Axios.get(`/api/user/follow/${foundUser.id}`)
                .then((res) => {
                    console.log("data", res.data);
                    setFollows(res.data);    
                })
                .catch((err) => {
                    console.log("err in profile");
                    console.log(err);
                });
            }
    }

    const handleClickProfile =(e) => {
        Axios.get(`/api/user/${id}`)
        .then((res) => {
            setFoundUser(res.data);  
            
        })
        .catch((err) => {
            console.log("err in profile");
            console.log(err);
        });  
    }

    const handleClick = (e) => {
        let data = {
          user_id: userInfo.id,
          change_id: foundUser.id,
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

   


    // console.log("userInfo is, ", userInfo);
    // console.log("found user is sssss", foundUser);
    // console.log("followerrr", follower);
    // console.log("userPost", userPost);
    // console.log("follow of the foundUser", follow);
    // console.log("sssss", foundUser);
    //console.log("is true??", followSet.has(foundUser.id));
    // if (foundUser && followSet.has(foundUser.id)){
    //     setFollow(true);
    // } 
    // console.log("follow of the foundUser22", follow);
  return (
    <div>
        <nav aria-label="breadcrumb" className="main-breadcrumb">
                <ol className="breadcrumb">
                <li className="breadcrumb-item"><a href="/">Home</a></li>
                <li className="breadcrumb-item active" aria-current="page">User Profile</li>
                </ol>
        </nav>
       
        <div className="row gutters-sm">
            <div className="col-3">
                <div className="card">
                    <div className="card-body">
                        <div className="d-flex flex-column align-items-center text-center">
                            {foundUser && foundUser.avatar === "" && <img src="https://bootdey.com/img/Content/avatar/avatar1.png" alt="Admin" className="rounded-circle" width="150" />}
                            {foundUser && foundUser.avatar !== "" && <img src={foundUser.avatar} alt="Admin" className="rounded-circle" width="150" />}
                            {foundUser && <div className="mt-3">
                                {foundUser && <h4>{foundUser.firstName} {foundUser.lastName}</h4>}
                                {foundUser && userInfo.googleId !== foundUser.googleId && !follow && <button className="btn btn-primary" onClick={handleClick}>Follow</button>}
                                {foundUser && userInfo.googleId !== foundUser.googleId && follow && <button className="btn btn-primary" onClick={handleClick}>Followed</button>}
                                {/* <button className="btn btn-outline-primary">{userInfo.googleId}</button> */}
                            </div>}
                        </div>
                    </div>
                </div>

                <div className="card mt-3">
                    <div className="nav flex-column nav-tabs text-center" id="v-tabs-tab" role="tablist" aria-orientation="vertical">
                        <a className="nav-link active" id="v-tabs-home-tab" datamdbtoggle="tab" href="#v-tabs-home" data-toggle="tab" aria-controls="v-tabs-home" aria-selected="true">Home</a>
                        {foundUser && userInfo.googleId === foundUser.googleId && <a className="nav-link" id="v-tabs-profile-tab" datamdbtoggle="tab" href="#v-tabs-profile" data-toggle="tab" aria-controls="v-tabs-profile" aria-selected="false" onClick={handleClickProfile}>Update Profile</a>}
                        <a className="nav-link" id="v-tabs-messages-tab" datamdbtoggle="tab" href="#v-tabs-messages" data-toggle="tab" aria-controls="v-tabs-messages" aria-selected="false" onClick={handleClickFollower}>follower</a>
                        <a className="nav-link" id="v-tabs-follower-tab" datamdbtoggle="tab" href="#v-tabs-follower" data-toggle="tab" aria-controls="v-tabs-follower" aria-selected="false" onClick={handleClickFollow}>following</a>
                    </div>
                </div>
            </div>

            <div className="col-9"> 
                <div className="tab-content" id="v-tabs-tabContent">
                    <div className="tab-pane fade show active" id="v-tabs-home" role="tabpanel" aria-labelledby="v-tabs-home-tab">
                    <div className="card">
                        <div className="card-body">
                        <div className="row">
                            <div className="col-sm-3">
                            <h6 className="mb-0">Full Name</h6>
                            </div>
                            {foundUser && <div className="col-sm-9 text-secondary">
                            {foundUser.firstName} {foundUser.lastName}
                            </div>}
                        </div>
                        <hr />
                        <div className="row">
                            <div className="col-sm-3">
                            <h6 className="mb-0">Location</h6>
                            </div>
                            {foundUser && foundUser.location !== "" && <div className="col-sm-9 text-secondary">
                                {foundUser.location}
                            </div>}
                            {foundUser && foundUser.location === "" && <div className="col-sm-9 text-secondary">
                                Tell us where you are!
                            </div>}
                        </div>
                        <hr />
                        <div className="row">
                            <div className="col-sm-3">
                            <h6 className="mb-0">Things I like</h6>
                            </div>
                            {foundUser && foundUser.note !== "" && <div className="col-sm-9 text-secondary">
                                {foundUser.note}
                            </div>}
                            {foundUser && foundUser.note === "" && <div className="col-sm-9 text-secondary">
                                Tell us what you like!
                            </div>}
                        </div>
                        </div>
                    </div>
                    <div className="row gutters-sm">
                        <div className="col-sm-12 mb-3">
                        <div className="card h-100">
                          <div className="card-body">
                          <h6 className="d-flex align-items-center mb-3"><i className="material-icons text-info mr-2">Post</i></h6>
                          <section className="search-result-item">
                            {foundUser && userPost && userPost.map((info) => (
                                <PostGrid post = {info} userInfo={userInfo}/>
                            ))}
                         </section>
                          </div>
                        </div>
                        </div>
                    </div>
                    </div>
                    {foundUser && userInfo.googleId === foundUser.googleId && <div className="tab-pane fade" id="v-tabs-profile" role="tabpanel" aria-labelledby="v-tabs-profile-tab">
                       <UpdateProfile foundUser = {foundUser} setFoundUser = {setFoundUser}/>
                    </div>}
                    <div className="tab-pane fade" id="v-tabs-messages" role="tabpanel" aria-labelledby="v-tabs-messages-tab">
                       <ShowFollower foundUser = {foundUser} userInfo = {userInfo} follower = {follower}/>
                    </div>
                    <div className="tab-pane fade" id="v-tabs-follower" role="tabpanel" aria-labelledby="v-tabs-follower-tab">
                       <ShowFollows foundUser = {foundUser} userInfo = {userInfo} follows = {follows}/>
                    </div>
                    {/* <div className="tab-pane fade" id="v-tabs-follow" role="tabpanel" aria-labelledby="v-tabs-follow-tab">
                    follow
                    </div> */}
                </div>
            </div>    
        </div>    
    </div>
  );
};


export default Profile;
