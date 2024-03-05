const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

class PostRepository {
  async searchMany(where) {
    const posts = await prisma.post.findMany({
      where: where,
    });
    return posts;
  }

  async insert(data) {
    const post = await prisma.post.create({
      data: data,
    });
    return post;
  }

  async update(where) {
    const post = await prisma.post.update({
      where: where,
    });
    return post;
  }

  async delete(where, data) {
    const post = await prisma.post.delete({
      where: where,
      data: data,
    });
    return post;
  }
}

module.exports = PostRepository;
