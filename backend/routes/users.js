var express = require("express");
var router = express.Router();

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

  const user = await prisma.user.create({
    data: {
      email: email,
      name: name,
      password: hashedPassword,
    },
  });
  res.status(200).json({
    status: "success",
  });
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
    return res.status(400).json(e);
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
    res.status(400).json(e);
  }
});

router.post("/login", async (req, res, next) => {
  const { email, password } = req.body;

  const user = await prisma.user.findMany({
    where: {
      email: email,
    },
  });
  if (user.length === 0) {
    return res.status(400).json({
      message: "email not found",
    });
  }

  bcrypt.compare(password, user[0].password, function (error, results) {
    if (error) {
      return res.json({
        error: error.message,
      });
    }
    if (!results) {
      return res.json({
        message: "password is not correct",
      });
    }
    return res.json({
      message: "password is correct",
    });
  });

});

module.exports = router;
