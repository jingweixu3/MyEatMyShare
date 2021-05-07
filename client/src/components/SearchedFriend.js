import React,{ useState, useEffect} from "react";
import Navbar from "./Navbar/Navbar";
import Axios from "axios";
import UserGrid from "./UserGrid";

const SearchedFriend = ({name, userInfo}) =>  {
    // const [currentInfo, setCurrentInfo] = useState(null);
    const [friendInfo, setFriendInfo] = useState([]);
    //console.log("name", name);

    useEffect(()  => {
        Axios.get(`/api/user/search/${name}`)
        .then((res) => {
        // console.log("dataaaaaaa: friend", res.data);
        setFriendInfo(res.data);
    })
    .catch((err) => {
      console.log(err);
    });
    },[]);

    //currentInfo, foundUserInfo
    //console.log("this is friend info in the search friend page", friendInfo);
    //console.log("this is userInfo in the search frined", userInfo);
   return(
    <div className="container">
    <nav aria-label="breadcrumb" className="main-breadcrumb">
        <ol className="breadcrumb">
        <li className="breadcrumb-item"><a href="/">Home</a></li>
        <li className="breadcrumb-item active" aria-current="page">Search Result</li>
        </ol>
    </nav>
    <div className="row ng-scope">
        <div className="col-md-9 col-md-pull-3">
            <p className="search-results-count">About {friendInfo.length} results</p>
            <section className="search-result-item">
                {friendInfo.map((info) => (
                    <UserGrid user = {info} userInfo={userInfo}/>
                ))}
            </section>
            
        </div>
    </div>
    </div>
      );

};

export default SearchedFriend;