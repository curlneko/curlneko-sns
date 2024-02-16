const Auth = require("../services/authService");
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
