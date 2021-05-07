const express = require("express");
const Axios = require("axios");
const multer = require("multer");
const upload = multer();
const { getUserByGoogleId,
        checkUserExist, 
        getSatisfiedUser,
        deleteFollowers,
        deleteFollows, 
        addFollows, 
        addFollowers,
        updateUserInfo, 
        getUserById,
        getAllFollowers,
        getAllFollows,
        getAllPosts} = require("../firebase/models/User");

module.exports = app =>{
    app.get("/api/user/:id", async (req, res) => {
        console.log("idddd, ", req.params.id);
        if (!isNaN(req.params.id.charAt(0))){
            const googleId = req.params.id
            const userExist = await checkUserExist(googleId);
            if (userExist){
            const foundUser = await getUserByGoogleId(googleId);
            console.log("found user is:", foundUser);
            res.send(foundUser);
            }else{
                return res.status(401).send({error: 'No such user!'});
            }
        }else{
            const id = req.params.id;
            const foundUser = await getUserById(id);
            console.log("found user is:", foundUser);
            res.send(foundUser);
            }    
    });

    app.get("/api/user/search/:name", async (req, res) => {
        console.log("user name is , :", req.params.name);
        const requestName = req.params.name;
        const foundUsers = await getSatisfiedUser(requestName);
        if (foundUsers && !foundUsers.empty){
            console.log("routes", foundUsers);
            res.send(foundUsers);
        }else{
            return res.status(401).send({error: 'No users found!'});
        }
    })

    app.post("/api/user/update/:id", upload.single("file"),
      async(req, res) => {
        console.log("iddd", req.params.id);
        //const {firstName, lastName, location, note, file } = { ...req.body.data };
        const { file, body } = req;
        const {firstName, lastName, location, note} = body;
        //console.log("file", file, "body", body);
        const user_id = req.params.id;
        await updateUserInfo(user_id, firstName, lastName, location, note, file);
        res.send("OK");
      }) 

    app.post("/api/user/addFollows", async (req, res) => {
        const { user_id, change_id } = { ...req.body };
        await addFollows(user_id, change_id);
        await addFollowers(change_id, user_id);
        res.send("OK");
      });
      
    app.delete("/api/user/deleteFollows", async (req, res) => {
        const { user_id, change_id } = { ...req.body };
        await deleteFollows(user_id, change_id);
        await deleteFollowers(change_id, user_id);
        res.send("OK DELETE LIKES");
    });

    app.get("/api/user/follower/:id", async (req, res) =>{
       const user_id = req.params.id;
       const follower_list = await getAllFollowers(user_id);
       //console.log("this si list", follower_list);
       res.send(follower_list);
    });

    app.get("/api/user/follow/:id", async (req, res) =>{
        const user_id = req.params.id;
        const follow_list = await getAllFollows(user_id);
       // console.log("this si list", follow_list);
        res.send(follow_list);
     });

     app.get("/api/user/post/:id", async (req, res) =>{
        console.log("in get post");
        const user_id = req.params.id;
        const post_list = await getAllPosts(user_id);
        //console.log("this si list", post_list);
        res.send(post_list);
     });
      


};

