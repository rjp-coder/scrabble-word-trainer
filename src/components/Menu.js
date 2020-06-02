import React from 'react';



const Menu = props => {
  return (
    <div className="menuWrapper">
      <p className="menuHeader">Choose Number of questions</p>
      <div className="menu"> {
        [10, 20, 50, 100].map((x, i) => (
          <button key={i} onClick={() => props.startNewGame({ numQuestions: x })}>{x}</button>))}
      </div>
    </div>
  )

}
export default Menu