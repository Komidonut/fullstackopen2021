import React, { useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blod tests when dianosing patients'
  ];

  const chooseAnec = () => Math.floor(Math.random() * anecdotes.length);
  
  const [selected, setSelected] = useState(0);

  const [votes, setVotes] = useState(Array.apply(null, new Array(anecdotes.length)).map(Number.prototype.valueOf,0))
  
  const handleClick = () => {
    const newAnec = chooseAnec()
    console.log(newAnec)
    setSelected(newAnec)
  }

  const makeVote = () => { 
    const newVotes = votes.slice(0, selected).concat(votes[selected]+1).concat(votes.slice(selected+1)) 
    console.log(newVotes)
    setVotes(newVotes)
  }

  const bestAnec = () => {
    const index = votes.indexOf(Math.max(...votes))
    console.log('index of best anec: ', index)
    return anecdotes[index]
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{anecdotes[selected]}</p>
      <p>Votes: {votes[selected]}</p>
      <button onClick = {handleClick}> Next </button>
      <button onClick = {makeVote}> Vote </button>
      
      <h1>Anecdote with most votes</h1>
      <p>{bestAnec()}</p>
    </div>
  )
};

export default App;
