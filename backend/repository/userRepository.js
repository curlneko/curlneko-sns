const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

class User {
  async searchMany(where) {
    const users = await prisma.user.findMany({
      where: where,
    });
    return users;
  }

  async insert(data) {
    const user = await prisma.user.create({
      data: data,
    });
    return user;
  }

  async update(where) {
    const user = await prisma.user.update({
      where: where,
    });
    return user;
  }

  async delete(where, data) {
    const user = await prisma.user.delete({
      where: where,
      data: data,
    });
    return user;
  }
}

module.exports = User;
