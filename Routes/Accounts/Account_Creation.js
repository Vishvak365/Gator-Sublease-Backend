var express = require("express");
var router = express.Router();
const account = require("../models/account");

router.post("/create_account", function (req, res) {
  req_body = req.body;
  if (
    !req_body.username ||
    !req_body.email ||
    !req_body.first_name ||
    !req_body.last_name ||
    !req_body.phone_number ||
    !req_body.password
  ) {
    res.status(400).send({ error: "Insufficient information" });
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
        /* istanbul ignore next */
        if (err.message.includes("E11000")) {
          res.status(409).send({
            error: "Email, Phone, or Username is already Taken",
          });
        }
      } else {
        res.status(200).send({
          success: "Account Created Successfully",
        });
      }
    });
  }
});
router.post("/remove_account", function (req, res) {
  if (!req.body.username) {
    res.status(400).send({ error: "Insufficient information" });
  } else {
    account.findOneAndDelete(
      { username: req.body.username },
      function (err, account) {
        /* istanbul ignore next */
        if (err) {
          /* istanbul ignore next */
          res.send(err);
        } else {
          res.status(200).send({ success: "Successfully removed user" });
        }
      }
    );
  }
});
module.exports = router;
