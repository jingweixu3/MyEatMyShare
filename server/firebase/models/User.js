// const { projectStorage,projectFirestore, timestamp } = require("../config");
const { projectStorage, projectFirestore, timestamp, filedValue} = require("../config");
const { getPostById } = require("../useStorage");

async function insertUser(profile) {
    // console.log("proooooo", profile);
    // console.log("iddddd", profile.id);

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
      lastName
    });
    console.log("insert google id", googleId);
    const user = await getUserByGoogleId(googleId);
    return user;
  }

  async function getUserByGoogleId(googleId) {
     //console.log("get id", googleId);
     documents = [];
     const userRef = projectFirestore.collection("user");
    //  const doc = await userRef.get();
     const doc = await userRef.where('googleId','==',googleId).get();
     //const doc = await userRef.where('googleId','==',googleId).get();
     //const doc = await userRef.doc(id).get();
     //const doc = await userRef.where('post_uuid','==','cd0f3fbd-94f3-4960-84bc-c797e6a90194').get();
     //console.log("docccccc",doc);
     if (doc.empty) {
        console.log('No such document!!!!!');
        return null;
      } else {
        doc.forEach((doc) => {
          documents.push({ ...doc.data(), id: doc.id });
        });
        //console.log('Document data:', doc.data());
        return documents[0];
      }
    // if (doc){
    //   console.log(doc);
    //   return doc.data();
    // }else{
    //   return null;
    // }

  }

  async function getUserById(id) {
   // console.log("get id", id);
   const documet_getUserById = [];
    const userRef = projectFirestore.collection("user").doc(id);
    const doc = await userRef.get();
    if (!doc.exists) {
      console.log('No such document in getUserByid! and id is', id);
      return null;
    } else {
      documet_getUserById.push({ ...doc.data(), id: doc.id });
      //console.log('Document data:', doc.data());
      return documet_getUserById[0];
    }
  }

  async function getSatisfiedUser(name) {
    // console.log("in gettttt function");
    // console.log("get name", name);
    name = name.toLowerCase();
    documents_1 = [];
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
      //console.log("ffff", firstNameArray);
      const lastNameArray = lastNameQuerySnapshot.docs;
      //console.log("lllll", lastNameArray);
      const nameArray = firstNameArray.concat(lastNameArray);

      return nameArray;
    }

    const snapshot = await getfirstNameOrLastName()
    
    //console.log("dddddddddddd", documents_1);
    snapshot.forEach((doc) => {
      documents_1.push({ ...doc.data(), id: doc.id });
    });
    //console.log("dddd", documents_1);
    return documents_1
  }


  async function checkUserExist(googleId) {
    const existUser = await getUserByGoogleId(googleId);
    if (existUser != null){
      return true;
    }else{
      return false;
    }
  }

  

  async function addFollows(user_id, addId) {
    const postRef = projectFirestore.collection("user").doc(user_id);
  
    const unionRes = await postRef.update({
      follow: filedValue.arrayUnion(addId),
    });
  }

  async function addFollowers(user_id, addId) {
    const postRef = projectFirestore.collection("user").doc(user_id);
  
    const unionRes = await postRef.update({
      follower: filedValue.arrayUnion(addId),
    });
  }
  
  async function deleteFollows(user_id, deleteId) {
    const postRef = projectFirestore.collection("user").doc(user_id);
    const unionRes = await postRef.update({
      follow: filedValue.arrayRemove(deleteId),
    });
  }

  async function deleteFollowers(user_id, deleteId) {
    const postRef = projectFirestore.collection("user").doc(user_id);
    const unionRes = await postRef.update({
      follower: filedValue.arrayRemove(deleteId),
    });
  }

  async function updateUserInfo(user_id, firstName, lastName, location, note, file) {
    //console.log("firstNama", firstName, "lastName", lastName, "location", location, "note", note, "seid", user_id, "file", file);
    //const URL = "";
    if (file != null){
      const fileName = user_id + '_' + file.originalname;
      const storageRef = projectStorage.ref().child(fileName);
      let metadata = { contentType: file.mimetype, name: file.originalname };
      await storageRef.put(file.buffer, metadata);
      const URL = await storageRef.getDownloadURL();
      console.log("finish uplaod: ", URL);
      const userRef = projectFirestore.collection("user").doc(user_id);
      const unionRes = await userRef.update({
      firstName: firstName,
      lastName: lastName,
      location: location, 
      note: note,
      avatar:URL
      });
      const returnUser = await getUserById(user_id);
      console.log("updated user", returnUser);
      return returnUser;
    }else{
      const userRef = projectFirestore.collection("user").doc(user_id);
      const unionRes = await userRef.update({
      firstName: firstName,
      lastName: lastName,
      location: location, 
      note: note,
      });
      const returnUser = await getUserById(user_id);
      console.log("updated user", returnUser);
      return returnUser;
      
    }
    
    
    
  }

  async function getAllFollowers(user_id){
    const documents_follower = [];
    const userRef = projectFirestore.collection("user").doc(user_id);
    const doc = await userRef.get();
    if (!doc.exists) {
      console.log('No such document in get all follower and id is', user_id);
      return null;
    } else {
      const foundUser = doc.data();
      const follower_id_list = foundUser.follower;
      for (let i = 0; i < follower_id_list.length; i++){
        const follower = await getUserById(follower_id_list[i]);
        documents_follower.push(follower);
        //documents_follow.push({ ...follow, id: follow.id });
        //console.log("this is follower", documents_follower);
      }
      return documents_follower;
    }
      
  }

    async function getAllFollows(user_id){
      const documents_follow = [];
      const userRef = projectFirestore.collection("user").doc(user_id);
      const doc = await userRef.get();
      if (!doc.exists) {
        console.log('No such document in get all follow! and id is', user_id);
        return null;
      } else {
        const foundUser = doc.data();
        const follow_id_list = foundUser.follow;
        for (let i = 0; i < follow_id_list.length; i++){
          const follow = await getUserById(follow_id_list[i]);
          documents_follow.push(follow);
          //documents_follow.push({ ...follow, id: follow.id });
          //console.log("this is follower", documents_follow);
        }
        return documents_follow;
      }
        
    }

    async function getAllPosts(user_id){
      const documents_posts = [];
      // const userRef = projectFirestore.collection("user").doc(user_id);
      // const doc = await userRef.get();
      // const userRef = projectFirestore.collection("user");
      // const doc = await userRef.where('googleId','==',user_id).get();
      const doc = await getUserById(user_id);
      if (doc == null) {
        console.log('No such document! in get all post', user_id);
        return null;
      } else {
        const foundUser = doc;
        const post_id_list = foundUser.post;
        post_id_list.reverse();
        for (let i = 0; i < post_id_list.length; i++){
          const post = await getPostById(post_id_list[i]);
          // documents_posts.push(post);
          documents_posts.push({
            ...post,
            id: post.id,
            createdAt: post.createdAt.toDate().toLocaleString(),
          });
          //documents_follow.push({ ...follow, id: follow.id });
         console.log("this is post", documents_posts);
        }
        return documents_posts;
      }
    }

    










  module.exports = { insertUser, 
                     getUserByGoogleId, 
                     getUserById,
                     checkUserExist, 
                     getSatisfiedUser, 
                     addFollows, 
                     addFollowers, 
                     deleteFollows, 
                     deleteFollowers,
                     updateUserInfo,
                     getAllFollowers,
                     getAllFollows,
                     getAllPosts
                   };




