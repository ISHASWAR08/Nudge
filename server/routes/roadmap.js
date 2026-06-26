const express = require("express");
const router = express.Router();

const aiService = require("../services/ai");


router.post("/generate", async (req, res) => {
  console.log("BODY RECEIVED:", req.body);

    try {

      const { skills, role, timeline } = req.body;


       if (!skills || !role) {

    return res.status(400).json({
        error: "Missing user data"
    });

}
        const roadmap = await aiService.generateRoadmap({
    skills,
    role,
    timeline
});

console.log("ROADMAP RESPONSE:", roadmap);
        res.json({

            success: true,
            data: roadmap

        });


    } catch (error) {

        console.error("Roadmap Error:", error);


        res.status(500).json({

            error: "Internal Server Error"

        });

    }

});


module.exports = router;