import express from "express";
import dotenv from "dotenv";
import { connectToDB } from "./config/dbConnection.js";
import { todoRouter } from "./routes/todoRoutes.js";
import cookieParser from "cookie-parser";
import cors from "cors"
import path from "path"
import { fileURLToPath } from "url";

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
    origin: process.env.FRONTEND_URI,
    credentials: true,
  })
);

// database connection
connectToDB();

// api
app.use("/api", todoRouter);

// ------------- For Deployment -----------------------
// Create __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, "../client/dist")));

// Render client for any path
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/dist/index.html"));
});

app.listen(PORT, () => {
  console.log(`Server is running at port: ${PORT}`);
});
