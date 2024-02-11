const express = require("express");
const router = express.Router();

const Auth = require("../services/auth");
const auth = new Auth();

// アカウント新規追加
router.post("/register", async (req, res, next) => {
  // データを取得
  const { name, email, password } = req.body;

  // サービス呼び出し
  try {
    await auth.register(name, email, password);
    return res.status(200).json({
      status: "success",
    });
  } catch (e) {
    return res.status(400).json({
      error: e.name,
      message: e.message,
    });
  }
});

router.post("/login", async (req, res, next) => {
  const { email, password } = req.body;
  console.log(req.body);

  try {
    const token = await auth.login(email, password);
    console.log(token);

    res.cookie("jwt", token, {
      sameSite: "none",
      secure: true,
      maxAge: 60 * 1000,
      httpOnly: true,
    });

    res.status(200).json({
      status: "success",
    });
  } catch (e) {
    res.status(400).json({
      error: e.name,
      message: e.message,
    });
  }
});

//Token確認API
router.get("/verify", async (req, res, next) => {
  const token = req.cookies.jwt;
  console.log(token);
  try {
    const user = await auth.verifyToken(token);
    return res.json({
      status: "verify success",
    });
  } catch (e) {
    return res.status(401).json({
      message: "you are not login",
    });
  }
});

module.exports = router;
