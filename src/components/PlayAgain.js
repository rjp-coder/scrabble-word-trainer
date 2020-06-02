import React from "react";

const PlayAgain = props => (
	<div className="game-done">
  	<p 
    	className="messageHeader"
      style={{ color: props.gameStatus === 'lost' ? 'red' : 'black'}}
    >
  	  {props.gameStatus === 'lost' ? 'Game Over: ': 'Nice: '}
  	</p>
		<p className="message">
			{props.gameStatus == 'lost' ? props.loseMsg : props.winMsg}
		</p>
	  <button onClick={props.onClick}>Play Again</button>
		<button onClick={props.menuClick}>Menu</button>
	</div>
);

export default PlayAgain