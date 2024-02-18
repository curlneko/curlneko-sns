const jwt = require("jsonwebtoken");

const bcrypt = require("bcrypt");
const saltRounds = 10;

const User = require("../repository/userRepository");
const user = new User();

const { MySqlDBError, AuthError } = require("../exceptions/exceptions");

class Auth {
  async register(name, email, password) {
    console.log("service register")
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
      console.log(result)
      return result;
    } catch (e) {
      console.log(e)
      throw new MySqlDBError("fail to register", e.meta.target);
    }
  }

  async login(email, password) {
    // データの整理
    const where = {
      email: email,
    };

    // DB処理
    let result = {};
    try {
      result = await user.searchMany(where);
    } catch (e) {
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
      exp: Math.floor(Date.now() / 1000) + (60 * 60),
    };
    const token = jwt.sign(payload, "secret");
    return token;
  }

  async verifyToken(token) {
    console.log("verifyToken");
    console.log(token);
    const result = jwt.verify(token, "secret", (error, payload) => {
      if (error) {
        console.log(error);
        console.log("AuthError");
        return false;
      } else {
        console.log("verify ok");
        return true;
      }
    });
    console.log(result);
    return result;
  }
}

module.exports = Auth;
