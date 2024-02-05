const express = require("express");
const router = express.Router();

const jwt = require("jsonwebtoken");

const bcrypt = require("bcrypt");
const saltRounds = 10;

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

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

  try {
    const token = await auth.login(email, password);
    console.log(token);
    return res.status(200).json({
      token: token,
      status: "success",
    });
  } catch (e) {
    return res.status(400).json({
      error: e.name,
      message: e.message,
    });
  }
});

//Token確認API
router.get("/verify", async (req, res, next) => {
  const token = req.headers["authorization"];

  try {
    const user = await auth.verifyToken(token);
    return res.json({
      user,
    });
  } catch (e) {
    console.log(e);
    return res.status(403).json({
      error: e.name,
      message: e.message,
    });
  }
});

module.exports = router;
