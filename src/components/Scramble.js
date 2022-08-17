import React, { useState } from "react"
import { GenericTable } from "./GenericTable"
import TileDisplay from "./TileDisplay"
import utils from "../MathUtils.js";

export default function Scramble({initialWord}){
    const [answer,setAnswer] = useState("");
    const [solved,setSolved] = useState([]);
    const [word,setWord] = useState(initialWord)

    const allAnswers=utils.solveTileRackForWords(word)

    function onAnswerChange(ev){

        setAnswer(ev.target.value);
        if (allAnswers.includes(ev.target.value) && !solved.includes(ev.target.value)){
            setAnswer("");
            setSolved([...solved,ev.target.value].sort()); //FIXME doesn't react read and write to solved asynchronously?
            if (solved.length===allAnswers.length){
                setTimeout(nextQuestion,2000); //FIXME timeout not working either :(
            }
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
        <GenericTable rows={solved} className={solved.length===allAnswers.length ? "all_answers_found" : ""} headers={["solved"]}></GenericTable>
        </>
    )
}