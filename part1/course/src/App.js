import React from 'react'

const App = () => {

  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using  props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }


  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

const Header = (props) => {
  return(
    <div>
      <h1>{props.course}</h1>
    </div>
  )
}

const Content = ({ parts }) => {
  return (
    <div>
      {parts.map((part, i) => <Part {...part} key={i} />)}
    </div>
  );
}

const Total = ({ parts }) => {
  const exerciseArray = parts.map(part => part.exercises);
  const total = exerciseArray.reduce((prev, next) => prev + next, 0)

  return(
    <div>
      <p>Number of exercises {total}</p>
    </div>
  )
}

const Part = ({ name, exercises }) => {
  return(
    <p>{name} {exercises}</p>
  )
}


export default App