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

  const onClick = async () => {
    try {
      const res = await Axios.get(`/api/resturant/nearby`, {
        params: {
          // lat: -33.8670522,
          lng: 151.1957362,
        },
      });
      console.log(res.data);
    } catch (err) {
      console.log(err);
    }
  };
  console.log(props.match.params.id);

  return (
    <div>
      <h1>Hello {resturant.name}!</h1>

      <button type="button" className="btn btn-dark" onClick={onClick}>
        FindNearby
      </button>
    </div>
  );
};

export default Resturant;
