import React,{ useState, useEffect} from "react";
import Navbar from "./Navbar/Navbar";
import Axios from "axios";
import UserGrid from "./UserGrid";

const SearchedFriend = ({friendInfo, userInfo}) =>  {
    console.log("this is friend info in the search friend page", friendInfo);
    console.log("length", friendInfo.length);
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
            <div className="text-align-center">
                <ul className="pagination pagination-sm">
                    <li className="disabled"><a href="#">Prev</a>
                    </li>
                    <li className="active"><a href="#">1</a>
                    </li>
                    <li><a href="#">2</a>
                    </li>
                    <li><a href="#">3</a>
                    </li>
                    <li><a href="#">4</a>
                    </li>
                    <li><a href="#">5</a>
                    </li>
                    <li><a href="#">Next</a>
                    </li>
                </ul>
            </div>
        </div>
    </div>
    </div>
      );

};

export default SearchedFriend;