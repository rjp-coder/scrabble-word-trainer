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
	const [gameType,setGameType] = useState("menu");

	const [showAllGapFillSolutions,setShowAllGapFillSolutions] = useState(false);

	const startNewGame = (props) => {
		setGameId(gameId + 1);
		setNumQuestions(props.numQuestions || 5);
		setGameStatus("active");
		setGameType(props.gameType);
	};

	const word=utils.getGapWord();

	let content;
	let gt = (gameType||"").toLowerCase();
	if (gameStatus==="menu") gt = "menu";

	const menu = <Menu startNewGame={startNewGame} showAllGapFillSolutions={showAllGapFillSolutions} setShowAllGapFillSolutions={setShowAllGapFillSolutions}></Menu>;
	const gapfill = (<GapFillQuiz key={gameId} 
		numQuestions={numQuestions} 
		time={numQuestions * 3} 
		gameState={gameState}
		initialWord={word}
		initialSolutions={()=>utils.getGapSolutions(word)}
		showAllSolutions={showAllGapFillSolutions}
		startNewGame={startNewGame} />)
	const yesno = (
		<Quiz 
			key={gameId} 
			numQuestions={numQuestions} 
			time={numQuestions * 3} 
			gameState={gameState}
			startNewGame={startNewGame}
		  ></Quiz>
	)
	const lookup = <Lookup />

	const components = {menu,gapfill,yesno,lookup};
	content = components[gt];

	function goBackToMenu(props){
		setGameType("menu");
		setGameStatus("menu");
	}

	const backButton = gameType=="menu" ? null: <button onClick={goBackToMenu}>Back</button>

	return (
		<>
			{backButton}
			{content}
		</>
	);
}
export default ScrabbleWordTrainer

/* TODOS

Make the timer a meter element
Make a scramble mode, where 7 letters are given and you have to make as many three letter words out of them
Make a two letter word mode for each mode, and a both mode where applicable


*/
