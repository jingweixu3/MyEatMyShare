const express = require("express");
const router = express.Router();
const Axios = require("axios");
const { getUser,checkUserExist, getSatisfiedUser,deleteFollowers,deleteFollows, addFollows, addFollowers} = require("../firebase/models/User");

module.exports = app =>{
    app.get("/api/user/:id", async (req, res) => {
        console.log(req.params.id);
        const googleId = req.params.id
        const userExist = await checkUserExist(googleId);
        if (userExist){
            const foundUser = await getUser(googleId);
            console.log("found user is:", foundUser);
            res.send(foundUser);
        }else{
            return res.status(401).send({error: 'No such user!'});
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

    // app.post("/api/follow/add/:id", async (req, res) => {
    //     //console.log("user name is , :", req.params.name);
    //     const id = req.params.id;
    //     const addFollow = await updateFollow(req.user.googleId, id);
    //     const addFollower = await updateFollower(id, req.user.id);
    //     console.log("adddd", addFollow);
    //     if (addFollow && addFollower){
    //         console.log("routes", addFollow, "routes2", addFollower);
    //         res.send(req.user);
    //     }else{
    //         return res.status(401).send({error: 'cannot add!'});
    //     }
    // })

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
      


};

