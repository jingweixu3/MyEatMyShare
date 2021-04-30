// const { projectStorage,projectFirestore, timestamp } = require("../config");
const { projectStorage, projectFirestore, timestamp, filedValue} = require("../config");

async function insertUser(profile) {
    console.log("proooooo", profile);
    console.log("iddddd", profile.id);

    const createdAt = timestamp();
    //console.log("photo is", photo);
    const googleId = profile.id;
    // const photo_info = googleId + "_" + photo;
    
    
    //const storageRef = projectStorage.ref().child(photo);
    const userRef = projectFirestore.collection("user");
    
    let name = profile.name.givenName.toLowerCase() + " " + profile.name.familyName.toLowerCase();
    let firstName = profile.name.givenName.toLowerCase();
    let lastName = profile.name.familyName.toLowerCase();
    let email = profile.emails[0].value;
    let friend = [];
    let post = [];
    let follow = [];
    let follower = [];
    let avatar = "";
    let location = "";
    let note = "";
    

    //console.log("firstname", firstName, "lastName", lastName, "emial", email);

    // await storageRef.put(photo);
    // const URL = await storageRef.getDownloadURL();
    // console.log("finish uplaod photo: ", URL);
  
    await userRef.add({
      googleId,
      name,
      email,
      post,
      avatar,
      follow,
      follower,
      createdAt,
      location,
      note,
      firstName,
      lastNmae
    });
    console.log("insert google id", googleId);
    const user = await getUser(googleId);
    return user;
  }

  async function getUser(googleId) {
     console.log("get google id", googleId);
     documents = [];
     const userRef = projectFirestore.collection("user");
     const doc = await userRef.where('googleId','==',googleId).get();
     //const doc = await userRef.where('googleId','==',googleId).get();
     //const doc = await userRef.doc("RfE80KnUfElyfqrt6bFM").get();
     //const doc = await userRef.where('post_uuid','==','cd0f3fbd-94f3-4960-84bc-c797e6a90194').get();
     //console.log("docccccc",doc);
     if (doc.empty) {
        console.log('No such document!');
        return null;
      } else {
        doc.forEach((doc) => {
          documents.push({ ...doc.data(), id: doc.id });
        });
        //console.log('Document data:', doc.data());
        return documents[0];
      }

  }

  async function getSatisfiedUser(name) {
    console.log("in gettttt function");
    console.log("get name", name);
    name = name.toLowerCase();
    documents = [];
    // name_arr = name.trim().split(" ");
    // console.log("name length", name_arr.length);
    // let flag = 1;
    // if (name_arr.length > 1){
    //   flag = 2;
    // }
    
    async function getfirstNameOrLastName() {
      const userRef = projectFirestore.collection("user");
      const firstNameRes = userRef.where('firstName', '==', name).get();
      const lastNameRes = userRef.where('lastName', '==', name).get();

      const [firstNameQuerySnapshot, lastNameQuerySnapshot] = await Promise.all([
        firstNameRes,
        lastNameRes
      ]);

      const firstNameArray = firstNameQuerySnapshot.docs;
      const lastNameArray = lastNameQuerySnapshot.docs;

      const nameArray = firstNameArray.concat(lastNameArray);

      return nameArray;
    }

    const snapshot = await getfirstNameOrLastName()

    snapshot.forEach((doc) => {
      documents.push({ ...doc.data(), id: doc.id });
    });

    return documents
  }



  async function checkUserExist(googleId) {
    const existUser = await getUser(googleId);
    if (existUser != null){
      return true;
    }else{
      return false;
    }
  }

  // async function updateFollow(currentId, addId) {
  //   let hasExsit = false;
  //   const currentUser = await getUser(currentId);
  //   console.log("currenttt user", currentUser);
  //   const follow = currentUser.follow;
  //   for (var i = 0; i < follow.length; i++){
  //       if (follow[i] === addId){
  //         hasExsit = true;
  //         console.log("has exist!");
  //         return false;
  //       }
  //   }
  //   // const id = currentUser.id;
  //   if (!hasExsit){
  //     follow.push(addId);
  //     console.log("new follow", follow);
  //     const userRef = projectFirestore.collection("user").doc(currentUser.id);
  //     const unionRes = await userRef.update({
  //       "follow": follow
  //     });
  //     return true;
  //   }
  // }

  // async function updateFollower(currentId, addId) {
  //   let hasExsit = false;
  //   console.log("currentidddd", currentId);
  //   const userRef = projectFirestore.collection("user").doc(currentId);
  //   const currentUser = await userRef.get();
  //   const data = currentUser.data();
  //   console.log("currenttt userrrr", data);
  //   const follower = data.follower;
  //   console.log("followerrrr", follower);
  //   for (var i = 0; i < follower.length; i++){
  //       if (follower[i] === addId){
  //         hasExsit = true;
  //         console.log("has exist!");
  //         return false;
  //       }
  //   }
  //   if (!hasExsit){
  //     follower.push(addId);
  //     console.log("new follower", follower);
  //     const userRef = projectFirestore.collection("user").doc(currentId);
  //     const unionRes = await userRef.update({
  //       "follower": follower
  //     });
  //     return true;
  //   }
  // }

  async function addFollows(user_id, addId) {
    console.log("in add folloes");
    const postRef = projectFirestore.collection("user").doc(user_id);
  
    const unionRes = await postRef.update({
      follow: filedValue.arrayUnion(addId),
    });
  }

  async function addFollowers(user_id, addId) {
    console.log("in add followers");
    const postRef = projectFirestore.collection("user").doc(user_id);
  
    const unionRes = await postRef.update({
      follower: filedValue.arrayUnion(addId),
    });
  }
  
  async function deleteFollows(user_id, deleteId) {
    console.log("in delete follows");
    const postRef = projectFirestore.collection("user").doc(user_id);
    const unionRes = await postRef.update({
      follow: filedValue.arrayRemove(deleteId),
    });
  }

  async function deleteFollowers(user_id, deleteId) {
    console.log("in delete followers");
    const postRef = projectFirestore.collection("user").doc(user_id);
    const unionRes = await postRef.update({
      follower: filedValue.arrayRemove(deleteId),
    });
  }










  module.exports = { insertUser, getUser, checkUserExist, getSatisfiedUser, addFollows, addFollowers, deleteFollows, deleteFollowers};




