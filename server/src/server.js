import express from "express";
import dotenv from "dotenv";
import { connectToDB } from "./config/dbConnection.js";
import { todoRouter } from "./routes/todoRoutes.js";
import cookieParser from "cookie-parser";
import cors from "cors"

dotenv.config();
const app = express();
const PORT = process.env.PORT;

// middlewares
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

// database connection
connectToDB();

// api
app.use("/api", todoRouter);

app.listen(PORT, () => {
  console.log(`Server is running at port: ${PORT}`);
});
