import path from 'path';
import { fileURLToPath } from 'url';
import express from "express"
import cors from 'cors'
import dotenv from "dotenv"
import cookieParser from "cookie-parser";
import userRouter from './routes/auth.route.js'
import transactionRouter from './routes/transaction.routes.js';
import budgetRouter from './routes/budget.route.js';

import { connectDB } from "./db/connectDB.js";

const app=express(); //rest object

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);




dotenv.config();

app.use(express.json()); 
app.use(cookieParser());
app.use(cors());


app.use('/api/user',userRouter);
app.use('/api/transaction',transactionRouter);
app.use('/api/budget',budgetRouter);

app.use(express.static(path.join(__dirname, 'client', 'dist')));

// For any other routes, serve the main index.html of your Vite app.
// This is important for client-side routing (e.g., React Router).
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
});



const port=process.env.PORT||8080;


const startServer=async()=>{
    await connectDB();
    app.listen(port,()=>{
        console.log(`App has started listening on port ${port}`);
    })
}
startServer();