const uuid = require("uuid");
const { projectStorage, projectFirestore, timestamp } = require("./config");

function useFirestore(collection) {
  projectFirestore
    .collection(collection)
    .orderBy("createdAt", "desc")
    .onSnapshot((snap) => {
      let documents = [];
      snap.forEach((doc) => {
        documents.push({ ...doc.data(), id: doc.id });
      });
    });
  return { docs };
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
    content,
  });

  return post_uuid;
}

module.exports = { uploadPost, useFirestore };
