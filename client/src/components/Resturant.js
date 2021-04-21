import React from "react";

const Resturant = (props) => {
  console.log(props.match.params.id);
  return <h1>Hello {props.match.params.id}!</h1>;
};

export default Resturant;
