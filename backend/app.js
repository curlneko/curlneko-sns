const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");

// Routerの設定
const indexRouter = require("./routes/index");
const authRouter = require("./routes/auth");
const usersRouter = require("./routes/users");

const verify = require("./utils/tools");

var app = express();

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
  console.log(req.originalUrl);
  console.log(token);

  const url = req.originalUrl;

  if (url === "/auth/login") {
    console.log("want to login")
    if (token === undefined) {
      console.log("undefined");
      next();
    } else {
      const result = await verify(token)
      console.log(result);
      if (result === true) {
        console.log("you have login")
        return res.status(200).json({
          message: "you have login",
        });
      } else {
        next();
      }
    }
  } else if(url === "/auth/logout"){
    console.log("want to logout")
    if (token === undefined) {
      console.log("undefined");
      res.status(200).json({
        message: "you have logout",
      });
    } else {
      const result = await verify(token)
      console.log(result);
      if (result === true) {
        next();
      } else {
        console.log("you have logout")
        res.status(200).json({
          message: "you have logout",
        });
      }
    }
  }else {
    console.log("do others except login")
    if (token === undefined) {
      console.log("undefined");
      res.status(401).json({
        message: "you are not login",
      });
    } else {
      const result = await verify(token)
      if (result === true) {
        next();
      } else {
        res.status(401).json({
          message: "you are not login",
        });
      }
    }

  }
});

// Path設定
app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/auth", authRouter);

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
  res.render("error");
});

module.exports = app;
