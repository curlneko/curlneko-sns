const jwt = require("jsonwebtoken");

const bcrypt = require("bcrypt");
const saltRounds = 10;

const User = require("../repository/user");
const user = new User();

const { MySqlDBError, AuthError } = require("../exceptions/exceptions");

class Auth {
  async register(name, email, password) {
    // passwordのハッシュ化
    const hashedPassword = bcrypt.hashSync(password, saltRounds);

    // データの整理
    const data = {
      email: email,
      name: name,
      password: hashedPassword,
    };

    // DB処理
    try {
      const result = await user.insert(data);
      return result;
    } catch (e) {
      throw new MySqlDBError("fail to register", e.meta.target);
    }
  }

  async login(email, password) {
    // データの整理
    const where = {
      email: email,
    };

    // DB処理
    var result = {};
    try {
      result = await user.searchMany(where);
    } catch (e) {
      console.log(e);
      throw new MySqlDBError("fail to login", "");
    }

    if (result.length === 0) {
      throw new AuthError("email not found", "email");
    }

    bcrypt.compare(password, result[0].password, function (error, results) {
      if (error) {
        throw new AuthError(error.message, "password");
      }
      if (!results) {
        throw new AuthError("password is not correct", "password");
      }
    });

    //Tokenの発行　書き換え
    const payload = {
      id: result[0].id,
      name: result[0].name,
      email: result[0].email,
    };
    const token = jwt.sign(payload, "secret");
    return token;
  }

  async verifyToken(token) {
    jwt.verify(token, "secret", (error, user) => {
      if (error) {
        throw new AuthError("token is unvalid", "token");
      } else {
        return user;
      }
    });
  }
}

module.exports = Auth;
