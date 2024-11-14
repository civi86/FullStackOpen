import { useState } from 'react'

const StatisticLine = ({ value }) => {
  return (
    <p>{value}</p>
  )
}

const Statistics = ({ good, neutral, bad }) => {
  const sum = good + neutral + bad
  const average = sum > 0 ? (good * 1 + neutral * 0 + bad * -1) / sum : 0
  const positive = sum > 0 ? (good) / sum * 100 : 0

  if (sum === 0) {
    return (
    <div>
      <h1>statistics</h1>
      <p>no feedback given yet</p>
    </div>
    )
  }
  return (
    <div>
      <h1>statistics</h1>
      <table>
        <tbody>
          <tr>
            <td>good</td>
            <td><StatisticLine value={good} /></td>
          </tr>
          <tr>
            <td>neutral</td>
            <td><StatisticLine value={neutral} /></td>
          </tr>
          <tr>
            <td>bad</td>
            <td><StatisticLine value={bad} /></td>
          </tr>
          <tr>
            <td>all</td>
            <td><StatisticLine value={sum} /></td>
          </tr>
          <tr>
            <td>average</td>
            <td><StatisticLine value={average} /></td>
          </tr>
          <tr>
            <td>positive</td>
            <td><StatisticLine value={positive + '%'} /></td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

const Button = ({ text, onClick }) => {
  return <button onClick={onClick}>{text}</button>
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGoodClick = () => setGood(good + 1)
  const handleNeutralClick = () => setNeutral(neutral + 1)
  const handleBadClick = () => setBad(bad + 1)


  return (
    <div>
      <h1>Feedback</h1>
      <Button text="good" onClick={handleGoodClick} />
      <Button text="neutral" onClick={handleNeutralClick} />
      <Button text="bad" onClick={handleBadClick} />

      <Statistics good={good} neutral={neutral} bad={bad} />
      
    </div>
  )
}

export default App
