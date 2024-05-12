const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

class UserPostViewRepository {
  async searchMany(where) {
    const userPosts = await prisma.user_post.findMany({
      where: where,
    });
    return userPosts;
  }

  async insert(data) {
    const userPost = await prisma.user_post.create({
      data: data,
    });
    return userPost;
  }

  async update(where) {
    const userPost = await prisma.user_post.update({
      where: where,
    });
    return userPost;
  }

  async delete(where, data) {
    const userPost = await prisma.user_post.delete({
      where: where,
      data: data,
    });
    return userPost;
  }
}

module.exports = UserPostViewRepository;
