const uuid = require("uuid");
const { projectStorage, projectFirestore, timestamp } = require("./config");

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

async function uploadPost(file, body) {
  console.log(file);
  const post_uuid = uuid.v4();
  const fileName = post_uuid + "_" + file.originalname;
  const createdAt = timestamp();

  const storageRef = projectStorage.ref().child(fileName);
  const collectionRef = projectFirestore.collection("resturant_posts");

  let metadata = { contentType: file.mimetype, name: file.originalname };
  let resturant = body.resturant;
  let content = body.content;
  let resturant_coor = body.resturant_coor;

  await storageRef.put(file.buffer, metadata);
  const URL = await storageRef.getDownloadURL();
  console.log("finish uplaod: ", URL);

  await collectionRef.add({
    fileName,
    url: URL,
    createdAt,
    fileName,
    post_uuid,
    resturant,
    resturant_coor,
    content,
  });

  return post_uuid;
}

module.exports = { uploadPost, getAllPosts };
