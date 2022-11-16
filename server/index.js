import dotenv from "dotenv";
//envoriment variables can be read
dotenv.config();
import cors from 'cors';
import authToken from './middlewares/auth.mjs';
import router from "./routes/routes.js";
import path from "path";
import express from 'express';
import { fileURLToPath } from "url";


const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const REACT_BUILD_DIR = path.join(__dirname, "..", "client", "build");
app.use(express.static(REACT_BUILD_DIR));

const clientURL = process.env.CLIENT_ORIGIN_URL

const PORT = process.env.PORT || 8080;

app.use(cors({
  origin:clientURL,
    methods:["GET"],
    allowedHeaders:["Authorization", "Content-Type"],
    maxAge:86400 
}));

app.use(express.json())

// app.use((req,res,next)=>{
// console.log(req.headers)
// next()
// })

app.use("/api", router)

//midware added between route and callback function
app.get("/protected", authToken, (req,res) =>{
  res.send({message: "Identity protected"})
})

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error("Not Found");
  err.status = 404;
  return next(err);
});

// error handlers
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  console.log(err)
  return res.json({
    message: err.message,
    /*
     if we're in development mode, include stack trace (full error object)
     otherwise, it's an empty object so the user doesn't see all of that
    */
    error: app.get("env") === "development" ? err : {}
  });
});


app.listen(PORT, () => console.log(`Hola! Server is running on port ${PORT}`));

