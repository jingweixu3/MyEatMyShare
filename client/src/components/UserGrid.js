import React,{ useState, useEffect} from "react";
import Navbar from "./Navbar/Navbar";
import Axios from "axios";
import axios from "axios";

const UserGrid = ({user, userInfo,isProfile}) =>  {
    //user is found user and userInfo is the current login user's info
    const [follow, setFollow] = useState(false);
    const [self, setSelf] = useState(false);

    // console.log("userrrrindoooo", userInfo);
    // console.log("followww",userInfo.follow );
    // console.log("userrrrr", user);
    

    useEffect(() => {  
        const followSet = new Set(userInfo.follow);
        if (user && userInfo.id === user.id){
            setSelf(true);
        }
        if (user && followSet.has(user.id)) {
            setFollow(true);
        }   
        
      }, []);

    const handleClick = (e) => {
        let data = {
          user_id: userInfo.id,
          change_id: user.id,
        };
        if (follow) {
          setFollow(false);
          console.log("unfollow!");
          // delete like from like array in backend
          Axios.delete("/api/user/deleteFollows", {
            headers: {
              "Content-Type": "application/json",
            },
            data: data,
          }).catch((err) => {
            console.log(err);
          });
        } else {
          setFollow(true);
          console.log("follow!");
          // add user to the like array in the backend
          Axios.post("/api/user/addFollows", data, {
            headers: {
              "Content-Type": "application/json",
            },
          }).catch((err) => {
            console.log(err);
          });
        }
      };
    // console.log("foll", follow);
    
    return(
        <div>
           {user && user.avatar === "" && <a className="image-link" href={`/profile/${user.id}`}><img className="image" style={{width:"30%", height:"20vw"}} src="https://bootdey.com/img/Content/avatar/avatar1.png" /></a>}
           {user && user.avatar !== "" && <a className="image-link" href={`/profile/${user.id}`}><img className="image" style={{width:"30%", height:"20vw"}} src={user.avatar}/></a>}
            <div className="search-result-item-body">
                <div className="row">
                    <div className="col-sm-9">
                        <h4 className="search-result-item-heading"><a href={`/profile/${user.id}`}>{user.firstName} {user.lastName}</a></h4>
                        <p className="info">{user.location}</p>
                        <p className="description">{user.note}</p>
                    </div>
                   <div className="col-sm-3 text-align-center">
                        {/* {!follow && !self && <button className="btn btn-primary btn-info btn-sm" onClick={handleClick}>Follow</button>}
                        {follow && !self && <button className="btn btn-primary btn-info btn-sm" onClick={handleClick}>Followed</button>} */}
                        { !isProfile && !follow && !self && <button className="btn btn-primary btn-info btn-sm" onClick={handleClick}>Follow</button>}
                        {!isProfile && follow && !self && <button className="btn btn-primary btn-info btn-sm" onClick={handleClick}>Followed</button>}
                    </div>
                </div>
            </div>
        </div>

    );
};

export default UserGrid;