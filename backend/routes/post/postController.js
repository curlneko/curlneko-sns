var express = require("express");
var router = express.Router();

const jwt = require("jsonwebtoken");

const bcrypt = require("bcrypt");
const saltRounds = 10;

const PostService = require("../../services/postService");
const postService = new PostService();

router.get("/", async (req, res, next) => {
  try {
    const posts = await postService.getAllPost();
    return res.json({
      result: {
        status: true,
        statusCode: "",
        message: "success",
      },
      data: posts,
    });
  } catch (e) {
    return res.status(401).json({
      result: {
        status: false,
        statusCode: "",
        message: "you are not login",
      }

    });
  };
});

router.post("/", async (req, res, next) => {
  // データを取得
  const { post } = req.body;
  const authorId = res.locals.jwt.id;

  console.log(res.locals);
  console.log(authorId);


  try {
    const result = await postService.post(post, authorId);
    res.status(200).json({
      result: {
        status: true,
        statusCode: "",
        message: "success",
      }
    });
  } catch (e) {
    res.status(400).json({
      result: {
        status: false,
        statusCode: "",
        error: e.name,
        message: e.message,
      }
    });
  }

});

router.put("/:id", async (req, res, next) => {

});

router.delete("/:id", async (req, res, next) => {

});

module.exports = router;
