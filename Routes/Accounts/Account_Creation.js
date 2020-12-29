var express = require("express");
var router = express.Router();
const account = require("../models/account");

router.post("/create_account", function (req, res) {
  if (!req.body.username || !req.body.password) {
    res.status(400).send("username or password not included in body");
  } else {
    let new_account = new account({
      username: req.body.username,
      email: req.body.email,
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      phone_number: req.body.phone_number,
      password: req.body.password,
    });
    new_account.save(function (err, account) {
      if (err) {
        res
          .status(409)
          .json({
            error: "Email, Phone, or Username is already Taken",
          })
          .send();
        console.log(err.message.includes("E11000"));
      } else {
        console.log(account.username);
        res
          .json({
            success: "Account Created Successfully",
          })
          .status(200)
          .send();
      }
    });
  }
});

module.exports = router;
