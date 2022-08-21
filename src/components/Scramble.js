import React, { useState } from "react"
import { GenericTable } from "./GenericTable"
import TileDisplay from "./TileDisplay"
import utils from "../MathUtils.js";

export default function Scramble({initialWord}){
    const [answer,setAnswer] = useState("");
    const [solved,setSolved] = useState([]);
    const [word,setWord] = useState(initialWord);

    const allAnswers=utils.solveTileRackForWords(word)
    let scrambleSolutionsClass=solved.length==allAnswers.length ? "all_questions_answered" : "";

    function onAnswerChange(ev){

        setAnswer(ev.target.value);
        if (allAnswers.includes(ev.target.value) && !solved.includes(ev.target.value)){
            setAnswer("");
            let newSolved = [...solved,ev.target.value].sort();
            console.log(allAnswers.filter(a=>!newSolved.includes(a)).join(","));
            if (newSolved.length===allAnswers.length){
                console.log("All questions answered");
                setTimeout(nextQuestion,5000);
            }
            setSolved(newSolved);
        }

    }

    function nextQuestion(){
        setAnswer("");
        setSolved([]);
        setWord(utils.draw7Tiles());
    }

    return (
        <>
        <TileDisplay word={word}/>
        <input type="text" value={answer} onChange={onAnswerChange}></input>
        {/* <GenericTable rows={allAnswers} headers={["answers"]}></GenericTable> */}
        <output>{solved.length + "/" + allAnswers.length}</output>
        <GenericTable rows={solved} className={scrambleSolutionsClass} headers={["solved"]}></GenericTable>
        </>
    )
}