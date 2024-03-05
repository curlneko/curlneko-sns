const Auth = require("../services/authService");
const auth = new Auth();

async function verify(token) {
  try {
    const result = await auth.verifyToken(token);
    return result;
  } catch (e) {
    return false;
  }
}

module.exports = verify;
