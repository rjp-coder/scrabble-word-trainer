import React, { createContext, useState } from 'react';
import Quiz from './Quiz';
import GapFillQuiz from './GapFillQuiz'
import Menu from './Menu';
import utils from '../MathUtils';
import { Lookup } from './Lookup';
import Scramble from './Scramble';
import useScrabbleWordTrainer from '../hooks/useScrabbleWordTrainer';

export const QuizConfigContext = createContext({ numQuestions: null, time: null, initialSeconds: null, gameState: null, startNewGame: null });

const ScrabbleWordTrainer = (props) => {

	const {
		gameId, setGameId, numQuestions, setNumQuestions, gameStatus, setGameStatus,
		gameState, gameType, setGameType, showAllGapFillSolutions, setShowAllGapFillSolutions,
		startNewGame, word, goBackToMenu
	} = useScrabbleWordTrainer();


	let content;
	let gt = (gameType || "").toLowerCase();
	if (gameStatus === "menu") gt = "menu";

	const menu = <Menu startNewGame={startNewGame} showAllGapFillSolutions={showAllGapFillSolutions} setShowAllGapFillSolutions={setShowAllGapFillSolutions}></Menu>;
	const gapfill = (<GapFillQuiz key={gameId}
		initialWord={word}
		initialSolutions={() => utils.getGapSolutions(word)}
		showAllSolutions={showAllGapFillSolutions} />)
	const yesno = (
		<Quiz
			key={gameId}
		></Quiz>
	)
	const lookup = <Lookup />

	const scramble = (
		<Scramble key={gameId}
			numQuestions={numQuestions}
			initialWord={utils.draw7Tiles}
			time={numQuestions * 3}
			initialSeconds={numQuestions * 3}
			gameState={gameState}
			startNewGame={startNewGame}
		/>)

	const components = { menu, gapfill, yesno, lookup, scramble };
	content = components[gt];


	const backButton = gameType == "menu" ? null : <button onClick={goBackToMenu}>Back</button>

	return (
		<>
			{backButton}
			<QuizConfigContext.Provider value={{ numQuestions, time: numQuestions * 3, initialSeconds: numQuestions * 3, gameState, startNewGame }}>
				{content}
			</QuizConfigContext.Provider>
		</>
	);
}
export default ScrabbleWordTrainer

/* TODOS

Scramble UI
Implement time loss on question wrong
Show meter time loss animation on question wrong


*/
