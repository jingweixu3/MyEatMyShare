import Axios from "axios";
import React,{ useState, useEffect} from "react";
import { useHistory, Link } from "react-router-dom";


<link href="navbar.css" rel="stylesheet" type="text/css" />

const Navbar = ({userLoggedIn, userInfo, friendInfo, setFriendInfo}) => {
  const [friendName, setFriendName] = useState("");
  const [error, setError] = useState(null);
  let history = useHistory();

  const handleChange = async (e) => {
    let selected = e.target.value;
    console.log("thi is selected, ", selected);
    setFriendName(e.target.value);
  }
  const onSubmit = async (e) => {
    e.preventDefault();
    if (friendName === "") {
      setError("Required a name!");
      return;
    }
    console.log("this is name", JSON.stringify(friendName));
    Axios.get(`/api/user/search/${friendName}`)
    .then((res) => {
      console.log("dataaaaaaa: ", res.data);
      setFriendInfo(res.data);
      // let {history} = props;
      history.push({pathname:`/searchFriend/${friendName}`}, friendInfo = {friendInfo}, userInfo = {userInfo})
      
    })
    .catch((err) => {
      console.log(err);
    });
    
    
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark " style = {{height: "55px"}}>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarTogglerDemo01"
        aria-controls="navbarTogglerDemo01"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
        <Link className="navbar-brand" to="/">
          WeEatWeShare
        </Link>
        <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
          <li className="nav-item active">
            <Link className="nav-link" to="/ExploreNearby">
              ExploreNearBy <span className="sr-only">(current)</span>
            </Link>
          </li>
          
          
          <li className="nav-item">
            <a
              className="nav-link disabled"
              href="#"
              tabIndex="-1"
              aria-disabled="true"
            >
              Disabled
            </a>
          </li>
        </ul>

        <ul className="navbar-nav" style={{float:"right", listStyleType:"none"}}> 
        <li className="nav-item" >
          <div id="imgDiv" style ={{paddingTop: "15px", marginRight: "-5px"}}>
            {userLoggedIn && userInfo !== null && userInfo.avatar === "" && <a className="nav-link" href={`/profile/${userInfo.googleId}`}>
              <img src="https://www.shareicon.net/data/40x40/2016/08/05/806962_user_512x512.png" />
            </a>}
          </div>
          <div id="imgDiv" style ={{paddingTop: "15px", marginRight: "-5px"}}>
            {userLoggedIn && userInfo !==null && userInfo.avatar !== "" && <a className="nav-link" href={`/profile/${userInfo.googleId}`}>
              <img src= {userInfo.avatar} />
            </a>}
          </div>
        </li>

        {/* <li className="nav-item active">
            {!userLoggedIn && <a className="nav-link" href="/auth/google">Login with google</a>}
            {userLoggedIn && <a className="nav-link" href="/api/logout">Logout</a>}
        </li>      */}
        </ul>
        <ul className="navbar-nav" style={{listStyleType:"none", paddingTop: "10px"}}>
        <li className="nav-item active">
            {!userLoggedIn && <a className="nav-link" href="/auth/google">Login with google</a>}
            {userLoggedIn && <a className="nav-link" href="/api/logout">Logout</a>}
          </li>
        </ul>

        <form className="form-inline my-2 my-lg-0" onSubmit={onSubmit}>
          <input className="form-control mr-sm-2" type="search" placeholder="Search friends with name" aria-label="Search" onChange={handleChange}/>
           {/* <button className="btn btn-outline-primary my-2 my-sm-0" type="submit">Search</button> */}
           <input type="submit" value="search" className="btn btn-outline-primary my-2 my-sm-0"/>
        </form>
      </div>  
    </nav>
  );
};

export default Navbar;
