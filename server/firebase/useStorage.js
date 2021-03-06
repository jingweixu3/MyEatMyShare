const uuid = require("uuid");
const {
  projectStorage,
  projectFirestore,
  timestamp,
  filedValue,
} = require("./config");
const Axios = require("axios");

async function addLikes(user_id, post_id) {
  const postRef = projectFirestore.collection("restaurant_posts").doc(post_id);

  const unionRes = await postRef.update({
    likes: filedValue.arrayUnion(user_id),
  });
}

async function deleteLikes(user_id, post_id) {
  const postRef = projectFirestore.collection("restaurant_posts").doc(post_id);
  const unionRes = await postRef.update({
    likes: filedValue.arrayRemove(user_id),
  });
}

async function getAllFriendsPosts(user_id, collection) {
  let documents = [];
  console.log(user_id);

  const doc = await projectFirestore.collection("user").doc(user_id).get();
  if (!doc.exists) {
    return documents;
  } else {
    let friends = doc.data().follow;
    friends.push(user_id);
    for (const friend of friends) {
      const snapshot = await projectFirestore
        .collection(collection)
        .where("user_id", "==", friend)
        .limit(10)
        .get();

      snapshot.forEach((doc) => {
        documents.push({
          ...doc.data(),
          id: doc.id,
          createdAt: doc.data().createdAt.toDate().toLocaleString(),
        });
      });
    }
    documents = documents.sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );
    return documents;
  }
}

//modified
async function getFriendsPosts(collection, restaurant_id) {
  let documents = [];
  const snapshot = await projectFirestore
    .collection(collection)
    .where("restaurant_id", "==", restaurant_id)
    // .where("user_id", "==", userid)
    .get();

  snapshot.forEach((doc) => {
    documents.push({ ...doc.data(), id: doc.id });
  });
  return documents;
}

async function getAllPosts(collection) {
  let documents = [];
  const snapshot = await projectFirestore
    .collection(collection)
    .orderBy("createdAt", "desc")
    .get();

  snapshot.forEach((doc) => {
    documents.push({
      ...doc.data(),
      id: doc.id,
      createdAt: doc.data().createdAt.toDate().toLocaleString(),
    });
  });
  return documents;
}

async function getPostById(id) {
  console.log("get post id", id);
  const postRef = projectFirestore.collection("restaurant_posts").doc(id);
  const doc = await postRef.get();
  if (!doc.exists) {
    console.log("No such document!");
    return null;
  } else {
    console.log("Document data:", doc.data());
    return doc.data();
  }
}

async function getComments(collection, post_ID) {
  let documents = [];
  const snapshot = await projectFirestore
    .collection(collection)
    .where("post_id", "==", post_ID)
    .get();

  snapshot.forEach((doc) => {
    documents.push({ ...doc.data(), id: doc.id });
  });
  return documents;
}
async function uploadComment(body) {
  let { comment, username, post_id, user_id } = { ...body };
  console.log(comment, username, post_id, user_id);
  const collectionRef = projectFirestore.collection("post_comments");
  const res = await collectionRef.add({
    comment,
    username,
    post_id,
    createdAt: timestamp(),
    user_id,
  });

  const comment_id = res.id;
  const postRef = projectFirestore.collection("restaurant_posts").doc(post_id);

  const unionRes = await postRef.update({
    comments: filedValue.arrayUnion(comment_id),
  });
}

async function uploadPost(file, body) {
  const post_uuid = uuid.v4();
  const fileName = post_uuid + "_" + file.originalname;
  const createdAt = timestamp();

  const storageRef = projectStorage.ref().child(fileName);
  const collectionRef = projectFirestore.collection("restaurant_posts");

  let metadata = { contentType: file.mimetype, name: file.originalname };
  let restaurant_id = body.restaurant_id;
  let content = body.content;
  let user_id = body.user_id;
  let user_name = body.user_name;

  let res = await Axios.get(
    `https://maps.googleapis.com/maps/api/place/details/json?place_id=${restaurant_id}&fields=name&key=AIzaSyDGx9NguhqUd5CeQR8FA12jwLTyFgBekxU`
  );

  console.log(res.data.result.name);

  let restaurant_name = res.data.result.name;
  await storageRef.put(file.buffer, metadata);
  const URL = await storageRef.getDownloadURL();
  console.log("finish upload: ", URL);

  const post = await collectionRef.add({
    url: URL,
    createdAt,
    restaurant_id,
    restaurant_name,
    content,
    comments: [],
    likes: [],
    user_id,
    user_name,
  });

  const userRef = projectFirestore.collection("user").doc(user_id);
  const unionRes = await userRef.update({
    post: filedValue.arrayUnion(post.id),
  });

  return post_uuid;
}

module.exports = {
  uploadPost,
  getAllPosts,
  uploadComment,
  getComments,
  addLikes,
  deleteLikes,
  getPostById,
  getAllFriendsPosts,
  getFriendsPosts,
};
