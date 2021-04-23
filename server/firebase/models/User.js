// const mongoose = require('mongoose');

// const { Schema } = mongoose;


// // const userSchema = new Schema ({
// //     googleId: String,
// //     firstName:String,
// //     lastName:String,
// //     email:String
// // });

// const UserSchema = new Schema({
//     googleId: {
//         type:String,
//         unique:true
//     },
//     firstName: {
//         type: String,
//         trim: true,
//     },
//     lastName: {
//         type: String,
//         trim: true,
//     },
//     email: {
//         type: String,
//         unique: true,
//     },
//     friends: [{
//         type: Schema.Types.ObjectId,
//         ref: 'User'
//     }],
//     // blogs: [{
//     //     type: Schema.Types.ObjectId,
//     //     ref: 'blogs'
//     // }]
// });

// UserSchema.virtual('friendCount').get(function () {
//     return this.friends.length
// })



// mongoose.model('users', UserSchema);

//var firebase = require('firebase');

const { projectStorage,projectFirestore, timestamp } = require("../config");

async function insertUser(profile) {
    console.log("proooooo", profile);
    console.log("iddddd", profile.id);

    //const createdAt = timestamp();
    //console.log("photo is", photo);
    const googleId = profile.id;
    // const photo_info = googleId + "_" + photo;
    
    
    //const storageRef = projectStorage.ref().child(photo);
    const userRef = projectFirestore.collection("user");
    
    let firstName = profile.name.givenName;
    let lastName = profile.name.familyName;
    let email = profile.emails[0].value;
    let friend = [];
    let post = [];
    let avatar = "";

    //console.log("firstname", firstName, "lastName", lastName, "emial", email);

    // await storageRef.put(photo);
    // const URL = await storageRef.getDownloadURL();
    // console.log("finish uplaod photo: ", URL);
  
    await userRef.add({
      googleId,
      firstName,
      lastName,
      email,
      friend,
      post,
      avatar
    });
    console.log("insert google id", googleId);
    const user = await getUser(googleId);
    return user;
  }

  async function getUser(googleId) {
     //console.log("get google id", googleId);
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





  module.exports = { insertUser, getUser };




