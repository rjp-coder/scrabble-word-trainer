import React from "react";

const Choice = props => (
  <button
    className="choice"
    onClick={() => props.onClick(props.userAnswer)}
  >
    {props.userAnswer ? "Yes" : "No"}
  </button>
);

export default Choice
