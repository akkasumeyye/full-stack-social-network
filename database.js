const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

class Database {
  constructor() {
    this.connect();
  }

  connect() {
    mongoose
      .connect(
        "mongodb+srv://admin:VU7FsMAz4u0d0S2Z@socialnetwork.oti5yzj.mongodb.net/?retryWrites=true&w=majority"
      )
      .then(() => {
        console.log("Connected to MongoDB");
      })
      .catch((err) => console.log("Dtabase connection error: " + err));
  }
}

module.exports = new Database();

