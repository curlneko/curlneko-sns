const express = require("express");
const { checkSchema, validationResult } = require('express-validator');
const router = express.Router();

const { registerSchema } = require("./schema");

const Auth = require("../../services/authService");
const auth = new Auth();

// アカウント新規追加
router.post("/register", checkSchema(registerSchema), async (req, res, next) => {
  const result = validationResult(req);

  if (result.errors.length === 0) {
    // データを取得
    const { name, email, password } = req.body;

    //サービス呼び出し
    try {
      const result = await auth.register(name, email, password);
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
  }else{
    res.status(400).json({
      result: {
        status: false,
        statusCode: "",
        message: "invalid param",
      }
    });
  }


});

router.post("/login", async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const token = await auth.login(email, password);

    res.cookie("jwt", token, {
      sameSite: "none",
      secure: true,
      maxAge: 60 * 60 * 1000,
      httpOnly: true,
    });

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

//Token確認API
router.get("/verify", async (req, res, next) => {
  const token = req.cookies.jwt;
  try {
    const user = await auth.verifyToken(token);
    return res.json({
      result: {
        status: true,
        statusCode: "",
        message: "verify success",
      }
    });
  } catch (e) {
    return res.status(401).json({
      result: {
        status: false,
        statusCode: "",
        message: "you are not login",
      }

    });
  }
});

router.post("/logout", async (req, res, next) => {
  res.clearCookie("jwt");
  res.json({
    result: {
      status: true,
      statusCode: "",
      message: "logout success",
    }
  });
});

module.exports = router;
