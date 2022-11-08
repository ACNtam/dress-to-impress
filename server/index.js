import express from 'express';
import cors from 'cors';
import { auth } from 'express-openid-connect';
import config from './auth/auth-config.js';

const app = express();
const PORT = 8080;

app.use(cors());

app.get("/", (req,res) =>{
    res.send("Welcome to my page")
})

// auth router attaches /login, /logout, and /callback routes to the baseURL
app.use(auth(config));

// req.isAuthenticated is provided from the auth router
app.get('/secret', (req, res) => {
  res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
});

app.listen(PORT, () => console.log(`Hola! Server is running on port ${PORT}`));

