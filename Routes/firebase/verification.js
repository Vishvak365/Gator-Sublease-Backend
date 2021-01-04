const firebase = require("firebase-admin");
const dotenv = require("dotenv");
dotenv.config();
/* istanbul ignore next */
function authMiddleware(request, response, next) {
  if (request.path === "/api/account/fb/create_account") {
    return next();
  }
  if (process.env.NODE_ENV.toLowerCase().includes("prod")) {
    console.log("Verifying");
    const headerToken = request.headers.authorization;
    if (!headerToken) {
      return response.send({ message: "No token provided" }).status(401);
    }

    if (headerToken && headerToken.split(" ")[0] !== "Bearer") {
      response.send({ message: "Invalid token" }).status(401);
    }

    const token = headerToken.split(" ")[1];
    firebase
      .auth()
      .verifyIdToken(token)
      .then(() => {
        next();
      })
      .catch(() => {
        response.send({ message: "Could not authorize" }).status(403);
      });
  } else {
    next();
  }
}

module.exports = authMiddleware;
