import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import ExploreNearbyPage from "./components/ExploreNearbyPage";
import LandingPage from "./components/LandingPage";
import UserHomePage from "./components/UserHomePage";
import Axios from "axios";

const App = () => {
  const [posts, setPosts] = useState([]);
  const [userLoggedIn, setuserLoggedIn] = useState(true);

  useEffect(() => {
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
  }, []);
  return (
    <Router>
      <div>
        {userLoggedIn && (
          <Route path="/" render={() => <UserHomePage posts={posts} />} />
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
