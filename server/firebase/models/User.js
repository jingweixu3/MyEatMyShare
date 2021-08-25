const {
  projectStorage,
  projectFirestore,
  timestamp,
  filedValue,
} = require("../config");
const { getPostById } = require("../useStorage");

async function insertUser(profile) {
  const createdAt = timestamp();
  const googleId = profile.id;
  const userRef = projectFirestore.collection("user");

  let name =
    profile.name.givenName.toLowerCase() +
    " " +
    profile.name.familyName.toLowerCase();
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
    lastName,
  });
  console.log("insert google id", googleId);
  const user = await getUserByGoogleId(googleId);
  return user;
}

async function getUserByGoogleId(googleId) {
  documents = [];
  const userRef = projectFirestore.collection("user");
  const doc = await userRef.where("googleId", "==", googleId).get();
  if (doc.empty) {
    console.log("No such document!!!!!");
    return null;
  } else {
    doc.forEach((doc) => {
      documents.push({ ...doc.data(), id: doc.id });
    });
    return documents[0];
  }
}

async function getUserById(id) {
  const document_getUserById = [];
  const userRef = projectFirestore.collection("user").doc(id);
  const doc = await userRef.get();
  if (!doc.exists) {
    console.log("No such document in getUserByid! and id is", id);
    return null;
  } else {
    document_getUserById.push({ ...doc.data(), id: doc.id });
    return document_getUserById[0];
  }
}

async function getSatisfiedUser(name) {
  name = name.toLowerCase();
  documents_1 = [];

  async function getFirstNameOrLastName() {
    const userRef = projectFirestore.collection("user");
    const firstNameRes = userRef.where("firstName", "==", name).get();
    const lastNameRes = userRef.where("lastName", "==", name).get();

    const [firstNameQuerySnapshot, lastNameQuerySnapshot] = await Promise.all([
      firstNameRes,
      lastNameRes,
    ]);

    const firstNameArray = firstNameQuerySnapshot.docs;
    const lastNameArray = lastNameQuerySnapshot.docs;
    const nameArray = firstNameArray.concat(lastNameArray);

    return nameArray;
  }

  const snapshot = await getFirstNameOrLastName();

  snapshot.forEach((doc) => {
    documents_1.push({ ...doc.data(), id: doc.id });
  });
  return documents_1;
}

async function checkUserExist(googleId) {
  const existUser = await getUserByGoogleId(googleId);
  if (existUser != null) {
    return true;
  } else {
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

async function updateUserInfo(
  user_id,
  firstName,
  lastName,
  location,
  note,
  file
) {
  if (file != null) {
    const fileName = user_id + "_" + file.originalname;
    const storageRef = projectStorage.ref().child(fileName);
    let metadata = { contentType: file.mimetype, name: file.originalname };
    await storageRef.put(file.buffer, metadata);
    const URL = await storageRef.getDownloadURL();
    console.log("finish upload: ", URL);
    const userRef = projectFirestore.collection("user").doc(user_id);
    const unionRes = await userRef.update({
      firstName: firstName,
      lastName: lastName,
      location: location,
      note: note,
      avatar: URL,
    });
    const returnUser = await getUserById(user_id);
    console.log("updated user", returnUser);
    return returnUser;
  } else {
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

async function getAllFollowers(user_id) {
  const documents_follower = [];
  const userRef = projectFirestore.collection("user").doc(user_id);
  const doc = await userRef.get();
  if (!doc.exists) {
    console.log("No such document in get all follower and id is", user_id);
    return null;
  } else {
    const foundUser = doc.data();
    const follower_id_list = foundUser.follower;
    for (let i = 0; i < follower_id_list.length; i++) {
      const follower = await getUserById(follower_id_list[i]);
      documents_follower.push(follower);
    }
    return documents_follower;
  }
}

async function getAllFollows(user_id) {
  const documents_follow = [];
  const userRef = projectFirestore.collection("user").doc(user_id);
  const doc = await userRef.get();
  if (!doc.exists) {
    console.log("No such document in get all follow! and id is", user_id);
    return null;
  } else {
    const foundUser = doc.data();
    const follow_id_list = foundUser.follow;
    for (let i = 0; i < follow_id_list.length; i++) {
      const follow = await getUserById(follow_id_list[i]);
      documents_follow.push(follow);
    }
    return documents_follow;
  }
}

async function getAllPosts(user_id) {
  const documents_posts = [];
  const doc = await getUserById(user_id);
  if (doc == null) {
    console.log("No such document! in get all post", user_id);
    return null;
  } else {
    const foundUser = doc;
    const post_id_list = foundUser.post;
    post_id_list.reverse();
    for (let i = 0; i < post_id_list.length; i++) {
      const post = await getPostById(post_id_list[i]);
      documents_posts.push({
        ...post,
        id: post.id,
        createdAt: post.createdAt.toDate().toLocaleString(),
      });
      console.log("this is post", documents_posts);
    }
    return documents_posts;
  }
}

module.exports = {
  insertUser,
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
  getAllPosts,
};
