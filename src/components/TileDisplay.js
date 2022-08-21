import React from "react"

const TileDisplay = props => {
      const letters = props.word.split("").map((letter,i)=>{
            return (<Tile key={letter+i} letter={letter}/>)
      })

      return (
      <div className="word">
            {letters}
      </div>
)
};

const Tile = props => (
<div className="tile"><p>{props.letter}</p></div>
)

export default TileDisplay