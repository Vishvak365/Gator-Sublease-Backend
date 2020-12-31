const express = require("express");
const app = express();
const port = 3000;
const dotenv = require("dotenv");
dotenv.config();
var account_create = require("./Routes/Accounts/Account_Creation");
// app.use(express.json(), function () {
//   console.log("asdf");
//   if (err) {
//     console.log("asdf");
//   }
// });
app.use(express.json(), function (err, req, res, next) {
  if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
    res.status(400).send({ code: 400, error: "bad request" });
  } else next();
});
app.get("/", (req, res) => {
  res.send("API access for Gator Sublease");
});
app.use("/api/account", account_create);

// app.listen(port, () => {
//   console.log(`Started on port ${port}`);
//   console.log(process.env.MONGO_URL);
// });

module.exports = app;
