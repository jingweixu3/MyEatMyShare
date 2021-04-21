import React, { useState, useEffect } from "react";
import Axios from "axios";

const Resturant = (props) => {
  const [resturant, setResturant] = useState({});

  useEffect(() => {
    Axios.get(`/api/resturant/${props.match.params.id}`)
      .then((res) => {
        console.log("resturant dataaaaaaa: ", res.data);
        setResturant(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  console.log(props.match.params.id);
  return <h1>Hello {resturant.name}!</h1>;
};

export default Resturant;
