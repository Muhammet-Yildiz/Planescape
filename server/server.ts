import express, { Application } from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";

import IndexRoute from "./routers/index";
import connectDatabase from "./helpers/database/connect-database";
import customErrorHandler from "./middlewares/erros/custom-error-handler";


dotenv.config({
  path: path.resolve(__dirname, "./config/config.env")
});

connectDatabase();

const PORT = process.env.PORT || 5000;
const app: Application = express();

app.use(express.json());
app.use(cors());

app.use("/api", IndexRoute);

app.use(customErrorHandler);

const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} : ${process.env.NODE_ENV}`);
});

process.on("unhandledRejection", (err: any) => {
  console.log(`Logged Error: ${err}`);

  server.close(() => process.exit(1));
});
