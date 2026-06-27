const express = require("express");
const router = express.Router();

const aiService = require("../services/ai");


router.post("/generate", async (req, res) => {

    console.log("ROADMAP BODY:", req.body);

    try {

        const userData = req.body;


        const roadmap = await aiService.generateRoadmap(userData);


        res.json({

            success: true,
            data: roadmap

        });


    } catch(error){

        console.error("Roadmap Error:", error);


        res.status(500).json({

            error:"Internal Server Error"

        });

    }

});


module.exports = router;