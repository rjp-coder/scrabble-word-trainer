import { useState, useEffect } from "react";
import utils from "../MathUtils";
import PlayAgain from "./PlayAgain";
import TileDisplay from "./TileDisplay";
import Choice from "./Choice";
import React from "react";
import wordList from "../words.json"
import {Corrections,StandardCorrections} from "./Corrections"

const useGameState = props => {
  const [secondsLeft, setSecondsLeft] = useState(props.time);
  const [numAnswered, setNumAnswered] = useState(0);
  const [word, setWord] = useState(utils.randomLetters(3));
  const [gameStatus, setGameStatus] = props.gameState;
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

  return { secondsLeft, numAnswered, word, nextQuestion, gameStatus,setGameStatus,checkCorrect, wrongAnswers };
};

const QuizContainer = props => {
  const {
    secondsLeft,
    wrongAnswers,
    numAnswered,
    word,
    nextQuestion,
    checkCorrect,
    gameStatus,
    setGameStatus,
  } = useGameState(props);

  return (
    <div>

      <div className="infoFooter" style={{ display: 'flex', alignItems: 'center' }}>
        <div className="timer">Time Remaining: {secondsLeft}</div>
        <div className="questionsDisplay">Question: {Math.min(numAnswered + 1, props.numQuestions)}/{props.numQuestions}</div>
      </div>
    </div>
  );
};

//Maybe this fine grained refactoring is not worht it?

export default QuizContainer