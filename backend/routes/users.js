var express = require("express");
var router = express.Router();

const jwt = require("jsonwebtoken");

const bcrypt = require("bcrypt");
const saltRounds = 10;

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

router.get("/", async (req, res, next) => {
  const users = await prisma.user.findMany();
  res.json(users);
});

router.post("/", async (req, res, next) => {
  const { name, email, password } = req.body;
  const hashedPassword = bcrypt.hashSync(password, saltRounds);
  try {
    const user = await prisma.user.create({
      data: {
        email: email,
        name: name,
        password: hashedPassword,
      },
    });
    return res.status(200).json({
      status: "success",
    });
  } catch (e) {
    return res.status(400).json({
      error: e.name,
      message: "fail to register",
    });
  }
});

router.put("/:id", async (req, res, next) => {
  const id = req.params.id;
  const { name } = req.body;

  try {
    const user = await prisma.user.update({
      where: {
        id: Number(id),
      },
      data: {
        name: name,
      },
    });
    return res.json(user);
  } catch (e) {
    return res.status(400).json({
      error: e.name,
      message: e.meta.cause,
    });
  }
});

router.delete("/:id", async (req, res, next) => {
  const id = req.params.id;

  try {
    const user = await prisma.user.delete({
      where: {
        id: Number(id),
      },
    });
    res.json(user);
  } catch (e) {
    return res.status(400).json({
      error: e.name,
      message: e.meta.cause,
    });
  }
});

module.exports = router;
