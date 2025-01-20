import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { connectDb } from "./config/connectdb.js";
import "dotenv/config";
import UserRoute from "./routes/userRoute.js";

const app = express();
const port = 4000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST"],
  })
);

connectDb();

app.use("/api/user", UserRoute);

app.listen(port, () => {
  console.log(`Server started on http://localhost:${port}`);
});
