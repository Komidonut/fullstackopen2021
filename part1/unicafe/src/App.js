import React, {useState} from 'react'


const Header = (props) => {
  return(
    <h1>{props.header}</h1>
  )
}


const Button =(props) => {
  return(
    <button onClick={props.handleClick}>{props.buttonText}</button>
  )
}


const Statistics = (props) => {
  
  const sum = props.good + props.neutral + props.bad

  const average = (props.good - props.bad) / sum

  const positive = props.good * 100 / sum
   

  if (props.good || props.neutral || props.bad) {
    return(
      <>
      <p>good {props.good}</p>
      <p>neutral {props.neutral}</p>
      <p>bad {props.bad}</p>
      <p>all {sum}</p>
      <p>average {average}</p>
      <p>positive {positive} %</p>
      </>
    )
  }
  return 'No data'
}


const App = (props) => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  



  return (
    <>
      <Header header = 'give feedback'/>
        <Button
          handleClick = { () => setGood(good + 1) }
          buttonText = 'good'
        />
        <Button
          handleClick = { () => setNeutral(neutral + 1) }
          buttonText = 'neutral'
        />
        <Button
          handleClick = { () => setBad( bad + 1) }
          buttonText = 'bad'
        />
      <Header header = 'statistics' />
      <Statistics
        good = {good}
        neutral = {neutral}
        bad = {bad}
      />
    </>
  )
}

export default App