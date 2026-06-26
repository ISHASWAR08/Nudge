const express = require("express");
const router = express.Router();

const aiService = require("../services/ai");


router.post("/generate", async (req, res) => {

    try {

        const { skills, careerGoal, level, progress } = req.body;


        const nudge = await aiService.generateNudge({

            skills,
            careerGoal,
            level,
            progress

        });


        res.json({

            success: true,
            nudge

        });


    } catch (error) {

        console.error("Nudge Error:", error);

        res.status(500).json({

            error: "Internal Server Error"

        });

    }

});


module.exports = router;