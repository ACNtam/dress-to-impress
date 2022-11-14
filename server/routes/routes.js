import express from "express";
import authToken from "../middlewares/auth.mjs";
import cors from "cors";
import fetch from "node-fetch"
import db from "../config/db.js"

const router = express.Router()

router.get('/items', async function (req, res,) {
    // https://api2.shop.com/AffiliatePublisherNetwork/v2/products?publisherId=TEST&locale=en_US&site=shop&shipCountry=US&perPage=15&categoryId=1-32838&onlyMaProducts=false
    try {
        // const user = await db.any('SELECT * FROM users WHERE id =$1', [req.params.id]);
        const occassionResult = await db.query("SELECT profile.occassion FROM users JOIN profile ON profile.user_email=users.email WHERE users.sub=$1", [req.query.sub])
        console.log(occassionResult)
        const params = new URLSearchParams({
            //getting users items
            publisherId: "TEST",
            locale: "en_US",
            site: "shop",
            shipCountry: "US",
            onlyMaProducts: "false",
            categoryId: "1-32838",
            term: occassionResult?.[0]?.occassion ??undefined
        });
        const url = `https://api2.shop.com/AffiliatePublisherNetwork/v2/products?${params}`;

        //a promise type, fetching to the SHOP.COM API
        fetch(url, {
            headers: {
                api_Key: process.env.SHOP_API_KEY
            }
        })
            .then((res) => res.json())
            .then((data) => {


                //sending response to client which is fashion
                res.json({ data });
            })
            .catch((err) => {
                console.log(err.message);
                return res.status(500).json({ message: "Error from server" });
            });

    } catch (e) {
        console.log(e.message)
        return res.status(500).json({ message: "Error from server" });
    }
});

router.get('/catagories', async function (req, res, next) {

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


                //sending response to client which is fashion
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

router.post("/profile", async (req, res) => {
    try {
        const { industry, occupation, gender, style, occassion, email } = req.body
        const userResult = await db.oneOrNone("SELECT id FROM users WHERE email=$1", [email])

        console.log(userResult)
        //check if user with email exist, if not error res
        if (!userResult) {
            return res.status(400).json({ message: "user not found" })
        }

        const query = 'INSERT INTO profile(industry, occupation, gender, style, occassion, user_email) VALUES($1, $2, $3, $4, $5, $6) RETURNING *'
        const values = [industry, occupation, gender, style, occassion, email]
        const result = await db.query(query, values);
        return res.status(201).json({ message: "user profile created" })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Internal server error" })
    }

})

router.get("/profile/:email", async(req, res)=>{
try {
    console.log(req.params)
    const email = req.params.email
    const userResult = await db.oneOrNone("SELECT * FROM profile WHERE user_email=$1", [email])
    res.json(userResult)
} catch (error) {
    console.log(error)
        return res.status(500).json({ message: "Internal server error" })
}
})

export default router;


