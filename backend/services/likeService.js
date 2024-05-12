const jwt = require("jsonwebtoken");

const LikeRepository = require("../repository/likeRepository");
const likeRepository = new LikeRepository();

const PostRepository = require("../repository/postRepository");
const postRepository = new PostRepository();

const { MySqlDBError, AuthError } = require("../exceptions/exceptions");

class LikeService {
  async like(like, authorId) {

    // データの整理
    const likeData = {
      postId: like.postId,
      authorId: authorId,
      isCanceled: like.isCanceled
    };

    // データの整理
    const postWhere = {
      id: like.postId,
    };

    const postData = {
      isLiked: true,
    };

    // DB処理
    try {
      await likeRepository.insert(likeData);
      await postRepository.update(postWhere, postData);
      return true;
    } catch (e) {
      throw new MySqlDBError("fail to insert like", e.meta.target);
    }

  }

  async getAllUserLikes() {
    // DB処理
    try {
      const result = await likeRepository.searchMany({});
      return result;
    } catch (e) {
      console.log(e)
      throw new MySqlDBError("fail to getAllLikes", e.meta.target);
    }
  }
}

module.exports = LikeService;
