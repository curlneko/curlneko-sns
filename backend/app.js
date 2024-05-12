const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");

// Routerの設定
const authRouter = require("./routes/auth/authController");
const userRouter = require("./routes/user/userController");
const postRouter = require("./routes/post/postController");
const profileController = require("./routes/profile/profileController");
const likeController = require("./routes/like/likeController");

// ミドルウェア
const verify = require("./middleware/tokenHandler");

// http
let app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

//. 全てのリクエストに対して前処理
app.use("/*", async (req, res, next) => {
  const token = req.cookies.jwt;
  const url = req.originalUrl;

  if (url === "/auth/login") {
    console.log("want to login")
    if (token === undefined) {
      console.log("undefined");
      next();
    } else {
      const result = await verify(token)
      if (result) {
        console.log("you have login")
        return res.status(200).json({
          result: {
            status: true,
            statusCode: "",
            message: "you have login",
          }
        });
      } else {
        next();
      }
    }
  } else if (url === "/auth/logout") {
    console.log("want to logout")
    if (token === undefined) {
      console.log("undefined");
      res.status(200).json({
        result: {
          status: false,
          statusCode: "",
          message: "you have logout",
        }
      });
    } else {
      const result = await verify(token)
      if (result) {
        next();
      } else {
        console.log("you have logout")
        res.status(200).json({
          result: {
            status: false,
            statusCode: "",
            message: "you have logout",
          }
        });
      }
    }
  } else if (url === "/auth/register") {
    console.log("want to register")
    next()
  } else {
    console.log("do others except auth")
    if (token === undefined) {
      console.log("undefined");
      res.status(401).json({
        result: {
          status: false,
          statusCode: "",
          message: "you are not login",
        }
      });
    } else {
      const result = await verify(token)
      if (result) {
        res.locals.jwt = result;
        next();
      } else {
        res.status(401).json({
          result: {
            status: false,
            statusCode: "",
            message: "you are not login",
          }
        });
      }
    }

  }
});

// Path設定
app.use("/users", userRouter);
app.use("/auth", authRouter);
app.use("/post", postRouter);
app.use("/profile", profileController);
app.use("/like", likeController);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  console.log(err)
  // res.render("error");
});

module.exports = app;
