var express = require("express");
var router = express.Router();
const dotenv = require("dotenv");
dotenv.config();
// var MongoClient = require("mongodb").MongoClient;
// var url = process.env.MONGO_URL;
const mongoose = require("mongoose");
mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true });

const Schema = mongoose.Schema;
const AccountSchema = new Schema({
  username: { type: String, unique: true, required: true },
  email: { type: String, unique: true },
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  phone_number: { type: String, required: true },
  updated: { type: Date, default: Date.now },
});

const Model = mongoose.model;
const Account = Model("Dev_TESTING", AccountSchema, "account");

router.get("/create_account", function (req, res) {
  const query = req["query"];
  if (!query.username || !query.password)
    res.status(400).send("username or password query not included in request");
  else {
    let new_account = new Account({
      username: "bitwidget",
      email: "asdf",
      first_name: "vish",
      last_name: "asdf",
      phone_number: "2312312",
    });
    // Account.find({ username: "bitwidget" }, function (err, account) {
    //   console.log(account[0].first_name);
    // });
    new_account.save(function (err, account) {
      if (err) console.log(err.message.includes("E11000"));
      else console.log(account.username);
    });
    // MongoClient.connect(url, function (err, db) {
    //   if (err) throw err;
    //   console.log("Database created!");
    //   db.close();
    // });
    // MongoClient.connect(url, function (err, db) {
    //   if (err) console.log(err);
    //   var dbo = db.db("Dev_TESTING");
    //   let test = { name: "Vishvak Seenichamy", phone: "215656883565" };
    //   dbo.collection("accounts").insertOne(test);
    //   //   dbo.createCollection("accounts", function (err, res) {
    //   //     if (err) throw err;
    //   //     console.log("Collection created!");
    //   //     db.close();
    //   //   });
    // });
  }
  res
    .json({
      Yeet: "adsf",
    })
    .status(200)
    .send();
});
module.exports = router;
