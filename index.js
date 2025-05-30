const mongoose = require("mongoose");
const app = require("./app");

mongoose.connect(process.env.URI)
  .then(() => {
    app.listen(3000, () => {
      console.log("app is running on server 3000");
    });
  })
  .catch((error) => {
    console.log(error);
  });
