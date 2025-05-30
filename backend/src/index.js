import express from "express";

import dotenv from "dotenv";
import { connectDB } from "./lib/db.js";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/auth.route.js";

import messageRoutes from "./routes/message.route.js";
import { app, server } from "./lib/socket.js";
import forgotpass from "./controllers/forgotpassword.js";


import cors from "cors";


dotenv.config();



const PORT = process.env.PORT;
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
    
}));
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/pass", forgotpass);



server.listen(PORT,()=> {
    console.log("Server is running on PORT:" + PORT);
    connectDB();
});