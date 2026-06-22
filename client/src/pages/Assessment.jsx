import { useContext, useState } from "react";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";


function Assessment() {

  const { userData, setUserData } = useContext(UserContext);

  const navigate = useNavigate();


  const [skills, setSkills] = useState({
    React: "",
    JavaScript: "",
    Projects: "",
    DSA: "",
    ProblemSolving: ""
  });



  const handleChange = (e) => {

    setSkills({
      ...skills,
      [e.target.name]: e.target.value
    });

  };



  const handleSubmit = () => {


    setUserData({

      ...userData,

      skills: skills

    });


    navigate("/dashboard");

  };



  return (
    <div>

      <h1>Skill Assessment</h1>

      <p>Rate your current skills</p>


      <div>
        <label>React: </label>

        <input
          type="number"
          min="1"
          max="5"
          name="React"
          value={skills.React}
          onChange={handleChange}
        />

      </div>



      <div>
        <label>JavaScript: </label>

        <input
          type="number"
          min="1"
          max="5"
          name="JavaScript"
          value={skills.JavaScript}
          onChange={handleChange}
        />

      </div>



      <div>
        <label>Projects: </label>

        <input
          type="number"
          min="1"
          max="5"
          name="Projects"
          value={skills.Projects}
          onChange={handleChange}
        />

      </div>



      <div>
        <label>DSA: </label>

        <input
          type="number"
          min="1"
          max="5"
          name="DSA"
          value={skills.DSA}
          onChange={handleChange}
        />

      </div>



      <div>
        <label>Problem Solving: </label>

        <input
          type="number"
          min="1"
          max="5"
          name="ProblemSolving"
          value={skills.ProblemSolving}
          onChange={handleChange}
        />

      </div>



      <button onClick={handleSubmit}>
        Generate My Readiness Score
      </button>


    </div>
  );
}


export default Assessment;