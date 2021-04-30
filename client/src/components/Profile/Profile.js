import React,{ useState, useEffect} from "react";
// import { Link } from "react-router-dom";
// import Navbar from "../Navbar/Navbar";
import Axios from "axios";

<link href="profile.css" rel="stylesheet" type="text/css" />


const Profile = ({id, userInfo}) =>  {
    console.log("idddd is ", id);
    console.log("user info is... ", userInfo);
    //const [userInfo, setUserInfo] = useState(null);
    const [foundUser, setFoundUser] = useState(null);
    const [isCurrentUser, setIsCurrentUser] = useState(false);
   
    useEffect(()  => {
        const setInfo= async() => {
            Axios.get(`/api/user/${id}`)
            .then((res) => {
                console.log("found user dataaaaaaa: ", res.data);
                setFoundUser(res.data);
                
                // if (userInfo != null && userInfo.googleId == foundUser.googleId){
                //     setIsCurrentUser(true);
                //     console.log("isCurrentUser", isCurrentUser);
                // }
            })
            .catch((err) => {
                console.log("err in profile");
                console.log(err);
            });
            console.log("userrrrr", userInfo, "founderUeerrr", foundUser);        
        }
        setInfo();
        
      },[]);


    console.log("userInfo is, ", userInfo);
    console.log("found user is sssss", foundUser);
    //setIsCurrentUser(userInfo.googleId === foundUser.googleId);
    // if (userInfo != null && userInfo.googleId == foundUser.googleId){
    //     setIsCurrentUser(true);
    //     console.log("isCurrentUser", isCurrentUser);
    // }
    //console.log("is currentttt", isCurrentUser);
  
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
                            <img src="https://bootdey.com/img/Content/avatar/avatar7.png" alt="Admin" className="rounded-circle" width="150" />
                            {foundUser && <div className="mt-3">
                                {foundUser && <h4>{foundUser.firstName} {foundUser.lastName}</h4>}
                                {foundUser && userInfo.googleId !== foundUser.googleId&& <button className="btn btn-primary">Follow</button>}
                                {/* <button className="btn btn-outline-primary">{userInfo.googleId}</button> */}
                            </div>}
                        </div>
                    </div>
                </div>

                <div className="card mt-3">
                    <div className="nav flex-column nav-tabs text-center" id="v-tabs-tab" role="tablist" aria-orientation="vertical">
                        <a className="nav-link active" id="v-tabs-home-tab" datamdbtoggle="tab" href="#v-tabs-home" data-toggle="tab" aria-controls="v-tabs-home" aria-selected="true">Home</a>
                        {foundUser && userInfo.googleId == foundUser.googleId && <a className="nav-link" id="v-tabs-profile-tab" datamdbtoggle="tab" href="#v-tabs-profile" data-toggle="tab" aria-controls="v-tabs-profile" aria-selected="false">Update Profile</a>}
                        <a className="nav-link" id="v-tabs-messages-tab" datamdbtoggle="tab" href="#v-tabs-messages" data-toggle="tab" aria-controls="v-tabs-messages" aria-selected="false">messages</a>
                        <a className="nav-link" id="v-tabs-follower-tab" datamdbtoggle="tab" href="#v-tabs-follower" data-toggle="tab" aria-controls="v-tabs-follower" aria-selected="false">follower</a>
                        <a className="nav-link" id="v-tabs-follow-tab" datamdbtoggle="tab" href="#v-tabs-follow" data-toggle="tab" aria-controls="v-tabs-follow" aria-selected="false">follow</a>
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
                          <h6 className="d-flex align-items-center mb-3"><i className="material-icons text-info mr-2">assignment</i>Post</h6>
                          </div>
                        </div>
                        </div>
                    </div>
                    </div>
                    {foundUser && userInfo.googleId === foundUser.googleId && <div className="tab-pane fade" id="v-tabs-profile" role="tabpanel" aria-labelledby="v-tabs-profile-tab">
                    Update profile
                    </div>}
                    <div className="tab-pane fade" id="v-tabs-messages" role="tabpanel" aria-labelledby="v-tabs-messages-tab">
                    messages
                    </div>
                    <div className="tab-pane fade" id="v-tabs-follower" role="tabpanel" aria-labelledby="v-tabs-follower-tab">
                    follower
                    </div>
                    <div className="tab-pane fade" id="v-tabs-follow" role="tabpanel" aria-labelledby="v-tabs-follow-tab">
                    follow
                    </div>

                </div>
            </div>    
        </div>
        
    </div>
  );
};


export default Profile;
