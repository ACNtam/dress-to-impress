import express from "express";

const router = express.Router()

router.get("/callback", async (req, res)=>{
    res.json("Successful")
})


export default router;