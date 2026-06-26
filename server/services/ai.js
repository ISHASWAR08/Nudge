const { GoogleGenAI } = require("@google/genai");


const client = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY
});


async function generateRoadmap(userData){

    try{

        const response = await client.models.generateContent({

            model: "gemini-2.0-flash",

            contents: `
Create a personalized roadmap.

Goal:
${userData.role}node index.js

Skills:
${Array.isArray(userData.skills) 
? userData.skills.join(", ") 
: userData.skills}

Level:
${userData.level}

Give clear weekly steps.
`
        });


        return response.text;

    }

    catch(error){

        console.log("Gemini failed, using fallback");

        return generateFallbackRoadmap(userData);

    }

}



async function generateNudge(userData){

    try{

        const response = await client.models.generateContent({

            model:"gemini-2.0-flash",

            contents:`
Write a short personalized motivational nudge.

Goal:
${userData.careerGoal}

Skill:
${userData.skills}
`
        });


        return response.text;

    }

    catch(error){

        return generateFallbackNudge(userData);

    }

}



function generateFallbackRoadmap(data){

    return {

        readinessScore: 45,

        phase: "Learning",

        roadmap:[

            {
                item:`Learn ${data.skills} fundamentals`,
                status:"current"
            },

            {
                item:`Build ${data.careerGoal} projects`,
                status:"locked"
            },

            {
                item:"Create portfolio and prepare interviews",
                status:"locked"
            }

        ],

        projects:[

            `Build a ${data.careerGoal} project`,
            "Deploy project online"

        ],

        generatedBy:"Nudge AI fallback engine"

    };

}



function generateFallbackNudge(data){

    return `Keep working on ${data.skills}. Your goal of ${data.careerGoal} gets closer with every project.`;

}



module.exports = {
    generateRoadmap,
    generateNudge
};