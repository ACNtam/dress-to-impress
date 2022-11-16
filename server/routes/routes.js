import express from "express";
import cors from "cors";
import fetch from "node-fetch"
import db from "../config/db.js"

const router = express.Router()

router.get('/items', async function (req, res, next) {

    try {
        // const user = await db.any('SELECT * FROM users WHERE id =$1', [req.params.id]);


        const params = new URLSearchParams({
            //getting users items
            publisherId: "TEST",
            locale: "en_US",
            site: "shop",
            shipCountry: "US",
            onlyMaProducts: "false",
        });
        const url = `https://api2.shop.com/AffiliatePublisherNetwork/v2/categories?${params}`;

        //a promise type, fetching to the SHOP.COM API
        fetch(url, {
            headers: {
                api_Key: process.env.SHOP_API_KEY
            }
        })
            .then((res) => res.json())
            .then((data) => {
                

                //sending response to client which is weather
                res.json({ data });
            })
            .catch((err) => {
                console.log(err);
                return res.status(500).json({ message: "Error from server" });
            });

    } catch (e) {
        console.log(e)
        return res.status(500).json({ message: "Error from server" });
    }
});

router.post('/me', cors(), async (req, res) => {
    const createProfile = {
        username: req.body.nickname,
        email: req.body.email,
        sub: req.body.sub

    }
    //console.log(createProfile);
    const queryEmail = 'SELECT * FROM users WHERE email=$1 LIMIT 1';
    const valuesEmail = [createProfile.email]
    const resultsEmail = await db.query(queryEmail, valuesEmail);
    if (resultsEmail.length > 0) {
        console.log(`Thank you ${resultsEmail[0].username} for comming back`)
    } else {
        const query = 'INSERT INTO users(username, email, sub) VALUES($1, $2, $3) RETURNING *'
        const values = [createProfile.username, createProfile.email, createProfile.sub]
        const result = await db.query(query, values);
        console.log(result.rows);

    };
    res.send({})
});

router.post("/profile", async  (req,res)=>{
    try {
        const {industry, occupation, gender, style, occassion, email} = req.body
       const userResult = await db.oneOrNone("SELECT id FROM users WHERE email=$1", [email])
    //    if(userResult.row){
    //     return 
    //    }
    const query = 'INSERT INTO profile(industry, occupation, gender, style, occassion, user_id) VALUES($1, $2, $3, $4, $5, $6) RETURNING *'
        const values = [industry, occupation, gender, style, occassion, userResult.row.id]
        const result = await db.query(query, values);
        return res.status(201).json(result.rows[0])
    } catch (error) {
        console.log(error)
      return res.status(500).json({message: "Internal server error"}) 
    }
    
})

export default router;