import dotenv from "dotenv";
//envoriment variables can be read
dotenv.config();
import express from 'express';
import cors from 'cors';
import authToken from './middlewares/auth.mjs';

const clientURL = process.env.CLIENT_ORIGIN_URL

const app = express();
const PORT = 8080;

app.use(cors({
  origin:clientURL,
    methods:["GET"],
    allowedHeaders:["Authorization", "Content-Type"],
    maxAge:86400 
}));

app.get("/", (req,res) =>{
    res.send("Welcome to my page")
})

//midware added between route and callback function
app.get("/protected", authToken, (req,res) =>{
  res.send("Welcome to my page")
})



app.listen(PORT, () => console.log(`Hola! Server is running on port ${PORT}`));

