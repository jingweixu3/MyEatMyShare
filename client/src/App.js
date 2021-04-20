import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import ExploreNearbyPage from "./components/ExploreNearbyPage";
import LandingPage from "./components/LandingPage";
import UserHomePage from "./components/UserHomePage";
import Axios from "axios";

const App = () => {
  const [posts, setPosts] = useState([]);
  const [userLoggedIn, setuserLoggedIn] = useState(true);
  const [userLocation, setUserLocation] = useState();

  function setPosition(position) {
    console.log(
      "Latitude: " +
        position.coords.latitude +
        " Longitude: " +
        position.coords.longitude
    );
    setUserLocation({
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
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
    if (userLoggedIn) {
      getLocation();
      Axios.get("/api/post/all_posts")
        .then((res) => {
          console.log("dataaaaaaa: ", res.data.posts);
          setPosts(res.data.posts);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);

  return (
    <Router>
      <div>
        {userLoggedIn && (
          <Route
            path="/"
            render={() => <UserHomePage posts={posts} setPosts={setPosts} />}
          />
        )}
        {!userLoggedIn && <Route path="/" exact component={LandingPage} />}
        {userLoggedIn && (
          <Route path="/ExploreNearby" component={ExploreNearbyPage} />
        )}
      </div>
    </Router>
  );
};

export default App;
