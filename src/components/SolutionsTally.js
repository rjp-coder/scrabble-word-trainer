import React from "react";

const SolutionsTally = props => {

  let solutions = props.showAllSolutions? props.solutions : [{isFound:false}];
  const foundSolutions = (props.solutions.filter(s=>s.isFound));
  if (props.showAllSolutions==false && foundSolutions.length) {
    solutions = [foundSolutions[0]];
  }
  const solutionSlots = solutions.map((s, i) =>
  <div key={i}
    style={{ 
      backgroundColor: s.isFound ? "yellow" : "white",
      animationDelay: (i*props.animDuration/props.solutions.length)+"s",
      animationDuration: props.animDuration+"s"
      }}>
    {s.isFound ? s.letter : "?"}
  </div>)
  
  return (
  <div className={`solutionsTally ${props.anim}`}>
      {solutionSlots}
  </div>
);
    }

export default SolutionsTally
