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
${userData.careerGoal}

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

        title:`Roadmap for ${data.careerGoal}`,

        steps:[

            `Improve ${data.skills} fundamentals`,

            `Build projects related to ${data.careerGoal}`,

            `Create portfolio and prepare for opportunities`

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