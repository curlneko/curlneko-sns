var express = require("express");
var router = express.Router();

const upload = require("../../middleware/multerHandler");

const jwt = require("jsonwebtoken");

const bcrypt = require("bcrypt");
const saltRounds = 10;

const PostService = require("../../services/postService");
const postService = new PostService();

router.get("/", async (req, res, next) => {

});

router.put("/", upload.any(), async (req, res, next) => {
  // データを取得
  console.log("test back")
  console.log(req.files);

  res.status(200).json({
    result: {
      status: true,
      statusCode: "",
      message: "success",
    },
    data: {
      url: "http://localhost:8083/images/" + req.files[0].filename
    }
  });


});

module.exports = router;
