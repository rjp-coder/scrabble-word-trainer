import { useState } from "react";
import utils from "../MathUtils";

function useScrabbleWordTrainer() {
    const [gameId, setGameId] = useState(1);
    const [numQuestions, setNumQuestions] = useState(10);
    const [gameStatus, setGameStatus] = useState("menu");
    const gameState = [gameStatus, setGameStatus];
    const [gameType, setGameType] = useState("menu");
    const [showAllGapFillSolutions, setShowAllGapFillSolutions] = useState(false);

    const startNewGame = (props) => {
        setGameId(gameId + 1);
        setNumQuestions(props.numQuestions || 5);
        setGameStatus("active");
        setGameType(props.gameType);
    };

    const word = utils.getGapWord();

    function goBackToMenu(props) {
        setGameType("menu");
        setGameStatus("menu");
    }

    return {
        gameId, setGameId, numQuestions, setNumQuestions, gameStatus, setGameStatus,
        gameState, gameType, setGameType, showAllGapFillSolutions, setShowAllGapFillSolutions,
        startNewGame, word, goBackToMenu
    }
}

export default useScrabbleWordTrainer