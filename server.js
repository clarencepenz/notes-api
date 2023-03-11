const dotenv = require("dotenv");

dotenv.config({ path: ".env" });
const app = require("./app");

process.on("uncaughtException", (err) => {
  console.log("UNCAUGHT EXPRESSION! Shutting down...");
  console.log(err.name, err.message);
  process.exit(1);
});

const port = process.env.PORT || 3000;

const server = app.listen(port, () => {
  console.log(`App running on ${port}...`);
});

process.on("unhandledRejection", (err) => {
  console.log("Unhandled Rejection! Shutting down...");
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});

process.on("SIGTERM", () => {
  console.log("SIGTERM RECEIVED. Shutting down gracefully");
  server.close(() => {
    console.log("Process terminated");
  });
});
