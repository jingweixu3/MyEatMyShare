import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import ExploreNearbyPage from "./components/ExploreNearbyPage";
import LandingPage from "./components/LandingPage";
import UserHomePage from "./components/UserHomePage";
import Resturant from "./components/Resturant";
import Profile from "./components/Profile/Profile";
import Axios from "axios";

const App = () => {
  const [posts, setPosts] = useState([]);
  const [userLoggedIn, setuserLoggedIn] = useState(false);
  const [userLocation, setUserLocation] = useState(null);
  const [userInfo, setUserInfo] = useState(null);

  function setPosition(position) {
    console.log(
      "Latitude: " +
        position.coords.latitude +
        " Longitude: " +
        position.coords.longitude
    );
    setUserLocation({
      lat: position.coords.latitude,
      lng: position.coords.longitude,
    });
  }

  function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(setPosition);
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  }

  function setLoggedIn(userLoggedIn) {
    Axios.get("/api/current_user")
        .then((res) => {
          console.log("dataaaaaaa: ", res.data);
          //console.log("11111", userLoggedIn);
          if (res.data.length != 0){
            setuserLoggedIn(true);
            setUserInfo(res.data);
            console.log("userrrrinfoooo", userInfo);
          }else{
            console.log("no data");
            setuserLoggedIn(false);
          }
        })
        .catch((err) => {
          console.log("errrrr");
          console.log(err);
        });
    console.log("userLoggedIn1111111", userLoggedIn);
  }
  // setLoggedIn(userLoggedIn);

  useEffect(() => {
    setLoggedIn(userLoggedIn);
    getLocation();

    if (userLoggedIn) {
      Axios.get("/api/post/all_posts")
        .then((res) => {
          console.log("dataaaaaaa: ", res.data.posts);
          setPosts(res.data.posts);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [userLoggedIn]);

  return (
    <Router>
      <div>
        {userLoggedIn && (
          <Route
            exact
            path="/"
            render={() => <UserHomePage userLoggedIn = {userLoggedIn} userInfo = {userInfo} posts={posts} setPosts={setPosts} />}
          />
        )}
        {!userLoggedIn && <Route exact path="/" component={LandingPage} />}
        {userLoggedIn && (
          <Route
            path="/ExploreNearby"
            render={() => <ExploreNearbyPage userLocation={userLocation} />}
          />
        )}
        {userLoggedIn && (
          <Route
            path="/Resturant/:id"
            render={(props) => <Resturant {...props} />}
          />
        )}
        {userLoggedIn && (
          <Route
           path="/profile"
           render={()=><Profile userInfo={userInfo} />}
           />
        )}
      </div>
    </Router>
  );
};

export default App;
