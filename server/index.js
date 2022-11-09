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

app.use((req,res,next)=>{
console.log(req.headers)
next()
})

app.get("/", (req,res) =>{
    res.send("Welcome to my page")
})

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

