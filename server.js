const app = require("./app");
const mongoose = require("mongoose");
const port = 4000;

mongoose
  .connect("mongodb://localhost:27017/Elarning")
  .then((con) => {
    console.log("DB connected successfully");
    app.listen(port, () => {
      console.log(`Server is started on port ${port}`);
    });
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1);
  });
