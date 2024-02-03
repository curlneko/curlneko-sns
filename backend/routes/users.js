var express = require("express");
var router = express.Router();

const {PrismaClient} = require("@prisma/client");

/* GET users listing. */
// router.get('/', function(req, res, next) {
//   // res.send('respond with a resource');
//   res.json([{
//     id: 1,
//     name: "yujiro1"
//   }, {
//     id: 2,
//     name: "yuziro2"
//   }]);
// });

router.get("/", async (req, res, next) => {
  const prisma = new PrismaClient();
  const users = await prisma.user.findMany();
  res.json(users);
});

module.exports = router;
