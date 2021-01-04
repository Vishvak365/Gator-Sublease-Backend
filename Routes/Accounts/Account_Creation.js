var express = require("express");
var router = express.Router();
const account = require("../models/account");
const firebase = require("../firebase/config");
router.post("/fb/create_account", function (req, res) {
  if (!req.body.email || !req.body.password) {
    res.status(400).send({ message: "Email or Password not provided" });
  } else {
    firebase
      .auth()
      .createUser({
        email: req.body.email,
        password: req.body.password,
      })
      .then((userRecord) => {
        console.log("Successfully created new user:", userRecord.uid);
        res.status(200).json(userRecord);
      })
      .catch((error) => {
        res.status(400).json(error.errorInfo).send();
      });
  }
});
router.post("/fb/remove_account", function (req, res) {
  if (!req.body.uid) {
    res.status(400).send({ message: "UID not provided" });
  } else {
    firebase
      .auth()
      .deleteUser(req.body.uid)
      .then((message) => {
        res.status(200).json({ message: "Successfully removed user" });
      })
      .catch((error) => {
        res.status(400).json(error.errorInfo).send();
      });
  }
});
router.post("/fb/login", function (req, res) {
  const headerToken = req.headers.authorization;
  if (!headerToken) {
    return res.send({ message: "No token provided" }).status(401);
  }

  if (headerToken && headerToken.split(" ")[0] !== "Bearer") {
    res.send({ message: "Invalid token" }).status(401);
  }

  const token = headerToken.split(" ")[1];
  firebase
    .auth()
    .verifyIdToken(token)
    .then(() => {
      /* istanbul ignore next */
      next();
    })
    .catch((error) => {
      res.status(403).send(error.errorInfo);
    });
});

module.exports = router;
