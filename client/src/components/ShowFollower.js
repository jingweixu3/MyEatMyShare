import React,{ useState, useEffect} from "react";
import Navbar from "./Navbar/Navbar";
import Axios from "axios";
import UserGrid from "./UserGrid";

const ShowFollower = ({foundUser, userInfo, follower}) =>  {
    
    // console.log("thi sis shoq folower found", foundUser);
    // console.log("this is follower", follower);

    return (
        <div className="container">
    {/* <nav aria-label="breadcrumb" className="main-breadcrumb">
        <ol className="breadcrumb">
        <li className="breadcrumb-item"><a href="/">Home</a></li>
        <li className="breadcrumb-item active" aria-current="page">Search Result</li>
        </ol>
    </nav> */}
    <div>
        <div>
            {/* <p className="search-results-count">About {foundUser.length} results</p> */}
                {foundUser && follower && follower.map((info) => (
                    <UserGrid user = {info} userInfo={userInfo} isProfile = {true}/>
                ))}
        </div>
    </div>
    </div>

    );
};

export default ShowFollower;