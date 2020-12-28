var express = require("express");
var router = express.Router();
const dotenv = require("dotenv");
dotenv.config();

router.get("/create_account", function (req, res) {
  console.log(process.env.MONGO_URL);
  const query = req["query"];
  if (!query.username || !query.password)
    res.status(400).send("username or password query not included in request");
  res
    .json({
      Output: process.env.mongo_url,
      Yeet: "adsf",
    })
    .status(200)
    .send();
});
module.exports = router;
