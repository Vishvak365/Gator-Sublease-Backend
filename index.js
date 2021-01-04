const express = require("express");
const app = express();
const port = 3000;
const dotenv = require("dotenv");
const authMiddleware = require("./Routes/firebase/verification");
dotenv.config();
var account_create = require("./Routes/Accounts/Account_Creation");
/* istanbul ignore next */
app.use(express.json(), function (err, req, res, next) {
  /* istanbul ignore next */
  if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
    /* istanbul ignore next */
    res.status(400).send({ code: 400, error: "bad request" });
  } else next();
});
app.get("/", (req, res) => {
  res.send("API access for Gator Sublease");
});
app.use("/", authMiddleware);
app.use("/api/account", account_create);

module.exports = app;
