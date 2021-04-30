import React,{ useState, useEffect} from "react";
import Navbar from "./Navbar/Navbar";
import Axios from "axios";

const UserGrid = ({user, userInfo}) =>  {
    //user is found user and userInfo is the current login user's info
    const [follow, setFollow] = useState(false);
    console.log("userrrrindoooo", userInfo);
    console.log("followww",userInfo.follow );

    useEffect(() => {
        const followSet = new Set(userInfo.follow);
        if (followSet.has(user.id)) {
          setFollow(true);
        }
      }, [userInfo]);

    // const handleClick = async (e) => {
    //     const id = user.id;
    //     console.log("in click fundtion");
    //     setFollow(true);
    //     Axios.post(`/api/follow/add/${id}`)
    //     .then((res) => {
    //     console.log("dataaaaaaa: ", res.data);
    //     // let {history} = props;
    //     //history.push({pathname:`/searchFriend/${friendName}`}, friendInfo = {friendInfo}, userInfo = {userInfo})
        
    //     })
    //     .catch((err) => {
    //     console.log(err);
    //     });
        
      //}
    // const handleClick = (e) => {
    //     // let data = {
    //     //   user_id: userInfo.id,
    //     //   post_id: post.id,
    //     // };
    //      setFollow(true);
    //       console.log("follow!");
    //       // add user to the like array in the backend
    //       Axios.post("/api/post/addLikes", data, {
    //         headers: {
    //           "Content-Type": "application/json",
    //         },
    //       }).catch((err) => {
    //         console.log(err);
    //       });
    //     }
    //   };

    const handleClick = (e) => {
        console.log("innnnnn");
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
    
    return(
        <div>
        <a className="image-link" href="#"><img className="image" src="https://bootdey.com/img/Content/avatar/avatar1.png" /></a>
            <div className="search-result-item-body">
                <div className="row">
                    <div className="col-sm-9">
                        <h4 className="search-result-item-heading"><a href="#">{user.name}</a></h4>
                        <p className="info">{user.location}</p>
                        <p className="description">{user.note}</p>
                    </div>
                    <div className="col-sm-3 text-align-center">
                        {!follow && <button className="btn btn-primary btn-info btn-sm" onClick={handleClick}>Follow</button>}
                        {follow && <button className="btn btn-primary btn-info btn-sm" onClick={handleClick}>Followed</button>}
                    </div>
                </div>
            </div>
        </div>

    );
};

export default UserGrid;