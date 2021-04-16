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

async function uploadPost(file) {
  console.log(file);
  const createdAt = timestamp();
  const fileName = file.originalname;
  const ref = projectStorage.ref();
  const storageRef = ref.child(fileName);
  const collectionRef = projectFirestore.collection("resturant_posts");
  let metadata = { contentType: file.mimetype, name: file.originalname };

  const URL = await storageRef
    .put(file.buffer, metadata)
    .snapshot.ref.getDownloadURL();
  console.log("finish uplaod: ", URL);
  return URL;
}
module.exports = { uploadPost, useFirestore };
