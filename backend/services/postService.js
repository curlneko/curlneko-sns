const jwt = require("jsonwebtoken");

const PostRepository = require("../repository/postRepository");
const postRepository = new PostRepository();

const UserPostViewRepository = require("../repository/userPostViewRepository");
const userPostViewRepository = new UserPostViewRepository();

const { MySqlDBError, AuthError } = require("../exceptions/exceptions");

class PostService {
  async post(post, authorId) {

    // データの整理
    const data = {
      post: post,
      authorId: authorId,
    };

    // DB処理
    try {
      const result = await postRepository.insert(data);
      return result;
    } catch (e) {
      throw new MySqlDBError("fail to insert post", e.meta.target);
    }
  }

  async getAllUserPosts() {
    // DB処理
    try {
      const result = await userPostViewRepository.searchMany({});
      return result;
    } catch (e) {
      throw new MySqlDBError("fail to getAllPost", e.meta.target);
    }
  }
}

module.exports = PostService;
