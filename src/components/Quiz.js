import { useState, useEffect, useContext } from "react";
import utils from "../MathUtils";
import PlayAgain from "./PlayAgain";
import TileDisplay from "./TileDisplay";
import Choice from "./Choice";
import React from "react";
import wordList from "../words.json"
import { Corrections, StandardCorrections } from "./Corrections"
import InfoFooter from "./InfoFooter";
import { QuizConfigContext } from "./App";

const useGameState = props => {
  const quizConfig = useContext(QuizConfigContext)
  const [secondsLeft, setSecondsLeft] = useState(quizConfig.time);
  const [initialSeconds] = useState(quizConfig.time);
  const [gameStatus, setGameStatus] = quizConfig.gameState;
  const [numAnswered, setNumAnswered] = useState(0);
  const [word, setWord] = useState(utils.randomLetters(3));
  const [wrongAnswers, setWrongAnswers] = useState([]);

  useEffect(() => {

    setGameStatus(secondsLeft === 0 ? 'lost' :
      numAnswered == props.numQuestions ? 'won' : 'active');

    if (secondsLeft > 0 && gameStatus != "won") {
      const timerId = setTimeout(() => setSecondsLeft(secondsLeft - 1), 1000);
      return () => clearTimeout(timerId);
    }
  });

  const checkCorrect = (word, userAnswer) => {
    let correct = wordList.includes(word);
    if (userAnswer != correct) { setWrongAnswers([...wrongAnswers, { word, isValid: correct }]) };

  }

  const nextQuestion = () => {
    setNumAnswered(numAnswered + 1);
    let n = numAnswered + 1
    let numCorrectAnswers = n - wrongAnswers.length;
    console.log(numCorrectAnswers + "/" + n);
    console.log(wrongAnswers.map(x => x.word).join(","));
    if (!(numAnswered == props.numQuestions)) {
      let r = Math.random();
      let word = r < 0.6 ? utils.randomThreeLetterWord() :
        utils.randomFromArray(wordList);
      setWord(word);
    }
  };

  return { secondsLeft, initialSeconds, numAnswered, word, nextQuestion, gameStatus, setGameStatus, checkCorrect, wrongAnswers };
};

const Quiz = props => {
  const {
    secondsLeft,
    initialSeconds,
    wrongAnswers,
    numAnswered,
    word,
    nextQuestion,
    checkCorrect,
    gameStatus,
    setGameStatus,
  } = useGameState(props);

  const quizConfig = useContext(QuizConfigContext)
  const numQuestions = quizConfig.numQuestions;
  const startNewGame = quizConfig.startNewGame;


  const onChoiceClick = (userAnswer) => {
    checkCorrect(word, userAnswer);
    nextQuestion();
  };

  return (
    <div className="game">
      <div className="help">
        Select yes or no to whether it is a valid word.
      </div>
      <div className="body">
        <div className="left">
          {gameStatus !== 'active' ? (
            <PlayAgain onClick={() => startNewGame({ numQuestions: numQuestions })}
              menuClick={() => setGameStatus("menu")}
              gameStatus={gameStatus}
              loseMsg={numAnswered + "/" + numQuestions}
              winMsg={"Done with " + secondsLeft + " seconds remaining"}
            />
          ) : (
            <TileDisplay word={word} />
          )}
        </div>
        <div className="right">

          {gameStatus == 'active' ? (
            <div className="choiceWrapper">
              {
                utils.range(0, 1).sort((a, b) => b - a).map(number => (
                  <Choice
                    key={number}
                    userAnswer={Boolean(number)}
                    onClick={onChoiceClick}
                  />
                ))}
            </div>
          ) : (
            <Corrections><StandardCorrections corrections={wrongAnswers} /></Corrections>
          )
          }
        </div>
      </div>
      <InfoFooter secondsLeft={secondsLeft} initialSeconds={initialSeconds} numQuestions={numQuestions} numAnswered={numAnswered}></InfoFooter>
      {/* <div className="infoFooter" style={{ display: 'flex', alignItems: 'center' }}>
        <div className="timer">Time Remaining: {secondsLeft}</div>
        <div className="questionsDisplay">Question: {Math.min(numAnswered + 1, numQuestions)}/{numQuestions}</div>
      </div> */}
    </div>
  );
};

export default Quiz