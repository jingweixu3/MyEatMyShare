const uuid = require("uuid");
const {
  projectStorage,
  projectFirestore,
  timestamp,
  filedValue,
} = require("./config");
const Axios = require("axios");

async function getAllPosts(collection) {
  let documents = [];
  const snapshot = await projectFirestore
    .collection(collection)
    .orderBy("createdAt", "desc")
    .get();

  snapshot.forEach((doc) => {
    documents.push({ ...doc.data(), id: doc.id });
  });
  return documents;
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
  let { comment, username, post_id } = { ...body };
  console.log(comment, username, post_id);
  const collectionRef = projectFirestore.collection("post_comments");
  const res = await collectionRef.add({
    comment,
    username,
    post_id,
    createdAt: timestamp(),
  });

  const comment_id = res.id;
  const postRef = projectFirestore.collection("resturant_posts").doc(post_id);

  const unionRes = await postRef.update({
    comments: filedValue.arrayUnion(comment_id),
  });
}

async function uploadPost(file, body) {
  const post_uuid = uuid.v4();
  const fileName = post_uuid + "_" + file.originalname;
  const createdAt = timestamp();

  const storageRef = projectStorage.ref().child(fileName);
  const collectionRef = projectFirestore.collection("resturant_posts");

  let metadata = { contentType: file.mimetype, name: file.originalname };
  let resturant_id = body.resturant_id;
  let content = body.content;

  let res = await Axios.get(
    `https://maps.googleapis.com/maps/api/place/details/json?place_id=${resturant_id}&fields=name&key=AIzaSyDGx9NguhqUd5CeQR8FA12jwLTyFgBekxU`
  );

  console.log(res.data.result.name);

  let resturant_name = res.data.result.name;
  await storageRef.put(file.buffer, metadata);
  const URL = await storageRef.getDownloadURL();
  console.log("finish uplaod: ", URL);

  await collectionRef.add({
    fileName,
    url: URL,
    createdAt,
    post_uuid,
    resturant_id,
    resturant_name,
    content,
    comments: [],
  });

  return post_uuid;
}

module.exports = { uploadPost, getAllPosts, uploadComment, getComments };
