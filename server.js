const app = require("./index");
const port = process.env.PORT || 3000;
const auth = require("./Routes/firebase/test");
app.listen(port, () => {
  console.log(`Started on port ${port}`);
});
