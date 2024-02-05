class MySqlDBError extends Error {
  constructor(message, target) {
    super(message); // (1)
    this.name = "MySqlDBError"; // (2)
    this.target = target;
  }
}

class AuthError extends Error {
  constructor(message, target) {
    super(message); // (1)
    this.name = "AuthError"; // (2)
    this.target = target;
  }
}

module.exports = { MySqlDBError, AuthError };
