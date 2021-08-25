const {
  uploadPost,
  getAllPosts,
  uploadComment,
  getComments,
  addLikes,
  deleteLikes,
  getAllFriendsPosts,
} = require("../firebase/useStorage");

const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer();

router.get("/all_posts", async (req, res) => {
  res.json({ posts: await getAllPosts("restaurant_posts") });
});

router.get("/:id", async (req, res) => {
  console.log("friend's post");
  const user_id = req.params.id;
  res.json({ posts: await getAllFriendsPosts(user_id, "restaurant_posts") });
});

router.post("/addLikes", async (req, res) => {
  const { user_id, post_id } = { ...req.body };
  await addLikes(user_id, post_id);
  res.json("OK");
});

router.delete("/deleteLikes", async (req, res) => {
  const { user_id, post_id } = { ...req.body };
  await deleteLikes(user_id, post_id);
  res.json("OK DELETE LIKES");
});

router.post("/addComment", async (req, res) => {
  console.log(req.body);
  comment_info = await uploadComment(req.body);

  res.json({ msg: "Successfully Added Comment!" });
});

router.get("/:id/comments", async (req, res) => {
  console.log(req.params.id);
  const post_id = req.params.id;
  const comments = await getComments("post_comments", post_id);
  console.log(comments);
  res.json({ comments });
});

router.post("/upload", upload.single("file"), async (req, res, next) => {
  const { file, body } = req;

  if (
    file === null ||
    (file.mimetype != "image/jpeg" && file.mimetype != "image/png")
  ) {
    console.log("wrong file type");
    return res
      .status(400)
      .json({ msg: "File uploaded Failed! Check file type!" });
  }
  post_info = await uploadPost(file, body);

  console.log("post_info: ", post_info);
  res.json({ msg: "Successfully Uploaded!" });
});

module.exports = router;
