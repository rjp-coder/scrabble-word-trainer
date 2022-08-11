import React from 'react';
import {useState} from 'react';

const Menu = props => {
  const [numQuestions, setNumQuestions] = useState(10);
  const [gameType,setGameType] = useState("yesNo");

  const askForNumQuestions = ["gapfill","yesno"].includes(gameType.toLowerCase());
  console.log(askForNumQuestions);
  const questionsNumPrompt = askForNumQuestions ? (
  <>
    <p className="menuHeader">Choose Number of questions</p>
    <div className="menu"> {
    [10, 20, 50, 100].map((x, i) => (
      <button key={i} onClick={() => setNumQuestions(x)}>{x}</button>))}
    </div>
  </>) : null;
  return (
    <div className="menuWrapper">
      <p className="menuHeader">Choose Game Type</p>
      <div className="menu"> 
          <button onClick={() => setGameType("lookup")}>Word Lookup</button>
          <button onClick={() => setGameType("gapFill")}>Gap Fill</button>
          <button onClick={() => setGameType("yesNo")}>Yes/No</button>
      </div>
      {questionsNumPrompt}
      <button className="menu" onClick={() => props.startNewGame({ numQuestions,gameType })}>Start</button>


    </div>
  )

}
export default Menu