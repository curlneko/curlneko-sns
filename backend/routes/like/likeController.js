var express = require("express");
var router = express.Router();

const jwt = require("jsonwebtoken");

const bcrypt = require("bcrypt");
const saltRounds = 10;

const LikeService = require("../../services/likeService");
const likeService = new LikeService();

router.get("/", async (req, res, next) => {
  try {
    const likes = await likeService.getAllLikes();
    console.log(likes)
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
  const { like } = req.body;
  const authorId = res.locals.jwt.id;

  try {
    const result = await likeService.like(like, authorId);
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
