import React, { useState } from 'react';
import Quiz from './Quiz';
import GapFillQuiz from './GapFillQuiz'
import Menu from './Menu';
import utils from '../MathUtils';
import {Lookup} from './Lookup';


const ScrabbleWordTrainer = (props) => {
	const [gameId, setGameId] = useState(1);
	const [numQuestions, setNumQuestions] = useState(10);
	const [gameStatus, setGameStatus] = useState("menu");
	const gameState = [gameStatus, setGameStatus];	
	const [gameType,setGameType] = useState(props.gameType);

	const startNewGame = (props) => {
		setGameId(gameId + 1);
		setNumQuestions(props.numQuestions || 5);
		setGameStatus("active");
		setGameType(props.gameType);
	};

	const word=utils.getGapWord();

	return (
		<>
			{gameStatus == "menu" ? (
				<Menu startNewGame={startNewGame}></Menu>
			) : (gameType||"").toLowerCase() == "gapfill" ? (
				<GapFillQuiz key={gameId} 
				numQuestions={numQuestions} 
				time={numQuestions * 3} 
				gameState={gameState}
				initialWord={word}
				initialSolutions={()=>utils.getGapSolutions(word)}
				startNewGame={startNewGame} />
			) : <Quiz 
				key={gameId} 
				numQuestions={numQuestions} 
				time={numQuestions * 3} 
				gameState={gameState}
				startNewGame={startNewGame}
			  ></Quiz>}
			<Lookup />
		</>
	);
}
export default ScrabbleWordTrainer
