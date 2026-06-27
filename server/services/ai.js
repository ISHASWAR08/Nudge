function calculateScore(data){

    let score = 40;


    // Build level
    if(data.buildLevel === "shipped"){
        score += 30;
    }

    else if(data.buildLevel === "small"){
        score += 15;
    }

    else{
        score += 5;
    }



    // Company goal
    if(data.companyType === "faang"){
        score -= 10;
    }

    if(data.companyType === "startup"){
        score += 5;
    }



    // Timeline
    if(data.timeline === "3 months"){
        score -= 5;
    }

    if(data.timeline === "1 year+"){
        score += 10;
    }



    return Math.max(20, Math.min(score,95));

}



function createRoleData(data){


    const role = data.role.toLowerCase();


    let projects = [];
    let roadmap=[];



    if(role.includes("frontend")){


        projects=[

            "React Portfolio Website",
            "Interactive Dashboard using APIs"

        ];


        roadmap=[

            {
                item:"Master React, JavaScript and UI development",
                status:"In Progress"
            },

            {
                item:"Build production level frontend projects",
                status:"Not Started"
            },

            {
                item:"Prepare frontend interview concepts",
                status:"Not Started"
            }

        ];

    }



    else if(role.includes("backend")){


        projects=[

            "REST API with Authentication",
            "Database driven backend application"

        ];


        roadmap=[

            {
                item:"Learn Node.js, APIs and databases",
                status:"In Progress"
            },

            {
                item:"Build scalable backend projects",
                status:"Not Started"
            },

            {
                item:"Practice backend system design",
                status:"Not Started"
            }

        ];

    }



    else{


        projects=[

            "Full Stack Application",
            "Deployment ready project"

        ];


        roadmap=[

            {
                item:"Strengthen fundamentals",
                status:"In Progress"
            },

            {
                item:"Build real world projects",
                status:"Not Started"
            }

        ];

    }



    return {

        readinessScore: calculateScore(data),

        phase:
        data.buildLevel==="shipped"
        ? "Applying"
        : data.buildLevel==="small"
        ? "Building"
        : "Learning",


        roadmap,

        projects

    };


}



async function generateRoadmap(userData){

    try{


        return createRoleData(userData);



    }

    catch(error){

        console.log(error);

        return createRoleData(userData);

    }

}



module.exports = {

    generateRoadmap

};