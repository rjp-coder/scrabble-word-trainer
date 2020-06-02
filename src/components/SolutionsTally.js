import React from "react";

const SolutionsTally = props => (
  <div className={`solutionsTally ${props.anim}`}>

      {props.solutions.map((s, i) =>
        <div key={i}
          style={{ 
            backgroundColor: s.isFound ? "yellow" : "white",
            animationDelay: (i*props.animDuration/props.solutions.length)+"s",
            animationDuration: props.animDuration+"s"
            }}>
          {s.isFound ? s.letter : "?"}
        </div>)
      }
  </div>
);

export default SolutionsTally
