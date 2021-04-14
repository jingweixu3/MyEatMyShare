import React, { useState } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import ExploreNearbyPage from "./components/ExploreNearbyPage";
import LandingPage from "./components/LandingPage";
import UserHomePage from "./components/UserHomePage";

const App = () => {
  const [userLoggedIn, setuserLoggedIn] = useState(true);

  return (
    <Router>
      <div>
        {userLoggedIn && <Route path="/" exact component={UserHomePage} />}
        {!userLoggedIn && <Route path="/" exact component={LandingPage} />}
        {userLoggedIn && (
          <Route path="/ExploreNearby" component={ExploreNearbyPage} />
        )}
      </div>
    </Router>
  );
};

export default App;
