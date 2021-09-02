const mongoose = require("mongoose");

const URI = "mongodb://localhost:27017/users";

mongoose.connect(URI, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
mongoose.connection.once("open", () => {
	console.log("Mongodb connection established successfully");
});
