import React, { useState } from 'react';
import Quiz from './Quiz';
import GapFillQuiz from './GapFillQuiz'
import Menu from './Menu';
import utils from '../MathUtils';
import {Lookup} from './Lookup';
import Scramble from './Scramble';


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
		initialSeconds={numQuestions*3} 
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
			initialSeconds={numQuestions*3} 
			gameState={gameState}
			startNewGame={startNewGame}
		  ></Quiz>
	)
	const lookup = <Lookup />

	const scramble = (
	<Scramble key={gameId} 
	numQuestions={numQuestions} 
	initialWord={utils.draw7Tiles}
	time={numQuestions * 3} 
	initialSeconds={numQuestions*3} 
	gameState={gameState}
	startNewGame={startNewGame}
	/>)

	const components = {menu,gapfill,yesno,lookup,scramble};
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

Scramble UI
Implement time loss on question wrong
Show meter time loss animation on question wrong


*/
