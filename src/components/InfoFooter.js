import React from 'react'

const InfoFooter = props => {
  const {secondsLeft,initialSeconds} = {...props};

  return (
    <>
      <div className="infoFooter" style={{ display: 'flex', alignItems: 'center' }}>
      <div className="timer"><span>Time Remaining: </span><meter low={initialSeconds*0.2} value={secondsLeft} max={initialSeconds} min="0"></meter><span>{secondsLeft + "/" + initialSeconds}</span></div>
        <div className="questionsDisplay">Question: {Math.min(props.numAnswered, props.numQuestions)}/{props.numQuestions}</div>
      </div>
    </>
  )

}

export default InfoFooter