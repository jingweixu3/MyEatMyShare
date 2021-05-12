import React from "react";
import { Link } from "react-router-dom";
const BodyJumbotron = () => {
  return (
    <section className="jumbotron text-center">
      <div className="container">
        <h1 className="jumbotron-heading">We Eat We Share</h1>
        <p className="lead text-muted">
          This is a social networking oriented web application for people who
          are passionate about food and cooking. It is a platform for friends
          with similar tastes to mark up the top best restaurants and share
          reviews on certain dishes.
        </p>
        <p>
          <Link to="/ExploreNearby" className="btn btn-primary my-2">
            Explore Nearby
          </Link>
        </p>
      </div>
    </section>
  );
};

export default BodyJumbotron;
