import React from 'react';
import {useState} from 'react';

const Menu = props => {
  const [numQuestions, setNumQuestions] = useState(10);
  const [gameType,setGameType] = useState("");
  const {showAllGapFillSolutions,setShowAllGapFillSolutions} = {...props}

  const GAP_FILL_TYPES = {ONE:"one",ALL:"all"};

  const questionsNumPrompt = (
    <MenuQuestion key="1" title="Choose Number of Questions">
      <MultiChoiceAnswer onClick={setNumQuestions} selected={numQuestions} answers={[5,10,20,40,50,80,100]}></MultiChoiceAnswer>
    </MenuQuestion> 
  )

  let gft = GAP_FILL_TYPES;
  const gapFillPrompt = (
    <MenuQuestion key="2" title="Fill in all possible gaps for each word?">
      <MultiChoiceAnswer onClick={setShowAllGapFillSolutions} selected={showAllGapFillSolutions} answers={[true,false]} answerLabels={["yes","no"]}></MultiChoiceAnswer>
    </MenuQuestion> 
  )

      let menuQuestions;
      let gt = (gameType.toLowerCase()||"");

      if (gt == "yesno"){
        menuQuestions = questionsNumPrompt;
      } else if (gt == "gapfill"){
        menuQuestions = [questionsNumPrompt,gapFillPrompt];
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
    <p className="menuHeader">{props.title}</p>
    {props.children}
    </>
  )
}

const MultiChoiceAnswer = props =>{
  const currentAnswer = props.selected;
  const answers = props.answers.map((a,i)=>{
    let style = (a===currentAnswer) ? {backgroundColor:"blue",fontWeight:"bold",color:"red"} : {};
    let text = props.answerLabels?.length ? props.answerLabels[i] : a;
    let btn = <button key={a} style={style} onClick={()=>props.onClick(a)}>{text}</button>
    return btn;
  })
  return (<div className="menu" >  
  {answers}
  </div>
  )
}

export default Menu