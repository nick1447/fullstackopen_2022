import React from 'react'
import { useState } from 'react'

const Button = ({text, onClick}) => {
  return(
    <button onClick={onClick}>{text}</button>
  )
}

const StatisticLine = ({name, count}) => <tr><td>{name} {count}</td></tr>

const Statistics = (props) => {
  let {good, neutral, bad} = props
  let total = good + neutral + bad

  const getAverageRate = () => {
      let avg = (((good * 1) + (bad * -1)) / total);
      if(isNaN(avg)) {
        return 0
      } else {
        return avg
      }
  }

  const getPositiveRate = () => (good / total) * 100

  if(total === 0) {
    return(
      <div>
        <h1>statistics</h1>
        <p>No feedback given</p>
      </div>
    )
  } else {
    return(
      <div>
      <h1>statistics</h1>
      <table>
        <tbody>
          <StatisticLine name={"good"} count={good}/>
          <StatisticLine name={"neutral"} count={neutral}/>
          <StatisticLine name={"bad"} count={bad}/>
          <StatisticLine name={"all"} count={total}/>
          <StatisticLine name={"average "} count={getAverageRate()}/>
          <StatisticLine name={"positive"} count={getPositiveRate() + " %"}/>
        </tbody>
      </table>
      </div>

    )
  }
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const increaseGoodValue = () => setGood(good + 1)
  const increaseNeutralValue = () => setNeutral(neutral + 1)
  const increaseBadValue = () => setBad(bad + 1)

  return (
    <div>
      <h1>Give feedback</h1>
      <Button text={"good"} onClick={increaseGoodValue}/>
      <Button text={"neutral"} onClick={increaseNeutralValue}/>
      <Button text={"bad"} onClick={increaseBadValue}/>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App