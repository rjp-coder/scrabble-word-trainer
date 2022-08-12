import React from 'react';
import {useState} from 'react';

const Menu = props => {
  const [numQuestions, setNumQuestions] = useState(10);
  const [gameType,setGameType] = useState("");

  const questionsNumPrompt = (
  <>
    <MenuQuestion title="Choose Number of Questions">
      <MultiChoiceAnswer onClick={setNumQuestions} answers={[5,10,20,40,50,80,100]}></MultiChoiceAnswer>
    </MenuQuestion> 
  </>
  )


      let menuQuestions;
      let gt = (gameType.toLowerCase()||"");

      if (gt == "yesno"){
        menuQuestions = questionsNumPrompt;
      } else if (gt == "gapfill"){
        menuQuestions = questionsNumPrompt;
      } else if (gt == "lookup"){
        menuQuestions = null;
      }


  return (
    <div className="menuWrapper">
      <p className="menuHeader">Choose Game Type</p>
      <div className="menu"> 
          <button onClick={() => setGameType("lookup")}>Word Lookup</button>
          <button onClick={() => setGameType("gapFill")}>Gap Fill</button>
          <button onClick={() => setGameType("yesNo")}>Yes/No</button>
      </div>
      {menuQuestions}
      <button className="menu" onClick={() => props.startNewGame({ numQuestions,gameType })}>Start</button>


    </div>
  )

}

const MenuQuestion = props=>{
  return (<>
    <p className="menuHeader">{props.question}</p>
    {props.children}
    </>
  )
}

const MultiChoiceAnswer = props =>{
  const answers = props.answers.map(a=>{
    return (<button key={a} onClick={()=>props.onClick(a)}>{a}</button>)
  })
  return (<div className="menu" >  
  {answers}
  </div>
  )
}

export default Menu