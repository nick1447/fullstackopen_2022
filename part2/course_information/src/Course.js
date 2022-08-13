import React from "react"

const Course = ({course}) => {
    return(
      <div>
        <SubHeader name={course.name}/>
        <Content parts={course.parts}/>
        <Total parts={course.parts}/>
      </div>
    )
}

const SubHeader = ({name}) => {
    return(
      <h2>{name}</h2>
    )
  }
  
const Part = ({ name, exercises }) => {
return(
    <p>{name} {exercises}</p>
)
}

const Content = ({ parts }) => {
    return (
        <div>
        {parts.map((part) => <Part {...part} key={part.name} />)}
        </div>
    );
}

const Total = ({ parts }) => {
    const exerciseArray = parts.map(part => part.exercises);
    const total = exerciseArray.reduce((prev, next) => prev + next, 0)

    return <strong><p>Number of exercises {total}</p></strong>
}

export default Course