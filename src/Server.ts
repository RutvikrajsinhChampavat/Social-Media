import express from "express";
import dotenv from "dotenv";

import authRoutes from "./routes/auth.routes";

const app = express();
dotenv.config();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/v1/auth", authRoutes);

const PORT = process.env.PORT;

app.listen(PORT, () => console.log(`Server up and running on ${PORT}`));
