const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

class LikeRepository {
  async searchMany(where) {
    const likes = await prisma.like.findMany({
      where: where,
    });
    return likes;
  }

  async insert(data) {
    const like = await prisma.like.create({
      data: data,
    });
    return like;
  }

  async update(where) {
    const like = await prisma.like.update({
      where: where,
    });
    return like;
  }

  async delete(where, data) {
    const like = await prisma.like.delete({
      where: where,
      data: data,
    });
    return like;
  }
}

module.exports = LikeRepository;
