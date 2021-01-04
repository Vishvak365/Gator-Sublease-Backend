const firebase = require("firebase-admin");
const dotenv = require("dotenv");
dotenv.config();
function authMiddleware(request, response, next) {
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
      console.log("yeet");
      next();
    })
    .catch(() => {
      if (process.env.PROD)
        response.send({ message: "Could not authorize" }).status(403);
      else next();
    });
}

module.exports = authMiddleware;
