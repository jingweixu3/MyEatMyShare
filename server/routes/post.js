const {
  uploadPost,
  getAllPosts,
  uploadComment,
} = require("../firebase/useStorage");
// const requireLogin = require("../middlewares/requireLogin");

const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer();

router.get("/all_posts", async (req, res) => {
  res.json({ posts: await getAllPosts("resturant_posts") });
});

router.post("/addComment", async (req, res) => {
  console.log(req.body);
  comment_info = await uploadComment(req.body);

  res.json({ msg: "Successfully Added Comment!" });
});

router.get("/:id/comments", async (req, res) => {
  console.log(req.params.id);
  const post_id = req.params.id;
  const comments = awaitgetComments("post_comments", post_id);
  res.json({ commenst: comments });
});
router.post(
  "/upload",
  // requireLogin,
  upload.single("file"),
  async (req, res, next) => {
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
    // console.log(file);
    post_info = await uploadPost(file, body);

    console.log("post_info: ", post_info);
    res.json({ msg: "Successfully Uploaded!" });
  }
);

module.exports = router;
