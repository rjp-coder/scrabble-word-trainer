import React from "react"

const TileDisplay = props => (
<>
      <div className="word">
            <Tile letter={props.word[0]}/>
            <Tile letter={props.word[1]}/>
            <Tile letter={props.word[2]}/>
      </div>
</>
);

const Tile = props => (
<div className="tile"><p>{props.letter}</p></div>
)

export default TileDisplay