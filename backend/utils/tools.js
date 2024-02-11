const Auth = require("../services/auth");
const auth = new Auth();

async function verify(token) {
  try {
    const user = await auth.verifyToken(token);
    return true;
  } catch (e) {
    return false;
  }
}

module.exports = verify;
