var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const cors = require("cors");

require("./connection");

var usersRouter = require("./routes/users");

var app = express();

const corsOptions = {
	origine: "http://localhost:3000",
	optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

app.use(logger("dev"));
app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/api/images", express.static(path.join(__dirname, "images")));
app.use("/api/users", usersRouter);

// error handler
app.use(function (err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get("env") === "development" ? err : {};

	// render the error page
	res.status(err.status || 500);
	res.send(err.message);
});

module.exports = app;
