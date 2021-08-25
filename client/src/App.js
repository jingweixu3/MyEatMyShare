import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import ExploreNearbyPage from "./components/ExploreNearbyPage";
import LandingPage from "./components/LandingPage";
import UserHomePage from "./components/UserHomePage";
import Restaurant from "./components/Restaurant";
import Profile from "./components/Profile/Profile";
import SearchedFriend from "./components/SearchedFriend";
import Axios from "axios";

const App = () => {
  const [posts, setPosts] = useState([]);
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [userLocation, setUserLocation] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  const [friendInfo, setFriendInfo] = useState([]);
  // friendInfo={friendInfo}

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

  useEffect(() => {
    //setLoggedIn();

    const setLogin = async () => {
      Axios.get("/api/current_user")
        .then((res) => {
          if (res.data.length !== 0) {
            setUserInfo(res.data);
            setUserLoggedIn(true);
            console.log("user info is", userInfo);
          } else {
            console.log("no data");
          }
        })
        .catch((err) => {
          console.log("err in App");
          console.log(err);
        });
    };

    setLogin();
    getLocation();

    if (userLoggedIn) {
      console.log(userInfo.id);
      Axios.get(`/api/post/${userInfo.id}`)
        .then((res) => {
          console.log("data: ", res.data.posts);
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
            render={() => (
              <UserHomePage
                userLoggedIn={userLoggedIn}
                userInfo={userInfo}
                posts={posts}
                setPosts={setPosts}
                setFriendInfo={setFriendInfo}
                friendInfo={friendInfo}
              />
            )}
          />
        )}
        {!userLoggedIn && <Route exact path="/" component={LandingPage} />}
        <Route
          path="/ExploreNearby"
          render={() => (
            <ExploreNearbyPage
              userLocation={userLocation}
              userLoggedIn={userLoggedIn}
              userInfo={userInfo}
              setFriendInfo={setFriendInfo}
              friendInfo={friendInfo}
            />
          )}
        />
        {userLoggedIn && (
          <Route
            path="/Restaurant/:id"
            render={(props) => (
              <Restaurant
                id={props.match.params.id}
                userLoggedIn={userLoggedIn}
                userInfo={userInfo}
              />
            )}
          />
        )}
        {userLoggedIn && (
          <Route
            path="/profile/:id"
            render={(props) => (
              <Profile id={props.match.params.id} userInfo={userInfo} />
            )}
          />
        )}
        {userLoggedIn && (
          <Route
            path="/searchFriend/:name"
            render={(props) => (
              <SearchedFriend
                name={props.match.params.name}
                userInfo={userInfo}
              />
            )}
          />
        )}
      </div>
    </Router>
  );
};

export default App;
