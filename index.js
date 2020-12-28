const express = require("express");
const app = express();
const port = 3000;
var account_create = require("./Routes/Accounts/Account_Creation");

app.get("/", (req, res) => {
  res.send("API access for Gator Sublease");
});
app.use("/api/account", account_create);

app.listen(port, () => {
  console.log(`Started on port ${port}`);
});
