import { useState } from 'react'

const App = () => {
  
  const anecdotes = [
    {anecdote: 'If it hurts, do it more often.', votes: 0},
    {anecdote: 'Adding manpower to a late software project makes it later!', votes: 0},
    {anecdote: 'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.', votes: 0},
    {anecdote: 'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.', votes: 0},
    {anecdote: 'Premature optimization is the root of all evil.', votes: 0},
    {anecdote: 'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.', votes: 0},
    {anecdote: 'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.', votes: 0},
    {anecdote: 'The only way to go fast, is to go well.', votes: 0}
  ]

  const [selected, setSelected] = useState(0)
  const [anecdotesData, setAnecdotesData] = useState(anecdotes)

  const randomAnecdote = () => {
    const randomIndex = Math.floor(Math.random() * anecdotes.length)
    setSelected(randomIndex)
  }

  const voteAnecdote = () => {
    const newAnecdotesData = [...anecdotesData]
    newAnecdotesData[selected].votes += 1
    setAnecdotesData(newAnecdotesData)
  }

  const maxVotes = anecdotesData.reduce((max, anecdote) => {
    return anecdote.votes > max.votes ? anecdote : max
  }, anecdotesData[0])

  const Button = ({text, onClick}) => {
    return <button onClick={onClick}>{text}</button>
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{anecdotesData[selected].anecdote}</p>
      <p>has {anecdotesData[selected].votes} votes</p>
      <Button text="vote" onClick={voteAnecdote} />
      <Button text="next ancedote" onClick={randomAnecdote} />
      <h1>Anecdote with the most votes</h1>
      <p>{maxVotes.anecdote}</p>
      <h4>this anecdote has {maxVotes.votes} votes</h4>
    </div>
  )
}

export default App
