import { auth } from 'express-oauth2-jwt-bearer';
import dotenv from "dotenv";
//envoriment variables can be read
dotenv.config();


//connecting to auth0 app and the audience which is api/express sever
 const authToken =   auth({
      issuerBaseURL: process.env.AUTH0_DOMAIN,
      audience: process.env.AUTH0_AUDIENCE
    })

export default authToken;