import { useState } from 'react'

const Button = ({name, onClick}) => {
  return(
    <button onClick={onClick}>{name}</button>
  )
}

const VoteView = ({votes}) => <p>has {votes} votes</p>

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.'
  ]

  const [selected, setSelected] = useState(0)
  const [anecdoteVotes, setAnecdoteVotes] = useState(Array(anecdotes.length).fill(0))


  const selectRandom = () => {
    let random = Math.floor(Math.random() * anecdotes.length)
    if(random == selected) {
      selectRandom()
    } else {
      setSelected(random)
    }    
  }

  const voteAnecdote = () => {
    let newArray = [...anecdoteVotes]
    newArray[selected] += 1
    setAnecdoteVotes(newArray)
  }

  return (
    <div>
      <div>
        {anecdotes[selected]}
      </div>
      <VoteView votes={anecdoteVotes[selected]} />
      <Button name="next" onClick={selectRandom} />
      <Button name="vote" onClick={voteAnecdote} />
    </div>
    
  )
}

export default App