import React from 'react'

const InfoFooter = props => {

  return (
    <>
      <div className="infoFooter" style={{ display: 'flex', alignItems: 'center' }}>
        <div className="timer">Time Remaining: {props.secondsLeft}</div>
        <div className="questionsDisplay">Question: {Math.min(props.numAnswered, props.numQuestions)}/{props.numQuestions}</div>
      </div>
    </>
  )

}

export default InfoFooter