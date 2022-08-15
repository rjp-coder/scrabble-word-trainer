import { useState, useEffect } from "react";
import utils from "../MathUtils";
import PlayAgain from "./PlayAgain";
import TileDisplay from "./TileDisplay";
import Choice from "./Choice";
import React from "react";
import wordList from "../words.json"
import { Corrections, GapSolutions } from "./Corrections"
import SolutionsTally from "./SolutionsTally";
import InfoFooter from "./InfoFooter";

const useGameState = ({startNewGame,numQuestions,initialWord,gameState,initialSolutions}) => {
  const [secondsLeft, setSecondsLeft] = useState(100);
  const [points, setPoints] = useState(0);
  const [word, setWord] = useState(initialWord);
  const [gameStatus, setGameStatus] = gameState;
  const [wrongAnswers, setWrongAnswers] = useState([]);
  const [gapValue, setGapValue] = useState('');
  const [solutions, setSolutions] = useState(initialSolutions);
  const [flash,setFlash] = useState("");

  const getIndexOfSolutions = (word) => {
    let w = word;
    let index = -1;
    for (let i = 0; i < solutions.length; i++) {
      if (solutions[i].isFound) continue;
      if (solutions[i].word == w) {
        index = i;
      }
    }
    return index;
  }

  const inputTile = React.createRef()

  useEffect(() => {

    setGameStatus(secondsLeft === 0 ? 'lost' :
      points == numQuestions ? 'won' : 'active');

    //document.getElementsByTagName("input")[0];
    if (inputTile.current) inputTile.current.focus();

    if (secondsLeft > 0 && gameStatus != "won") {
      const timerId = setTimeout(() => setSecondsLeft(secondsLeft - 1), 1000);
      return () => clearTimeout(timerId);
    }
  });

  const checkCorrect = (word) => {
    return getIndexOfSolutions(word) != -1;
  }

  const nextQuestion = () => {
    let n = points;
    // let numCorrectAnswers = n - wrongAnswers.length;
    // console.log(numCorrectAnswers + "/" + n);
    // console.log(wrongAnswers.map(x => x.word).join(","));
    if ((points < numQuestions)) {
      let word = utils.getGapWord();
      setWord(word);
      let sol = utils.getGapSolutions(word);
      try { console.assert(sol.length < 100) } catch (e) { console.log(sol) };
      setSolutions(sol);
    }
  };



  return {
    secondsLeft,
    wrongAnswers,
    points,
    word,
    gameStatus,
    setGameStatus,
    gapValue,
    checkCorrect,
    solutions,
    flash,
    startNewGame,
    numQuestions,
    inputTile,
    setGapValue,
    setPoints,
    setSolutions,
    getIndexOfSolutions,
    setFlash,
    nextQuestion,
  };
};

const GapFillQuiz = props => {
  const {
    secondsLeft,
    wrongAnswers,
    points,
    word,
    gameStatus,
    setGameStatus,
    gapValue,
    checkCorrect,
    solutions,
    flash,
    startNewGame,
    numQuestions,
    inputTile,
    setGapValue,
    setPoints,
    setSolutions,
    getIndexOfSolutions,
    setFlash,
    nextQuestion,
  } = useGameState(props);

  const handleChange = event => {
    setGapValue(event.target.value);
    let target = event.target;
    event.target.disabled = "disabled";
    const timerId = setTimeout(() => { onSubmit(target); target.disabled = ""; }, 200);
  };


  const onSubmit = (target) => {
    let sols = solutions;
    let w = word.replace(" ", target.value);
    let i = getIndexOfSolutions(w);
    let showAllSolutions = props.showAllSolutions;
    if (~i) {
      sols[i].isFound = true;
      if (!showAllSolutions) {
        sols[i].letter = target.value;
        sols==sols[i];
      }
      setPoints(+points + 1);
      setSolutions(sols);
      if (showAllSolutions && sols.every(x => x.isFound)) {
        setFlash("flash");
        setTimeout(()=>{nextQuestion();setFlash("")}, 1000);
      } else if (!showAllSolutions){
        setTimeout(()=>{nextQuestion()}, 200);
      }
    }
    setGapValue("");
  };

  const tileInputProps = {
    autoFocus:true,
    className:"tile",
    maxLength:1,
    onChange:handleChange,
    value:gapValue
  }

  const tileInputStyle = {
      color:
        gapValue ?
          checkCorrect(word.replace(" ", gapValue)) ?
            "green" : "red"
          : "black"
  }

  return (
    <div className="game">
      <div className="help">
        Fill in the missing letter.
      </div>
      <div className="body">
        <div className="left">
          {gameStatus !== 'active' ? (
            <PlayAgain onClick={() => startNewGame({ numQuestions: numQuestions })}
              menuClick={() => setGameStatus("menu")}
              gameStatus={gameStatus}
              loseMsg={points + "/" + numQuestions}
              winMsg={"Done with " + secondsLeft + " seconds remaining"}
            />
          ) : (
              <TileDisplay word={word} />
            )}
        </div>
        <div className="right">

          {gameStatus == 'active' ? (
            <>
              <div className="choiceWrapper">
                <input {...tileInputProps} ref={inputTile} style={tileInputStyle}
                />
              </div>
              <SolutionsTally anim={flash} showAllSolutions={props.showAllSolutions} animDuration={0.5} solutions={solutions} />
            </>
          ) : (
              <Corrections><GapSolutions corrections={wrongAnswers} /></Corrections>
            )
          }
        </div>
      </div>
      <InfoFooter numQuestions={numQuestions}
        secondsLeft={secondsLeft}
        numAnswered={points} />
    </div>
  );
};

export default GapFillQuiz