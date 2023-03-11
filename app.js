const express = require("express");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const xss = require("xss-clean");
const cors = require("cors");

const userRoutes = require("./routes/userRoute");
const noteRoutes = require("./routes/noteRoute");

const app = express();

app.enable("trust proxy");

app.use(cors());

app.use(function (req, res, next) {
  res.header("Content-Type", "application/json;charset=UTF-8");
  res.header("Access-Control-Allow-Credentials", true);
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.options("*", cors());

app.use(helmet());


if(process.env.NODE_ENV === "development") {
    app.use(morgan("dev"));
}

const limiter = rateLimit({
    max: 20000,
    windowMs: 60 * 60* 1000,
    message: "Too many requests from this IP address, please try again in an hour!"
});

app.use("/api/v1", limiter);


app.use(express.json({limit: "50mb"}));
app.use(express.urlencoded({ extended: true, limit: "50mb"}));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(xss());

app.use("/api/v1/users", userRoutes);
app.use("/api/v1/notes", noteRoutes);

app.all("*", (req, res, next) => {
    next(`Can't find ${req.originalUrl} on this server`, 404)
})

module.exports = app;
