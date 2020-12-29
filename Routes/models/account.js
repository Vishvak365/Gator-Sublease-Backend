const mongoose = require("mongoose");
const bcrypt = require("bcrypt-nodejs");
const Schema = mongoose.Schema;

const dotenv = require("dotenv");
dotenv.config();
mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true });
const AccountSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: true,
  },
  email: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  first_name: {
    type: String, 
    required: true,
  },
  last_name: {
    type: String,
    required: true,
  },
  phone_number: {
    type: String,
    required: true,
  },
  updated: {
    type: Date,
    default: Date.now,
  },
});
// Hashes password automatically
// AccountSchema.pre("save", async function (next) {
//   if (!this.isModified("password")) return next();
//   const hashedPassword = bcrypt.hashSync(this.password);
//   this.password = hashedPassword;
// });

// AccountSchema.methods.verifyPassword = function (password) {
//   return bcrypt.compareSync(password, this.password);
// };

module.exports = mongoose.model("accounts", AccountSchema);
