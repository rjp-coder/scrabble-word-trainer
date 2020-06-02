import React from "react";
import utils from "../MathUtils";

//const correctionsBox = (()=>{

export const Corrections = props => (
  <table className="corrections">
    <thead><tr><td>Corrections</td></tr></thead><tbody>
    {props.children}
     </tbody>
  </table>
);

export const StandardCorrections = props => (
  <>
  {props.corrections.map((c,i)=>(
    <tr key={i}><td>{c.word} is {c.isValid ? "valid" : "invalid"}</td></tr>))
  }
  </>
)

export const GapSolutions = props => (
  <>
  {props.corrections.map((c,i)=>(
    <tr key={i}><td>{c.word.replace(" ","_")} was {utils.getGapSolutions(c.word).join(",")}</td></tr>))
  }
  </>
)

//return {Corrections,StandardCorrections,GapSolutions}

//})();
