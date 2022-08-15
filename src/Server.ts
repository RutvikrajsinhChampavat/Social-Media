import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import authRoutes from "./routes/AuthRoutes";
import { CustomResponse } from "./responses/ResponseMessage";

const app = express();
dotenv.config();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use((_req, res: CustomResponse, next) => {
  res.reply = ({ code, message }, data = {}, header = undefined) => {
    res.status(code).header(header).json({ message, data });
  };
  next();
});

app.use("/api/v1/auth", authRoutes);

const PORT = process.env.PORT;

app.listen(PORT, () => console.log(`Server up and running on ${PORT}`));
