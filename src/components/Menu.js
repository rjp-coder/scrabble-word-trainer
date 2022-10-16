import React, { createContext, useContext } from 'react';
import { useState } from 'react';

const GameTypeContext = createContext(undefined);

export const GAME_TYPES = {
  YESNO: "yesno", GAPFILL: "gapfill",
  LOOKUP: "lookup", SCRAMBLE: "scramble"
}

const Menu = props => {
  const [numQuestions, setNumQuestions] = useState(10);
  const [gameType, setGameType] = useState("");
  const { showAllGapFillSolutions, setShowAllGapFillSolutions } = { ...props }

  const GAP_FILL_TYPES = { ONE: "one", ALL: "all" };




  const questionsNumPrompt = (
    <MenuQuestion key="1" title="Choose Number of Questions">
      <MultiChoiceAnswer onClick={setNumQuestions} selected={numQuestions} answers={[5, 10, 20, 40, 50, 80, 100]}></MultiChoiceAnswer>
    </MenuQuestion>
  )

  let gft = GAP_FILL_TYPES;
  const gapFillPrompt = (
    <MenuQuestion key="2" title="Fill in all possible gaps for each word?">
      <MultiChoiceAnswer onClick={setShowAllGapFillSolutions} selected={showAllGapFillSolutions} answers={[true, false]} answerLabels={["yes", "no"]}></MultiChoiceAnswer>
    </MenuQuestion>
  )

  let menuQuestions;
  let gt = (gameType.toLowerCase() || "");
  let G = GAME_TYPES;

  if (gt == G.YESNO) {
    menuQuestions = questionsNumPrompt;
  } else if (gt == G.GAPFILL) {
    menuQuestions = [questionsNumPrompt, gapFillPrompt];
  } else if (gt == G.LOOKUP) {
    menuQuestions = null;
  } else if (gt == G.SCRAMBLE) {
    menuQuestions = null;
  }


  return (
    <div className="menuWrapper">
      <GameTypeContext.Provider value={{ gameType, setGameType }}>
        <p className="menuHeader">Choose Game Type</p>
        <div className="menu">
          <MenuButton gameType="lookup" >Word Lookup</MenuButton>
          <MenuButton gameType="gapFill">Gap Fill</MenuButton>
          <MenuButton gameType="yesNo">Yes/No</MenuButton>
          <MenuButton gameType="scramble">Scramble</MenuButton>
        </div>
        {menuQuestions}
        <button className="menu" onClick={() => props.startNewGame({ numQuestions, gameType })}>Start</button>
      </GameTypeContext.Provider>


    </div>
  )

}

function MenuButton({ gameType, children }) {
  const { setGameType } = useContext(GameTypeContext);
  console.log("SGT" + setGameType)
  return (
    <button onClick={() => setGameType(gameType)}>{children}</button>
  )
}

const MenuQuestion = props => {
  return (<>
    <p className="menuHeader">{props.title}</p>
    {props.children}
  </>
  )
}

const MultiChoiceAnswer = props => {
  const currentAnswer = props.selected;
  const answers = props.answers.map((a, i) => {
    let style = (a === currentAnswer) ? { backgroundColor: "blue", fontWeight: "bold", color: "red" } : {};
    let text = props.answerLabels?.length ? props.answerLabels[i] : a;
    let btn = <button key={a} style={style} onClick={() => props.onClick(a)}>{text}</button>
    return btn;
  })
  return (<div className="menu" >
    {answers}
  </div>
  )
}

export default Menu