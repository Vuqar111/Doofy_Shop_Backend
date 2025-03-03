// app.ts
import express, { Request, Response } from 'express';
import path from "path";
import dotenv from "dotenv";
import connectDB from "./config/db";
import {routes} from "./routes/index";
import cors from "cors";
import bodyParser  from "body-parser";

const app = express();
const PORT = process.env.PORT || 7000;

app.use(bodyParser.json());
app.use(cors());

dotenv.config();
connectDB();

// Use routes 
app.use("/api/auth", routes.authRouter);
app.use("/api/profile", routes.profileRouter);
app.use("/api/products", routes.productsRouter);
app.use("/api/orders", routes.orderRouter);


  

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/views/index.html"));
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
