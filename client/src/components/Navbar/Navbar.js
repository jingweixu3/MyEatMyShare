import Axios from "axios";
import React,{ useState, useEffect} from "react";
import { useHistory, Link, withRouter } from "react-router-dom";


<link href="navbar.css" rel="stylesheet" type="text/css" />

const Navbar = ({userLoggedIn, userInfo, friendInfo, setFriendInfo}) => {
  const [friendName, setFriendName] = useState("");
  const [error, setError] = useState(null);
  let history = useHistory();

  const handleChange = async (e) => {
    let selected = e.target.value;
    setFriendName(e.target.value);
  }
  const onSubmit = async (e) => {
    e.preventDefault();
    if (friendName === "") {
      setError("Required a name!");
      return;
    }
    // console.log("this is name", JSON.stringify(friendName));
    // Axios.get(`/api/user/search/${friendName}`)
    // .then((res) => {
    //   console.log("dataaaaaaa: ", res.data);
    //   setFriendInfo(res.data);
    //   // let {history} = props;
    history.push({pathname:`/searchFriend/${friendName}`})
      //, userInfo = {userInfo}
    // })
    // .catch((err) => {
    //   console.log(err);
    // });
    
    
  };

  return (
    <div>
       <nav className="navbar navbar-expand-lg navbar-dark bg-dark ">
       <Link className="navbar-brand" to="/"> WeEatWeShare </Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent-555"
          aria-controls="navbarSupportedContent-555" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent-555">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
            <Link className="nav-link" to="/ExploreNearby">
              ExploreNearBy <span className="sr-only">(current)</span>
            </Link>
            </li>
            <li className="nav-item">
              {!userLoggedIn && <a className="nav-link" href="/auth/google">Login with google</a>}
              {userLoggedIn && <a className="nav-link" href="/api/logout">Logout</a>}
            </li>
          </ul>
          <ul className="navbar-nav ml-auto nav-flex-icons">
          <li className="nav-item" style={{paddingRight:"30px"}}>
            {userLoggedIn && <form className="form-inline my-2 my-lg-0" onSubmit={onSubmit}>
                <input className="form-control mr-sm-2" type="search" placeholder="Search friends with name" aria-label="Search" onChange={handleChange}/>
               {/* <button className="btn btn-outline-primary my-2 my-sm-0" type="submit">Search</button> */}
                <input type="submit" value="search" className="btn btn-outline-primary my-2 my-sm-0"/>
              </form>}
            </li>
            <li className="nav-item avatar ">
              {userLoggedIn && <a className="nav-link p-0" href={`/profile/${userInfo.id}`}> 
                {/* { userInfo.avatar === "" && <a className="rounded-circle z-depth-0" height="35" alt="avatar image" >  */}
                {userInfo.avatar === "" && <img src="https://www.shareicon.net/data/40x40/2016/08/05/806962_user_512x512.png" />}
                {userInfo.avatar !== "" && <img src={userInfo.avatar} className="rounded-circle z-depth-0"
                  alt="avatar image" height="35" />}
              {/* </a>} */}
              {/* {userLoggedIn && userInfo !== null && userInfo.avatar !== "" && <a className="nav-link" href={`/profile/${userInfo.googleId}`}>
                <img src={userInfo.avatar} />
              </a>} */}
                
              </a>}
            </li>
          </ul>
        </div>
    </nav>
</div>
  );
};

export default withRouter(Navbar);
